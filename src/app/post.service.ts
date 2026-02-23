// post.service.ts
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

// 1. GET ALL (Read)
const GET_POSTS = gql`
  query {
    allPosts {
      id
      title
      views
    }
  }
`;

// 2. CREATE
const CREATE_POST = gql`
  mutation ($title: String!, $views: Int!) {
    createPost(title: $title, views: $views) {
      id
      title
    }
  }
`;

// 3. UPDATE
const UPDATE_POST = gql`
  mutation ($id: ID!, $title: String!, $views: Int!) {
    updatePost(id: $id, title: $title, views: $views) {
      id
      title
      views
    }
  }
`;

// 4. DELETE
const DELETE_POST = gql`
  mutation ($id: ID!) {
    removePost(id: $id) {
      id
    }
  }
`;

@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(private apollo: Apollo) {}

  getPosts() {
    return this.apollo.watchQuery({ query: GET_POSTS }).valueChanges;
  }

  createPost(title: string, views: number) {
    return this.apollo.mutate({
      mutation: CREATE_POST,
      variables: { title, views },
      refetchQueries: [{ query: GET_POSTS }], // Refresh list after adding
    });
  }

  updatePost(id: string, title: string, views: number) {
    return this.apollo.mutate({
      mutation: UPDATE_POST,
      variables: { id, title, views },
      refetchQueries: [{ query: GET_POSTS }],
    });
  }

  deletePost(id: string) {
    return this.apollo.mutate({
      mutation: DELETE_POST,
      variables: { id },
      refetchQueries: [{ query: GET_POSTS }],
    });
  }
}

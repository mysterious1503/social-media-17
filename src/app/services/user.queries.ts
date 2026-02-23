import { gql } from '@apollo/client/core';

export const GET_USERS = gql`
  query GetUsers {
    allUsers {
      id
      name
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query GetUserById($id: Int!) {
    User(id: $id) {
      id
      name
    }
  }
`;

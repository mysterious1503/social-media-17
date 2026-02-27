# Social Media 17

A modern social media application built with Angular 17, featuring user authentication, admin dashboard with user management, and GraphQL-powered post management using Apollo Client.

## 🚀 Features

- **User Authentication**: Login and signup with role-based access control
- **Admin Dashboard**: View all users with detailed information
- **GraphQL API**: Full CRUD operations for posts using Apollo Client
- **Responsive Design**: Mobile-friendly UI with modern styling
- **Real-time Navigation**: Dynamic routing between pages

## 📋 Prerequisites

- Node.js (v16 or higher)
- Angular CLI v17.3.17
- npm or yarn

## 🛠️ Installation

1. Navigate to the project directory:

```bash
cd social-media-17
```

2. Install dependencies:

```bash
npm install
```

## 🚀 Running the Application

### 1. Start the GraphQL Server (db.js)

The application uses **json-graphql-server** to create a GraphQL API from the `db.js` file.

```bash
npx json-graphql-server src/app/home/db.js --p 3000
```

This will start the GraphQL server on `http://localhost:3000/`

**GraphQL Endpoints:**

- Query Endpoint: `http://localhost:3000/graphql`
- GraphQL Playground: `http://localhost:3000/`

### 2. Start the Angular Development Server

In a new terminal window:

```bash
npm start
# or
ng serve
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## 🔐 Authentication

### Default Users for Testing

**Admin Account:**

- Email: `admin@example.com`
- Password: `admin123`

**Regular User Account:**

- Email: `user1@example.com`
- Password: `user123`

## 🔄 GraphQL Operations

### Available Queries

```graphql
query GetUsers {
  allUsers {
    id
    name
  }
}

query GetUserById($id: Int!) {
  User(id: $id) {
    id
    name
  }
}

query GetPosts {
  allPosts {
    id
    title
    views
  }
}
```

### Available Mutations

```graphql
mutation CreatePost($title: String!, $views: Int!) {
  createPost(title: $title, views: $views) {
    id
    title
    views
  }
}

mutation UpdatePost($id: ID!, $title: String!, $views: Int!) {
  updatePost(id: $id, title: $title, views: $views) {
    id
    title
    views
  }
}

mutation DeletePost($id: ID!) {
  removePost(id: $id) {
    id
  }
}
```

## 📊 db.js - GraphQL Data Source

Located at: `src/app/home/db.js`

This file contains the data structure that powers the GraphQL server:

```javascript
{
  users: [
    {
      id: 1,
      email: 'admin@example.com',
      name: 'Admin User',
      phone: '+1 (555) 123-4567',
      title: 'Administrator',
      role: 'admin'
    },
    // ... more users
  ],
  posts: [
    { id: 1, title: "Hello World", views: 100 },
    { id: 2, title: "Angular is Awesome", views: 200 },
    // ... more posts
  ]
}
```

**To add more data:**

1. Edit `src/app/home/db.js`
2. Restart the GraphQL server
3. The data will be available through GraphQL queries

## 🔌 Apollo Client Configuration

**Location**: `src/app/app.config.ts`

Apollo Client is configured to connect to the GraphQL server:

- **URI**: `http://localhost:3000/graphql`
- **Fetch Policy**: `cache-and-network` (for optimal caching)
- **Cache**: InMemoryCache

## 🎨 Web Components & Technologies Used

### Custom Web Components

#### HelloWorld.js

- **Location**: `src/assets/HelloWorld.js`
- **Purpose**: Custom HTML web component for greeting display
- **Usage**: Used in Home component as `<hello-world name="Mohita"></hello-world>`
- **How it works**:
  - Extends HTMLElement class
  - Registered as custom element `hello-world`
  - Accepts `name` attribute for personalized greeting
  - Displays "Hello World" and greets user by name

**Example Usage**:

```html
<hello-world name="Mohita"></hello-world>
```

**Output**:

```
Hello World
Hello Mohita
```

**Configuration**: The web component script is included in `angular.json` under the `scripts` array so it's loaded globally.

### Angular Features

- **Standalone Components**: All components are standalone (no NgModule required)
- **Reactive Forms**: Form validation with FormBuilder and Validators
- **Routing**: Protected routes with auth guard
- **Dependency Injection**: Services for auth, users, and posts
- **Custom Web Components**: Native web components integrated with Angular

### Apollo Angular

- **GraphQL Queries**: Using `watchQuery().valueChanges` for reactive data
- **GraphQL Mutations**: Create, Update, Delete operations
- **Caching**: Apollo InMemoryCache for performance

### Styling

- **SCSS**: Component-scoped styles with variables and mixins
- **Responsive Design**: Mobile-first approach with media queries
- **Modern CSS**: Flexbox and Grid layouts

### Forms

- **Reactive Forms**: FormGroup with validation
- **Form Controls**: `FormControlName` binding
- **Error Messages**: Dynamic error text based on validation state

## 🔐 Security Features

- **Auth Guard**: Protects routes from unauthorized access
- **Role-based Access**: Admin vs User views
- **Token Management**: JWT-like authentication (in auth.service.ts)
- **Logout**: Secure session termination

## 📱 Responsive Design

The application is fully responsive with:

- Desktop view (1200px+)
- Tablet view (768px - 1199px)
- Mobile view (<768px)

All components adapt their layout for smaller screens.

## 🧪 Code Scaffolding

To generate new components, services, or directives:

```bash
ng generate component component-name
ng generate service service-name
ng generate directive directive-name
ng generate guard guard-name
```

## 🏗️ Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory:

```bash
ng build --configuration production
```

## 🧪 Running Unit Tests

```bash
npm test
# or
ng test
```

Tests will execute via Karma and watch for file changes.

| `http://localhost:3000/` | GraphQL playground |

## 📝 Notes

- The GraphQL server must be running on port 3000 for the application to work
- User data is stored in `db.js` and served through GraphQL
- Posts data is also in `db.js` and managed through GraphQL mutations
- All changes to posts are persisted in the GraphQL server's cache
- The `db.json` file (if present) is not used and can be safely deleted

## 🔍 Troubleshooting

**Issue**: Apollo queries return no data

- **Solution**: Ensure GraphQL server is running on port 3000

**Issue**: Login not working

- **Solution**: Clear browser cache and check auth.service.ts for hardcoded credentials

**Issue**: Posts not updating

- **Solution**: Check browser console for GraphQL errors and ensure db.js has valid data

## 📚 Further Help

- [Angular Documentation](https://angular.io)
- [Apollo Angular Documentation](https://apollo-angular.com/)
- [json-graphql-server GitHub](https://github.com/marmelab/json-graphql-server)
- [GraphQL Documentation](https://graphql.org/)

## 🤝 Contributing

Feel free to fork and submit pull requests for improvements.

## 📄 License

This project is licensed under the MIT License.

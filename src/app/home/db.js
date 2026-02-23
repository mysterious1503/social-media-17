// db.js
module.exports = {
  posts: [
    { id: 1, title: "Hello World", views: 100 },
    { id: 2, title: "Angular is Awesome", views: 200 }
  ],
  users: [
    {
      id: 1,
      email: "admin@example.com",
      name: "Admin User",
      phone: "+1 (555) 123-4567",
      title: "Administrator",
      role: "admin"
    },
    {
      id: 2,
      email: "user1@example.com",
      name: "John Doe",
      phone: "+1 (555) 234-5678",
      title: "Software Engineer",
      role: "user"
    },
    {
      id: 3,
      email: "user2@example.com",
      name: "Jane Smith",
      phone: "+1 (555) 345-6789",
      title: "Product Manager",
      role: "user"
    },
    {
      id: 4,
      email: "user3@example.com",
      name: "Bob Wilson",
      phone: "+1 (555) 456-7890",
      title: "UI/UX Designer",
      role: "user"
    }
  ]
};
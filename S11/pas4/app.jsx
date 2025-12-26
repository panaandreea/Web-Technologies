import { useState } from "react";

function UserList({ users, onSelectUser }) {
  return (
    <div>
      <h3>User list</h3>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name}
            <button onClick={() => onSelectUser(user)}>
              View details
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function UserDetails({ user }) {
  if (!user) {
    return <p>No user selected</p>;
  }

  return (
    <div>
      <h3>User details</h3>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  );
}

export default function App() {
  const [selectedUser, setSelectedUser] = useState(null);

  const users = [
    { id: 1, name: "Alice", email: "alice@test.com", role: "admin" },
    { id: 2, name: "Bob", email: "bob@test.com", role: "user" },
    { id: 3, name: "Charlie", email: "charlie@test.com", role: "user" },
  ];

  return (
    <div>
      <h1>User management</h1>

      <UserList users={users} onSelectUser={setSelectedUser} />
      <UserDetails user={selectedUser} />
    </div>
  );
}

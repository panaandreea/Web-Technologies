import { useEffect, useState } from "react";

function AdminList({ users }) {
  return (
    <div>
      <h3>Admins</h3>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

function UserList({ users }) {
  return (
    <div>
      <h3>Users</h3>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const serverData = [
      { id: 1, name: "Alice", type: "admin" },
      { id: 2, name: "Bob", type: "user" },
      { id: 3, name: "Charlie", type: "admin" },
      { id: 4, name: "Dave", type: "user" },
    ];

    setUsers(serverData);
  }, []);

  const admins = users.filter(u => u.type === "admin");
  const normalUsers = users.filter(u => u.type === "user");

  return (
    <div>
      <h1>User management</h1>
      <AdminList users={admins} />
      <UserList users={normalUsers} />
    </div>
  );
}

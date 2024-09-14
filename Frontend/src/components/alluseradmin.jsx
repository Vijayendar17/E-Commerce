import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function AllUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:6900/auth/adminusers', { withCredentials: true });
        setUsers(response.data.allusers);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch users');
        setLoading(false);
        toast.error("Failed to fetch users");
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen w-full  p-8 ">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">All Users</h1>
      </header>

      <section className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">User List</h2>
        {users.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">No users found.</p>
        ) : (
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">User ID</th>
                <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Username</th>
                <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Email</th>
                <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Role</th>
                <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Image</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  <td className="px-4 py-2 text-gray-800 dark:text-gray-100">{user._id}</td>
                  <td className="px-4 py-2 text-gray-800 dark:text-gray-100">{user.username}</td>
                  <td className="px-4 py-2 text-gray-800 dark:text-gray-100">{user.email}</td>
                  <td className="px-4 py-2 text-gray-800 dark:text-gray-100">{user.Admin}</td>
                  <td className="px-4 py-2 text-gray-800 dark:text-gray-100">
                    {user.image ? (
                      <img src={user.image} alt="User Avatar" className="w-12 h-12 rounded-full" />
                    ) : (
                      'No Image'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

export default AllUsers;

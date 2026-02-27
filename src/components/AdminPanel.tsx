import React, { useState, useEffect } from "react";

const AdminPanel: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    const usersData = localStorage.getItem("all_users");
    if (usersData) {
      const usersObj = JSON.parse(usersData);
      const usersArray = Object.values(usersObj);
      setUsers(usersArray);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-pink-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          👑 Admin Panel - All Users
        </h2>

        <div className="mb-4 p-4 bg-pink-50 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>Total Users:</strong> {users.length}
          </p>
        </div>

        <div className="space-y-3">
          {users.map((user: any, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-gray-800">
                    Username: {user.username}
                  </p>
                  <p className="text-sm text-gray-600">
                    Created: {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                  Active
                </span>
              </div>
            </div>
          ))}

          {users.length === 0 && (
            <p className="text-center text-gray-500 py-8">
              No users yet! Create an account to see it here.
            </p>
          )}
        </div>

        <button
          onClick={loadUsers}
          className="w-full mt-6 bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all"
        >
          🔄 Refresh Users
        </button>
      </div>
    </div>
  );
};

export default AdminPanel;

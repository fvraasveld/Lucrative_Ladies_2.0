import React from "react";

const MoneyTreeAvatar: React.FC<{ netWorth: number }> = ({ netWorth }) => {
  const getTreeStage = () => {
    const worth = netWorth || 0; // Default to 0 if undefined

    if (worth < 1000)
      return { emoji: "🌱", stage: "Sapling", color: "text-green-400" };
    if (worth < 10000)
      return { emoji: "🌿", stage: "Growing", color: "text-green-500" };
    if (worth < 50000)
      return { emoji: "🌳", stage: "Tree", color: "text-green-600" };
    return { emoji: "🌳", stage: "Sequoia Tree", color: "text-green-700" };
  };

  const tree = getTreeStage();

  return (
    <div className="text-center">
      <div className={`text-6xl ${tree.color}`}>{tree.emoji}</div>
      <p className="text-sm text-gray-600 mt-1">{tree.stage}</p>
      <p className="text-xs text-pink-500">
        ${(netWorth || 0).toLocaleString()}
      </p>
    </div>
  );
};

const Profile: React.FC = () => {
  const username = localStorage.getItem("username") || "";
  const isDemo = username === "Demo User";

  const getUserData = () => {
    const userData = localStorage.getItem(`userData_${username}`);
    if (userData) {
      return JSON.parse(userData);
    }
    return { netWorth: 0, goalsAchieved: 0, daysStreak: 1 };
  };

  const data = isDemo
    ? { netWorth: 12450, goalsAchieved: 8, daysStreak: 156 }
    : getUserData();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-pink-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">👤 Profile</h2>

        <div className="text-center mb-6">
          <MoneyTreeAvatar netWorth={data.netWorth} />
          <h3 className="text-xl font-semibold text-gray-800 mt-4">
            {username}
          </h3>
          <p className="text-gray-600">
            Lucrative Lady since{" "}
            {new Date().toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-pink-50 p-4 rounded-lg text-center">
              <p className="text-2xl font-bold text-rose-600">
                {data.goalsAchieved}
              </p>
              <p className="text-sm text-gray-600">Goals Achieved</p>
            </div>
            <div className="bg-rose-50 p-4 rounded-lg text-center">
              <p className="text-2xl font-bold text-pink-600">
                {data.daysStreak}
              </p>
              <p className="text-sm text-gray-600">Days Streak</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">🏦 Linked Accounts</span>
              <span className="text-pink-500">
                {isDemo ? "3 connected" : "0 connected"}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">🔔 Notifications</span>
              <span className="text-green-500">Enabled</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">🎯 Goal Reminders</span>
              <span className="text-green-500">Daily</span>
            </div>
          </div>

          <button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white p-3 rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

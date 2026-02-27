import React, { useState } from "react";

const Goals: React.FC = () => {
  const username = localStorage.getItem("username") || "";
  const isDemo = username === "Demo User";
  const [activeYear, setActiveYear] = useState("2026");

  // Demo vision items
  const demoVisionItems = [
    {
      id: 1,
      category: "Career",
      icon: "💼",
      goal: "Start my own consulting business",
      description: "Launch by Q3 2026",
    },
    {
      id: 2,
      category: "Travel",
      icon: "✈️",
      goal: "Visit Italy & Greece",
      description: "2-week trip in summer",
    },
    {
      id: 3,
      category: "Financial",
      icon: "🏠",
      goal: "Save $50k for home down payment",
      description: "By end of 2026",
    },
    {
      id: 4,
      category: "Personal",
      icon: "📚",
      goal: "Complete investment course",
      description: "Finish by March",
    },
  ];

  // Demo financial goals
  const demoGoals = [
    {
      id: 1,
      title: "🏠 Dream Home Down Payment",
      current: 22500,
      target: 50000,
      targetDate: "Dec 2026",
      color: "from-pink-500 to-rose-500",
    },
    {
      id: 2,
      title: "✈️ Europe Trip Fund",
      current: 4000,
      target: 5000,
      targetDate: "Jun 2026",
      color: "from-rose-500 to-pink-500",
    },
    {
      id: 3,
      title: "💼 Business Launch Fund",
      current: 8500,
      target: 20000,
      targetDate: "Sep 2026",
      color: "from-pink-400 to-rose-400",
    },
  ];

  const getUserVisionItems = () => {
    const visionData = localStorage.getItem(`vision_${username}_${activeYear}`);
    return visionData ? JSON.parse(visionData) : [];
  };

  const getUserGoals = () => {
    const goalsData = localStorage.getItem(`goals_${username}`);
    return goalsData ? JSON.parse(goalsData) : [];
  };

  const visionItems = isDemo ? demoVisionItems : getUserVisionItems();
  const goals = isDemo ? demoGoals : getUserGoals();

  const categories = [
    "Career",
    "Financial",
    "Travel",
    "Health",
    "Personal",
    "Relationships",
  ];

  return (
    <div className="space-y-6">
      {/* Vision Board Section */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-pink-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            ✨ Your {activeYear} Vision
          </h2>
          <select
            value={activeYear}
            onChange={(e) => setActiveYear(e.target.value)}
            className="px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white"
          >
            <option value="2026">2026</option>
            <option value="2027">2027</option>
            <option value="lifetime">Lifetime</option>
          </select>
        </div>

        {/* Empty Vision State */}
        {visionItems.length === 0 && !isDemo && (
          <div className="text-center py-12 border-2 border-dashed border-pink-300 rounded-xl bg-gradient-to-br from-pink-50 to-rose-50">
            <div className="text-6xl mb-4">✨</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Create Your {activeYear} Vision
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              What do you want to achieve? Define your dreams across different
              areas of life.
            </p>
            <button className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all shadow-lg font-medium">
              ➕ Add Your First Vision Item
            </button>
          </div>
        )}

        {/* Vision Items Grid */}
        {visionItems.length > 0 && (
          <>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              {visionItems.map((item: any) => (
                <div
                  key={item.id}
                  className="bg-gradient-to-br from-pink-50 to-rose-50 p-5 rounded-xl border border-pink-200 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start space-x-3">
                    <div className="text-4xl">{item.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2 py-1 bg-pink-200 text-pink-700 rounded-full text-xs font-semibold">
                          {item.category}
                        </span>
                        <button className="text-gray-400 hover:text-pink-600">
                          ✏️
                        </button>
                      </div>
                      <h3 className="font-bold text-gray-800 mb-1">
                        {item.goal}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white p-3 rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all">
              ➕ Add Vision Item
            </button>
          </>
        )}
      </div>

      {/* Financial Goals Section */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-pink-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          🎯 Financial Goals
        </h2>

        {/* Empty Goals State */}
        {goals.length === 0 && !isDemo && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Set Your First Savings Goal
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Turn your vision into action. How much do you need to save?
            </p>
            <button className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all shadow-lg font-medium">
              ➕ Create Savings Goal
            </button>
          </div>
        )}

        {/* Goals List */}
        {goals.length > 0 && (
          <>
            <div className="space-y-4">
              {goals.map((goal: any) => {
                const progress = Math.round((goal.current / goal.target) * 100);
                return (
                  <div
                    key={goal.id}
                    className="bg-gradient-to-br from-pink-50 to-rose-50 p-5 rounded-xl border border-pink-200"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold text-rose-700 text-lg">
                        {goal.title}
                      </h3>
                      <span className="text-xs bg-white px-3 py-1 rounded-full text-pink-600 font-medium">
                        {goal.targetDate}
                      </span>
                    </div>

                    <div className="w-full bg-pink-200 rounded-full h-4 mb-3">
                      <div
                        className={`bg-gradient-to-r ${goal.color} h-4 rounded-full transition-all flex items-center justify-end pr-2`}
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      >
                        <span className="text-xs text-white font-bold">
                          {progress}%
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-600">
                        <span className="font-bold text-gray-800">
                          ${goal.current.toLocaleString()}
                        </span>
                        {" / "}${goal.target.toLocaleString()}
                      </p>
                      <button className="text-pink-600 hover:text-pink-700 text-sm font-medium">
                        Edit →
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <button className="w-full mt-6 bg-gradient-to-r from-pink-500 to-rose-500 text-white p-3 rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all">
              ➕ Create New Goal
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Goals;

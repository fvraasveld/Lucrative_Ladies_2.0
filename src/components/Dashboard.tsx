import React, { useState, useEffect } from "react";

// Money Tree Avatar
const MoneyTreeAvatar: React.FC<{ netWorth: number }> = ({ netWorth }) => {
  const getTreeStage = () => {
    if (netWorth < 1000)
      return { emoji: "🌱", stage: "Sapling", color: "text-green-400" };
    if (netWorth < 10000)
      return { emoji: "🌿", stage: "Growing", color: "text-green-500" };
    if (netWorth < 50000)
      return { emoji: "🌳", stage: "Tree", color: "text-green-600" };
    return { emoji: "🏔️", stage: "Sequoia", color: "text-green-700" };
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

// Quote Component
const MotivationalQuote: React.FC = () => {
  const quotes = [
    "A woman's best protection is a little money of her own. - Clare Boothe Luce",
    "Being rich is having money; being wealthy is having time. - Margaret Bonnano",
    "We can tell our values by looking at our checkbook stubs. - Gloria Steinem",
    "Money is only a tool. It will take you wherever you wish, but it will not replace you as the driver. - Ayn Rand",
  ];

  const [currentQuote, setCurrentQuote] = useState(quotes[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-r from-pink-100 to-rose-100 p-4 rounded-lg border border-pink-200">
      <h3 className="text-lg font-semibold text-rose-700 mb-2">
        💫 Daily Money Muse
      </h3>
      <p className="text-sm text-gray-700 italic">"{currentQuote}"</p>
    </div>
  );
};

// Welcome Modal
const WelcomeModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border-2 border-pink-200">
        <div className="text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-4">
            Welcome to Lucrative Ladies!
          </h2>
          <p className="text-gray-700 mb-6">
            Your journey to financial freedom starts here!
          </p>
          <div className="text-left space-y-3 mb-6">
            <div className="flex items-start space-x-3">
              <span className="text-2xl">🎯</span>
              <div>
                <p className="font-semibold text-gray-800">Set Your Goals</p>
                <p className="text-sm text-gray-600">
                  Dream home? Travel? We'll help you get there!
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl">🏦</span>
              <div>
                <p className="font-semibold text-gray-800">
                  Connect Your Accounts
                </p>
                <p className="text-sm text-gray-600">
                  Link banks to track everything automatically
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl">💬</span>
              <div>
                <p className="font-semibold text-gray-800">Join the Circle</p>
                <p className="text-sm text-gray-600">
                  Connect with women on the same journey
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all shadow-lg font-medium"
          >
            Let's Get Started! 💪
          </button>
        </div>
      </div>
    </div>
  );
};

const getDemoData = () => ({
  netWorth: 12450,
  accounts: [
    { name: "Chase Checking", balance: 3200 },
    { name: "Savings Account", balance: 9250 },
  ],
});

const getUserData = (username: string) => {
  const userDataKey = `userData_${username}`;
  const savedData = localStorage.getItem(userDataKey);

  if (savedData) {
    return JSON.parse(savedData);
  }

  return {
    netWorth: 0,
    accounts: [],
  };
};

const Dashboard: React.FC = () => {
  const username = localStorage.getItem("username") || "";
  const isDemo = username === "Demo User";

  const [userData, setUserData] = useState(
    isDemo ? getDemoData() : getUserData(username)
  );

  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    if (!isDemo) {
      const hasSeenWelcome = localStorage.getItem(`welcome_${username}`);
      if (!hasSeenWelcome) {
        setShowWelcome(true);
      }
    }
  }, [username, isDemo]);

  const handleCloseWelcome = () => {
    setShowWelcome(false);
    localStorage.setItem(`welcome_${username}`, "true");
  };

  return (
    <>
      {showWelcome && <WelcomeModal onClose={handleCloseWelcome} />}

      <div className="space-y-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-pink-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Welcome back, Queen! 👑
          </h2>

          {/* Net Worth */}
          <div className="flex justify-center mb-6">
            <MoneyTreeAvatar netWorth={userData.netWorth || 0} />
          </div>

          {/* Empty State */}
          {(!userData.accounts || userData.accounts.length === 0) &&
            !isDemo && (
              <div className="mb-6 p-6 bg-pink-50 border border-pink-200 rounded-lg text-center">
                <div className="text-4xl mb-3">🏦</div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Connect Your Bank Accounts
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Link your accounts to automatically track your net worth,
                  spending, and savings goals.
                </p>
                <button className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all shadow-lg font-medium">
                  🔗 Connect Accounts (Coming Soon!)
                </button>
              </div>
            )}

          {/* Accounts List (if they exist) */}
          {userData.accounts && userData.accounts.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800">Your Accounts</h3>
              {userData.accounts.map((account: any, index: number) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-800">{account.name}</p>
                    <p className="text-sm text-gray-500">••••1234</p>
                  </div>
                  <p className="text-xl font-bold text-gray-800">
                    ${account.balance.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <MotivationalQuote />
      </div>
    </>
  );
};

export default Dashboard;

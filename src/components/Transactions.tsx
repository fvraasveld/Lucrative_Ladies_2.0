import React from "react";

const Transactions: React.FC = () => {
  const username = localStorage.getItem("username") || "";
  const isDemo = username === "Demo User";

  // Demo transactions
  const demoTransactions = [
    {
      id: 1,
      icon: "🛒",
      name: "Target",
      date: "Today, 2:30 PM",
      amount: -67.32,
    },
    {
      id: 2,
      icon: "💰",
      name: "Salary Deposit",
      date: "Yesterday, 9:00 AM",
      amount: 3200.0,
    },
    {
      id: 3,
      icon: "☕",
      name: "Starbucks",
      date: "Yesterday, 8:15 AM",
      amount: -5.47,
    },
    {
      id: 4,
      icon: "🏠",
      name: "Rent Payment",
      date: "Jan 1, 10:00 AM",
      amount: -1200.0,
    },
  ];

  const getUserTransactions = () => {
    const transData = localStorage.getItem(`transactions_${username}`);
    return transData ? JSON.parse(transData) : [];
  };

  const transactions = isDemo ? demoTransactions : getUserTransactions();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-pink-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          💳 Transactions
        </h2>

        {/* Empty State */}
        {transactions.length === 0 && !isDemo && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏦</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Connect Your Bank Accounts
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Link your accounts to automatically import transactions and track
              your spending.
            </p>
            <button className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all shadow-lg font-medium">
              🔗 Connect Bank Account
            </button>
          </div>
        )}

        {/* Transactions List */}
        {transactions.length > 0 && (
          <>
            <div className="space-y-3">
              {transactions.map((trans: any) => (
                <div
                  key={trans.id}
                  className="flex justify-between items-center p-3 border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{trans.icon}</span>
                    <div>
                      <p className="font-medium text-gray-800">{trans.name}</p>
                      <p className="text-xs text-gray-500">{trans.date}</p>
                    </div>
                  </div>
                  <span
                    className={`font-semibold ${
                      trans.amount > 0 ? "text-green-600" : "text-rose-600"
                    }`}
                  >
                    {trans.amount > 0 ? "+" : ""}$
                    {Math.abs(trans.amount).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-pink-100 to-rose-100 rounded-lg text-center">
              <p className="text-gray-700 mb-2">
                🔗 Connect your bank accounts for automatic transaction tracking
              </p>
              <button className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-2 rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all">
                Connect Bank Account
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Transactions;

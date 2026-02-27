import React from "react";

const Community: React.FC = () => {
  const username = localStorage.getItem("username") || "";
  const isDemo = username === "Demo User";

  // Demo posts (only for demo)
  const demoPosts = [
    {
      id: 1,
      user: "User 1.",
      initial: "1",
      time: "2h ago",
      content:
        "Just hit my $10k emergency fund goal! 🎉 Feeling so empowered right now!",
      likes: 24,
      comments: 8,
    },
    {
      id: 2,
      user: "User 2.",
      initial: "2",
      time: "4h ago",
      content:
        "💡 Tip: Use the 24-hour rule before making any purchase over $100. It's saved me thousands!",
      likes: 67,
      comments: 15,
    },
  ];

  const getUserPosts = () => {
    const postsData = localStorage.getItem("circle_posts");
    return postsData ? JSON.parse(postsData) : [];
  };

  const posts = isDemo ? demoPosts : getUserPosts();

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-pink-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          💬 Your Circle
        </h2>

        {/* Create Post Section */}
        <div className="mb-6 p-4 bg-gradient-to-r from-pink-100 to-rose-100 rounded-lg">
          <textarea
            className="w-full p-3 rounded-lg border border-pink-200 resize-none focus:outline-none focus:ring-2 focus:ring-pink-400"
            placeholder="Share your money wins, tips, or inspiration..."
            rows={3}
          />
          <button className="mt-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-2 rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all">
            Share with Circle ✨
          </button>
        </div>

        {/* Empty State */}
        {posts.length === 0 && !isDemo && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💬</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Be the First to Post!
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Share your financial wins, ask questions, or inspire others. Your
              circle is waiting!
            </p>
          </div>
        )}

        {/* Posts Feed */}
        {posts.length > 0 && (
          <div className="space-y-4">
            {posts.map((post: any) => (
              <div
                key={post.id}
                className="bg-pink-50 p-4 rounded-lg border border-pink-200"
              >
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-rose-400 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {post.initial}
                  </div>
                  <span className="ml-2 font-medium text-gray-800">
                    {post.user}
                  </span>
                  <span className="ml-auto text-xs text-gray-500">
                    {post.time}
                  </span>
                </div>
                <p className="text-gray-700 mb-2">{post.content}</p>
                <div className="flex space-x-4 text-sm text-gray-500">
                  <button className="hover:text-rose-500">
                    ❤️ {post.likes}
                  </button>
                  <button className="hover:text-rose-500">
                    💬 {post.comments}
                  </button>
                  <button className="hover:text-rose-500">🔗 Share</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;

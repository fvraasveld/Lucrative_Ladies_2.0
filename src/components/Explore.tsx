import React, { useState } from "react";

const EventModal: React.FC<{ event: any; onClose: () => void }> = ({
  event,
  onClose,
}) => {
  const [isSignedUp, setIsSignedUp] = useState(false);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="text-5xl mb-3">{event.icon}</div>
            <h2 className="text-3xl font-bold text-gray-800">{event.title}</h2>
            <p className="text-gray-600 mt-1">{event.date}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-start space-x-3">
            <span className="text-xl">📍</span>
            <div>
              <p className="font-semibold text-gray-800">Location</p>
              <p className="text-gray-600">{event.location}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <span className="text-xl">⏰</span>
            <div>
              <p className="font-semibold text-gray-800">Time</p>
              <p className="text-gray-600">{event.time}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <span className="text-xl">📝</span>
            <div>
              <p className="font-semibold text-gray-800">Description</p>
              <p className="text-gray-600">{event.description}</p>
            </div>
          </div>

          {event.website && (
            <div className="flex items-start space-x-3">
              <span className="text-xl">🌐</span>
              <div>
                <p className="font-semibold text-gray-800">Website</p>
                <a
                  href={event.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-600 hover:text-pink-700 underline"
                >
                  {event.website}
                </a>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={() => setIsSignedUp(!isSignedUp)}
          className={`w-full py-3 rounded-lg font-semibold transition-all ${
            isSignedUp
              ? "bg-green-100 text-green-700 border-2 border-green-300"
              : "bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600"
          }`}
        >
          {isSignedUp ? "✓ You're Going!" : "Sign Up for Event"}
        </button>
      </div>
    </div>
  );
};

const CalendarModal: React.FC<{
  events: any[];
  onClose: () => void;
  onSelectEvent: (event: any) => void;
}> = ({ events, onClose, onSelectEvent }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    return {
      daysInMonth: lastDay.getDate(),
      startingDayOfWeek: firstDay.getDay(),
    };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);

  const getEventsForDay = (day: number) => {
    const monthName = monthNames[currentMonth.getMonth()];
    const year = currentMonth.getFullYear();

    return events.filter((event) => {
      // Skip TBD events
      if (event.date === "TBD") return false;

      // Match exact day format like "April 15, 2026"
      const exactMatch = event.date.includes(`${monthName} ${day}, ${year}`);

      // Match date ranges like "April 24-26, 2026"
      const rangeMatch = event.date.match(/(\w+) (\d+)-(\d+), (\d+)/);
      if (rangeMatch) {
        const [, month, startDay, endDay, eventYear] = rangeMatch;
        if (month === monthName && parseInt(eventYear) === year) {
          const dayNum = day;
          return dayNum >= parseInt(startDay) && dayNum <= parseInt(endDay);
        }
      }

      return exactMatch;
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-8 max-w-4xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            📅 Events Calendar
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ✕
          </button>
        </div>

        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() =>
              setCurrentMonth(
                new Date(
                  currentMonth.getFullYear(),
                  currentMonth.getMonth() - 1
                )
              )
            }
            className="p-2 hover:bg-pink-50 rounded-lg"
          >
            ← Previous
          </button>
          <h3 className="text-xl font-bold text-gray-800">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h3>
          <button
            onClick={() =>
              setCurrentMonth(
                new Date(
                  currentMonth.getFullYear(),
                  currentMonth.getMonth() + 1
                )
              )
            }
            className="p-2 hover:bg-pink-50 rounded-lg"
          >
            Next →
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="text-center font-semibold text-gray-600 p-2"
            >
              {day}
            </div>
          ))}
          {Array.from({ length: startingDayOfWeek }).map((_, i) => (
            <div key={`empty-${i}`} className="p-2"></div>
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dayEvents = getEventsForDay(day);
            return (
              <div
                key={day}
                className={`p-2 min-h-[80px] border rounded-lg ${
                  dayEvents.length > 0
                    ? "bg-pink-50 border-pink-300"
                    : "bg-white border-gray-200"
                }`}
              >
                <div className="font-semibold text-gray-800 mb-1">{day}</div>
                {dayEvents.map((event) => (
                  <div
                    key={event.id}
                    onClick={() => {
                      onClose();
                      onSelectEvent(event);
                    }}
                    className="text-xs bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded px-2 py-1 mb-1 truncate hover:shadow-lg cursor-pointer"
                  >
                    {event.icon} {event.title.slice(0, 15)}...
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        <div className="mt-8">
          <h4 className="font-bold text-gray-800 mb-4">
            All Events in {monthNames[currentMonth.getMonth()]}
          </h4>
          {events
            .filter((event) =>
              event.date.includes(monthNames[currentMonth.getMonth()])
            )
            .map((event) => (
              <div
                key={event.id}
                onClick={() => {
                  onClose();
                  onSelectEvent(event);
                }}
                className="p-3 bg-pink-50 rounded-lg border border-pink-200 hover:shadow-lg cursor-pointer flex items-center justify-between mb-2"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{event.icon}</span>
                  <div>
                    <p className="font-semibold text-gray-800">{event.title}</p>
                    <p className="text-sm text-gray-600">{event.date}</p>
                  </div>
                </div>
                <span className="text-pink-600 text-sm">View →</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

const Explore: React.FC = () => {
  const username = localStorage.getItem("username") || "";
  const isAdmin = username === "admin_001";
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const upcomingEvents = [
    {
      id: 1,
      icon: "🎉",
      title: "Lucrative Ladies Social Weekend",
      date: "April 24-26, 2026",
      time: "Friday 6pm - Sunday 4pm",
      location: "Maine",
      description: "Weekend getaway with the ladies in beautiful Maine!",
      category: "Social",
    },
    {
      id: 2,
      icon: "📅",
      title: "Tax Deadline Reminder",
      date: "April 15, 2026",
      time: "All Day",
      location: "Virtual",
      website: "https://irs.gov",
      description: "Don't forget! Federal tax returns are due.",
      category: "Important Date",
    },
    {
      id: 3,
      icon: "🎨",
      title: "Make Your Own Vision Board Night",
      date: "TBD",
      time: "Evening",
      location: "Boston, MA",
      website: "",
      description:
        "Craft your 2026 vision board, enjoy wine, and connect! Date to be announced.",
      category: "Social",
    },
  ];

  const courses = [
    {
      id: 1,
      title: "Wall street 101 - Understanding Financial Services",
      provider: "Udemy",
      price: "Free",
      description: "Beginner crash course for Financial services industry.",
      link: "https://www.udemy.com/course/wall-street-101-the-financial-services-landscape/",
    },
    {
      id: 2,
      title: "Financial Peace University",
      provider: "Dave Ramsey",
      price: "$99.99",
      description: "Build wealth strategies.",
      link: "https://www.ramseysolutions.com/money/financial-peace",
    },
    {
      id: 3,
      title: "Getting Started in Finance and Accounting",
      provider: "LinkedIn Learning",
      price: "Free Trial",
      description: "Financial analysis, accounting, budgeting.",
      link: "https://www.linkedin.com/learning/paths/getting-started-in-finance-and-accounting",
    },
  ];

  const blogPosts = [
    {
      id: 1,
      title: "2026 Tax Updates: What You Need to Know",
      author: "Admin Team",
      date: "Feb 20, 2026",
      excerpt: "Key tax deduction changes...",
      readTime: "5 min read",
    },
    {
      id: 2,
      title: "5 Money Mistakes to Avoid in Your 30s",
      author: "Admin Team",
      date: "Feb 15, 2026",
      excerpt: "Learn from successful women...",
      readTime: "7 min read",
    },
  ];

  return (
    <>
      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
      {showCalendar && (
        <CalendarModal
          events={upcomingEvents}
          onClose={() => setShowCalendar(false)}
          onSelectEvent={(event) => setSelectedEvent(event)}
        />
      )}

      <div className="space-y-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-pink-100">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">✨ Explore</h2>
          <p className="text-gray-600">
            Events, courses, and resources from the Lucrative Ladies team
          </p>
        </div>

        {isAdmin && (
          <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-6 shadow-lg text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-1">Admin Panel</h3>
                <p className="text-sm opacity-90">
                  Create events, add courses, or publish blog posts
                </p>
              </div>
              <button className="bg-white text-pink-600 px-6 py-3 rounded-lg font-semibold hover:bg-pink-50">
                ➕ New Content
              </button>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-pink-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800">
              📅 Upcoming Events
            </h3>
            <button
              onClick={() => setShowCalendar(true)}
              className="text-pink-600 hover:text-pink-700 font-semibold text-sm"
            >
              View Calendar →
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                onClick={() => setSelectedEvent(event)}
                className="bg-gradient-to-br from-pink-50 to-rose-50 p-5 rounded-xl border border-pink-200 hover:shadow-lg cursor-pointer"
              >
                <div className="text-4xl mb-3">{event.icon}</div>
                <span className="px-2 py-1 bg-pink-200 text-pink-700 rounded-full text-xs font-semibold">
                  {event.category}
                </span>
                <h4 className="font-bold text-gray-800 mt-3 mb-1">
                  {event.title}
                </h4>
                <p className="text-sm text-gray-600 mb-3">{event.date}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-pink-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800">
              📚 Recommended Courses
            </h3>
            <button className="text-pink-600 hover:text-pink-700 font-semibold text-sm">
              See All →
            </button>
          </div>
          <div className="space-y-4">
            {courses.map((course) => (
              <div
                key={course.id}
                className="flex justify-between items-center p-4 bg-gray-50 rounded-xl hover:bg-pink-50 border border-gray-200"
              >
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 mb-1">
                    {course.title}
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
                    {course.description}
                  </p>
                  <div className="flex items-center space-x-3">
                    <span className="text-xs text-gray-500">
                      {course.provider}
                    </span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                      {course.price}
                    </span>
                  </div>
                </div>
                <a
                  href={course.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-2 rounded-lg hover:from-pink-600 hover:to-rose-600 text-sm font-medium"
                >
                  Learn More
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-pink-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800">
              ✍️ Latest from Lucrative Ladies
            </h3>
            <button className="text-pink-600 hover:text-pink-700 font-semibold text-sm">
              See All →
            </button>
          </div>
          <div className="space-y-4">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                className="p-5 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl border border-pink-200 hover:shadow-lg cursor-pointer"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-bold text-gray-800 text-lg">
                    {post.title}
                  </h4>
                  <span className="text-xs text-gray-500">{post.readTime}</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">
                    By {post.author} • {post.date}
                  </p>
                  <button className="text-pink-600 font-semibold text-sm hover:text-pink-700">
                    Read More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Explore;

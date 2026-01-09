"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  ShoppingCart,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  PieChart,
  Menu,
  X,
} from "lucide-react";

const AnalyticsDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [timeRange, setTimeRange] = useState("7d");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [metrics, setMetrics] = useState({
    revenue: 45231,
    users: 2345,
    orders: 1234,
    conversion: 3.24,
  });

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        revenue: prev.revenue + Math.floor(Math.random() * 200 - 50),
        users: prev.users + Math.floor(Math.random() * 20 - 5),
        orders: prev.orders + Math.floor(Math.random() * 10 - 2),
        conversion: Math.max(
          0,
          Math.min(10, prev.conversion + (Math.random() * 0.2 - 0.1))
        ),
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      id: "revenue",
      label: "Total Revenue",
      value: `$${metrics.revenue.toLocaleString()}`,
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "from-emerald-500 to-teal-600",
    },
    {
      id: "users",
      label: "Active Users",
      value: metrics.users.toLocaleString(),
      change: "+8.2%",
      trend: "up",
      icon: Users,
      color: "from-blue-500 to-cyan-600",
    },
    {
      id: "orders",
      label: "Total Orders",
      value: metrics.orders.toLocaleString(),
      change: "-2.4%",
      trend: "down",
      icon: ShoppingCart,
      color: "from-purple-500 to-pink-600",
    },
    {
      id: "conversion",
      label: "Conversion Rate",
      value: `${metrics.conversion.toFixed(2)}%`,
      change: "+0.8%",
      trend: "up",
      icon: Activity,
      color: "from-orange-500 to-red-600",
    },
  ];

  const recentActivity = [
    {
      user: "Sarah Chen",
      action: "completed purchase",
      amount: "$234.00",
      time: "2m ago",
    },
    { user: "Mike Johnson", action: "signed up", amount: null, time: "5m ago" },
    {
      user: "Emma Wilson",
      action: "completed purchase",
      amount: "$89.99",
      time: "8m ago",
    },
    {
      user: "James Brown",
      action: "abandoned cart",
      amount: "$156.00",
      time: "12m ago",
    },
    {
      user: "Lisa Anderson",
      action: "completed purchase",
      amount: "$445.00",
      time: "15m ago",
    },
  ];

  const chartData = Array.from({ length: 12 }, (_, i) => ({
    month: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ][i],
    value: Math.floor(Math.random() * 40 + 60),
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-slate-800/50 backdrop-blur-xl border-b border-slate-700/50 sticky top-0 z-50"
      >
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <BarChart3 size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold">Analytics Pro</h1>
                <p className="text-xs text-slate-400">Real-time insights</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="24h">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center font-semibold">
              OD
            </div>
          </div>
        </div>
      </motion.header>

      <div className="flex">
        {/* Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed lg:sticky top-16 lg:top-0 h-[calc(100vh-4rem)] lg:h-screen w-64 bg-slate-800/30 backdrop-blur-xl border-r border-slate-700/50 p-6 z-40"
            >
              <nav className="space-y-2 mt-8">
                {[
                  { id: "overview", label: "Overview", icon: BarChart3 },
                  { id: "analytics", label: "Analytics", icon: Activity },
                  { id: "reports", label: "Reports", icon: PieChart },
                ].map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      activeTab === item.id
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg shadow-blue-500/25"
                        : "hover:bg-slate-700/50"
                    }`}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <item.icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </motion.button>
                ))}
              </nav>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}
                  >
                    <stat.icon size={24} />
                  </div>
                  <motion.div
                    key={stat.value}
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold ${
                      stat.trend === "up"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {stat.trend === "up" ? (
                      <ArrowUpRight size={14} />
                    ) : (
                      <ArrowDownRight size={14} />
                    )}
                    {stat.change}
                  </motion.div>
                </div>
                <div>
                  <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
                  <motion.p
                    key={stat.value}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-3xl font-bold"
                  >
                    {stat.value}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2 bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Revenue Overview</h2>
                <div className="flex gap-2">
                  {["Day", "Week", "Month"].map((period) => (
                    <button
                      key={period}
                      className="px-4 py-2 text-sm rounded-lg hover:bg-slate-700/50 transition-colors"
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-64 flex items-end justify-between gap-2">
                {chartData.map((item, index) => (
                  <motion.div
                    key={item.month}
                    initial={{ height: 0 }}
                    animate={{ height: `${item.value}%` }}
                    transition={{
                      delay: 0.5 + index * 0.05,
                      type: "spring",
                      damping: 15,
                    }}
                    className="flex-1 bg-gradient-to-t from-blue-500 to-purple-600 rounded-t-lg relative group cursor-pointer"
                    whileHover={{ opacity: 0.8 }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      ${Math.floor(item.value * 100)}
                    </div>
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-slate-400">
                      {item.month}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50"
            >
              <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-700/30 transition-colors"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0">
                      {activity.user
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">
                        {activity.user}
                      </p>
                      <p className="text-xs text-slate-400">
                        {activity.action}
                      </p>
                      {activity.amount && (
                        <p className="text-xs text-emerald-400 font-semibold">
                          {activity.amount}
                        </p>
                      )}
                    </div>
                    <span className="text-xs text-slate-500">
                      {activity.time}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;

import { motion } from "framer-motion";
import {
  CreditCard,
  IndianRupee,
  TrendingUp,
} from "lucide-react";
import SalesOverviewChart from "../../components/dashboard/sales/SalesOverviewChart";
import DailySalesTrend from "../../components/dashboard/sales/DailySalesTrend";
import StatCard from "../../components/dashboard/common/StatCard";
import Header from "../../components/dashboard/Header";
import useFetchData from "../../hooks/useFetchData";

const salesStats = {
  totalRevenue: "$1,234,567",
  averageOrderValue: "$78.90",
  conversationRate: "3.45%",
  salesGrowth: "12.3%",
};

const VITE_API_URL = import.meta.env.VITE_API_URL;
const SalesPage = () => {
  const { data, loading, error } = useFetchData(
    `${VITE_API_URL}/api/v1/analytics/sales-cards`
  );
  // console.log(data, loading, error);

  return (
    <div className="flex-1 overflow-y-auto relative z-10 pb-6">
      <Header title="Sales Dashboard" />

      <main className="max-w-7xl mx-auto pt-6 px-6 lg:px-8 xl:px-20">
        {/* Sales Stats */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 1 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Total Revenue"
            icon={IndianRupee}
            value={
              loading
                ? "Loading..."
                : `Rs. ${data?.data?.totalRevenue.toLocaleString() || 0}`
            }
            color="#6366F1"
          />
          <StatCard
            name="Monthly Revenue"
            icon={IndianRupee}
            value={
              loading
                ? "Loading..."
                : `Rs. ${data?.data?.monthlyRevenue.toLocaleString() || 0}`
            }
            color="#108981"
          />
          <StatCard
            name="Conversion Rate"
            icon={TrendingUp}
            value={salesStats.conversationRate}
            color="#F59E08"
          />
          <StatCard
            name="Sales Growth"
            icon={CreditCard}
            value="$543,210"
            color="#EF4444"
          />
        </motion.div>

        {/* Sales overview chart */}
        <SalesOverviewChart />

        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* <SalesByCategoryChart/> */}
          <DailySalesTrend />
        </div>
      </main>
    </div>
  );
};

export default SalesPage;

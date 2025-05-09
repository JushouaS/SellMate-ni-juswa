import { NavBar } from "@/components/NavBar";
import { Card } from "@/components/ui/card";
import { ShoppingBag, Package, CreditCard, UserCheck, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const BuyerDashboard = () => {
  const dashboardCards = [
    {
      title: "Browse Middlemen",
      description: "Find trusted middlemen for your transactions",
      icon: <UserCheck className="h-10 w-10 text-blue-500" />,
      link: "/dashboard/buyer/middlemen"
    },
    {
      title: "My Orders",
      description: "Track and manage your orders",
      icon: <Package className="h-10 w-10 text-blue-500" />,
      link: "/dashboard/buyer/orders"
    },
    {
      title: "Payment Methods",
      description: "Manage your payment information",
      icon: <CreditCard className="h-10 w-10 text-blue-500" />,
      link: "/dashboard/buyer/payment-methods"
    },
    {
      title: "Messages",
      description: "Chat with middlemen and sellers",
      icon: <MessageCircle className="h-10 w-10 text-blue-500" />,
      link: "/dashboard/buyer/chat"
    },
  ];

  return (
    <div className="page-container">
      <NavBar userType="buyer" />
      <main className="flex-1 bg-blue-50">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {dashboardCards.map((card, index) => (
              <Link to={card.link} key={index}>
                <Card className="dashboard-card hover:border-blue-300 transition-all hover:shadow-md cursor-pointer h-[240px] flex items-center justify-center">
                  <div className="flex flex-col items-center text-center gap-4 w-full">
                    {card.icon}
                    <h2 className="text-xl font-semibold">{card.title}</h2>
                    <p className="text-gray-600 text-sm">{card.description}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
          
          <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
          <Card className="p-6">
            <p className="text-gray-500 text-center py-8">No recent activity</p>
          </Card>
        </div>
      </main>
      <footer className="bg-gray-100 py-4 text-center text-sm text-gray-600">
        &copy; {new Date().getFullYear()} Sellmate. All rights reserved.
      </footer>
    </div>
  );
};

export default BuyerDashboard;

import React from "react";
import { MdInventory2, MdReceiptLong, MdPendingActions, MdLocalShipping } from "react-icons/md";

/**
 * DashboardCards
 * Renders the 4 summary cards on the admin dashboard.
 * All numbers are computed by the parent (Dashboard.jsx) from
 * real API data — no charts, no fake data.
 *
 * Props:
 * - stats: {
 *     totalProducts: number,
 *     totalOrders: number,
 *     pendingOrders: number,
 *     deliveredOrders: number
 *   }
 */
const DashboardCards = ({ stats }) => {
  const cards = [
    {
      label: "Total Products",
      value: stats.totalProducts,
      icon: <MdInventory2 />,
      iconClass: "icon-products",
    },
    {
      label: "Total Orders",
      value: stats.totalOrders,
      icon: <MdReceiptLong />,
      iconClass: "icon-orders",
    },
    {
      label: "Pending Orders",
      value: stats.pendingOrders,
      icon: <MdPendingActions />,
      iconClass: "icon-pending",
    },
    {
      label: "Delivered Orders",
      value: stats.deliveredOrders,
      icon: <MdLocalShipping />,
      iconClass: "icon-delivered",
    },
  ];

  return (
    <div className="row g-3 g-md-4">
      {cards.map((card) => (
        <div className="col-12 col-sm-6 col-xl-3" key={card.label}>
          <div className="dash-card">
            <div className={`icon-wrap ${card.iconClass}`}>{card.icon}</div>
            <div>
              <div className="dash-card-label">{card.label}</div>
              <div className="dash-card-value">{card.value}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;

import { Link } from "react-router-dom";

export default function OrderTable({ orders }) {
  if (orders.length === 0) {
    return (
      <div className="text-center py-5">
        <h4>No Orders Found</h4>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return "warning";

      case "Confirmed":
        return "info";

      case "Shipped":
        return "primary";

      case "Delivered":
        return "success";

      case "Cancelled":
        return "danger";

      default:
        return "secondary";
    }
  };

  return (
    <div className="card border-0 shadow-sm">

      <div className="table-responsive">

        <table className="table align-middle mb-0">

          <thead className="table-light">

            <tr>

              <th>Order ID</th>

              <th>Customer</th>

              <th>Items</th>

              <th>Total</th>

              <th>Status</th>

              <th>Date</th>

              <th></th>

            </tr>

          </thead>

          <tbody>

            {orders.map((order) => (

              <tr key={order._id}>

                <td>
                  #{order._id.slice(-6).toUpperCase()}
                </td>

                <td>

                  <div className="fw-semibold">
                    {order.user.name}
                  </div>

                  <small className="text-muted">
                    {order.user.email}
                  </small>

                </td>

                <td>
                  {order.items.length}
                </td>

                <td>
                  ₹{order.totalPrice}
                </td>

                <td>

                  <span
                    className={`badge bg-${getStatusBadge(
                      order.orderStatus
                    )}`}
                  >
                    {order.orderStatus}
                  </span>

                </td>

                <td>
                  {new Date(
                    order.createdAt
                  ).toLocaleDateString()}
                </td>

                <td>

                  <Link
                    to={`/admin/orders/${order._id}`}
                    className="btn btn-outline-dark btn-sm"
                  >
                    View
                  </Link>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}
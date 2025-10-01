import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { useGetProductsQuery } from "../redux/productsApi";
import { useGetOrdersQuery } from "../redux/OrderApi";
import { Link } from "react-router-dom";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50"];

const Dashboard = () => {
  const { data: products = [] } = useGetProductsQuery();
  const { data: orders = [] } = useGetOrdersQuery();

  // Count products per category
  const categoryCounts = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});

  // Transform into chart-friendly data
  const data = Object.keys(categoryCounts).map((category) => ({
    name: category,
    value: categoryCounts[category],
  }));

  // Stats
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalPrice, 0);
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const completedOrders = orders.filter((o) => o.status === "completed").length;

  return (
    <div className="px-6 space-y-6 w-full pb-10 ">
      {/* Stats divs */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Link to={"/admin/orders"}>
          <div className="stats card bg-base-200 shadow-md p-3 rounded-lg">
            <h2 className="text-[0.8rem] text-[#575757] flex items-center gap-2 ">
              <div
                aria-label="status"
                className="status status-secondary"
              ></div>
              Orders
            </h2>
            <p className="text-2xl font-bold">{orders.length}</p>
          </div>
        </Link>
        <div className="bg-base-200 shadow-md p-3 rounded-lg">
          <h2 className="text-[0.8rem] text-[#575757] flex items-center gap-2 ">
            <div aria-label="status" className="status status-primary"></div>
            Overall Revenue
          </h2>
          <p className="text-2xl font-bold">₵{totalRevenue}</p>
        </div>
        <Link to={"/admin/products"}>
          <div className="bg-base-200 shadow-md rounded-lg p-3">
            <h2 className="text-[0.8rem] text-[#575757] flex items-center gap-2">
              <div aria-label="status" className="status status-info"></div>
              Products
            </h2>
            <p className="text-2xl font-bold">{products.length}</p>
          </div>
        </Link>
        <Link to={"/admin/orders"}>
          <div className="bg-base-200 shadow-md rounded-lg p-3">
            <h2 className="text-[0.8rem] text-[#575757] flex items-center gap-2">
              <div aria-label="status" className="status status-warning"></div>
              Pending Deliveries
            </h2>
            <p className="text-2xl font-bold">
              {
                orders.filter(
                  (o) => o.deliveryMethod === "delivery" && o.status === "paid"
                ).length
              }
            </p>
          </div>
        </Link>
        <div className="bg-base-200 shadow-md rounded-lg p-3">
          <h2 className="text-[0.8rem] text-[#575757] flex items-center gap-2 ">
            <div
              aria-label="status"
              className={`status ${
                completedOrders === orders.length
                  ? "status-success"
                  : "status-primary"
              }`}
            ></div>
            Completed Orders
          </h2>
          <p className="text-2xl font-bold">
            {completedOrders} / {orders.length}
          </p>
        </div>
      </div>

      {/* Middle Row: Orders + Chart */}
      <div className="">
        {/* Recent Orders */}
        <Link to={"/admin/orders"}>
          <div className="shadow-md p-3 rounded-lg bg-base-100">
            <div>
              <h2 className="text-lg font-bold mb-2">Recent Orders</h2>
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th className="hidden md:table-cell">Type</th>
                      <th className="hidden md:table-cell">Conatct</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice(0, 5).map((o) => (
                      <tr key={o._id}>
                        <td>{o.name}</td>
                        <td>₵{o.totalPrice}</td>
                        <td>
                          <span
                            className={`badge ${
                              o.status === "paid"
                                ? "badge-warning"
                                : "badge-success"
                            }`}
                          >
                            {o.status}
                          </span>
                        </td>
                        <td className="hidden md:table-cell">
                          {o.deliveryMethod}
                        </td>
                        <td className="hidden md:table-cell">{o.contact}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Link>
      </div>

      <div className="">
        <div>
          <h2 className="text-lg font-bold mb-4">Products by Category</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Actions */}

      <div className="w-full flex items-center justify-center">
        <div className="flex gap-4 m-auto">
          <Link to={"/admin/add-product"}>
            <button className="btn bg-black text-white rounded-full py-2 px-4 hover:bg-[#3a3a3a]">
              ➕ Add Product
            </button>
          </Link>
          <Link to={"/admin/orders"}>
            <button className="btn  bg-black text-white rounded-full py-2 px-4 hover:bg-[#3a3a3a]">
              🚚 View Orders
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

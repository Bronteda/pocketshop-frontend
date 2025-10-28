import * as orderApi from "../../services/orderService";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router";
import "./Dashboard.css";
import { UserContext } from "../../contexts/UserContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [shopOrders, setShopOrders] = useState([]);
  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const foundShopOrders = await orderApi.getOrdersByProduct();
      const foundUserOrders = await orderApi.getUserOrders();
      setShopOrders(foundShopOrders);
      setUserOrders(foundUserOrders);
    };
    fetchOrders();
  }, []);

  const linkToShopManage = () => {
    navigate("/dashboard/shop");
  };

  const linkToMyOrderPage = () => {
    navigate("/dashboard/orders");
  };

  const linkToAllProducts = () => {
    navigate("/products");
  };

  // We can filter to orders that have pending statuses later
  return (
    <main>
      <section className="section">
        <div className="container is-max-tablet">
          <div className="orders-for-shop box p-5 mb-6">
            <h2 className="title is-4 mb-4">
              {user?.has_shop ? "Active Shop Orders" : "Become a Seller"}
            </h2>
            {user?.has_shop ? (
              <>
                <button
                  onClick={linkToShopManage}
                  className="button is-black is-outlined mb-5 mt-3">
                  Go to Manage Shop
                </button>
                <div className="active-orders-div">
                  {shopOrders && shopOrders.length > 0 ? (
                    shopOrders.map((order) => (
                      <p key={order.product.id}>
                        {" "}
                        <Link
                          className="blue-link "
                          to={`dashboard/product/${order.product.id}/orders`}>
                          {" "}
                          {order.product.title}
                        </Link>{" "}
                        <span className="number-label">
                          {order.orders.length}
                        </span>
                      </p>
                    ))
                  ) : (
                    <p>No orders yet. Check back soon for your first sale!</p>
                  )}
                </div>
              </>
            ) : (
              <>
                <p className="mb-3">
                  Start your shop and share your creations.
                </p>
                <button
                  onClick={() => navigate("/shops/new")}
                  className="button is-black mt-2 mb-4">
                  Create a Shop
                </button>
              </>
            )}
          </div>
          <div className="orders-for-buyer p-5 box">
            <h2 className="title is-4">My Orders</h2>
            <div>
              {userOrders && userOrders.length > 0 ? (
                <>
                  <button
                    className="button is-black is-outlined mb-5"
                    onClick={linkToMyOrderPage}>
                    Go to My Orders
                  </button>
                </>
              ) : (
                <button
                  className="button is-black is-outlined mt-2 mb-4"
                  onClick={linkToAllProducts}>
                  Explore and Buy
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;

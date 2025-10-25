import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import * as productApi from "../../services/productService";
import * as orderApi from "../../services/orderService";
import { parseISO, format } from "date-fns";

const ProductOrders = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [statusUpdate, setStatusUpdate] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const foundProductOrders = await productApi.getProductOrders(productId);
      console.log("product and orders found by id ", foundProductOrders);
      setProduct(foundProductOrders);
    };
    fetchProduct();
    setStatusUpdate(false);
  }, [productId, statusUpdate]);

  const handleUpdateOrder = async (orderId, subtotal, quantity) => {
    try {
      const orderData = {
        subtotal: subtotal,
        quantity: quantity,
        status: "Shipped",
      };
      const updatedOrder = await orderApi.updateOrder(orderId, orderData);
      console.log("updatedOrder is:", updatedOrder);
      setStatusUpdate(true);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  if (!product) return <p>Loading product...</p>;

  return (
    <main>
      <h1>Order Details for {product.title}</h1>
      <section>
        {product.orders.map((order) => (
          <div key={order.id}>
            <div>
              <h2>Order #{order.id}</h2>
              <p>
                Date:{" "}
                {order.created_at
                  ? format(parseISO(order.created_at), "MMM d, yyyy h:mm a")
                  : "—"}
              </p>
              <p>
                <Link to={`/products/${order.product.id}`}>
                  {order.product.title}
                </Link>
              </p>
              <p>Quantity: {order.quantity}</p>
              <p>Total: ${order.subtotal}</p>
              <p>Status: {order.status}</p>
              <button
                disabled={
                  order.status === "Shipped" || order.status === "Delivered"
                    ? true
                    : false
                }
                onClick={() =>
                  handleUpdateOrder(order.id, order.subtotal, order.quantity)
                }>
                Mark as Shipped
              </button>
            </div>
            <div>
              <h2>Buyer - {order.buyer.username}</h2>
              <p>
                Name: {order.buyer.first_name} {order.buyer.last_name}
              </p>
              <p>Email: {order.buyer.email}</p>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default ProductOrders;

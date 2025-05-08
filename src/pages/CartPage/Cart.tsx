import { useCart } from "../CartPage/CartContextProvider"
import CartItem from "./CartItem";

const Cart: React.FC = () => {
  const { cart,clearCart } = useCart();
 

  if (!cart || cart.items.length === 0) {
    return (
      <div style={{ backgroundColor: "lightblue", padding: "20px" }}>
        <h2>Cart is empty</h2>
      </div>
    );
  }

  const finalPrice = cart.items.reduce(
    (sum, item) => sum + item.albumFormat.price * item.quantity,
    0
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Cart</h2>
      <p>Final Price: €{finalPrice}</p>

      <div>
        {cart.items.map((item) => (
          <CartItem key={item._id} data={item} />
        ))}
      </div>

      <button onClick={() => {clearCart()}}>Clear Cart</button>
    </div>
  );
};

export default Cart;

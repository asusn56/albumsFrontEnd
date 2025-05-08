import Cart from './Cart';
import { CartProvider } from './CartContextProvider';



const CartPage: React.FC = () => {
    return (
        <CartProvider>
            <Cart />
          
        </CartProvider>
    )
}

export default CartPage
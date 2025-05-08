import { useCart } from "./CartPage/CartContextProvider"




const CartProduct: React.FC<CartItemProps> = ({ data }) => {
    const { updateCartItem, removeFromCart } = useCart()
    const { name, id, quantity, price } = data

    return (
        <div style={{ border: '1px solid blue', padding: '10px', marginBottom: '5px' }}>
            <h3>{name}</h3>
            <h1>CARPROD</h1>
            <p>Price: €{price} x {quantity} = €{price * quantity}</p>

            <button onClick={() => updateCartItem(id, quantity - 1)} disabled={quantity <= 1}>-1</button>
            <input type="number" min={1} value={quantity} onChange={event => updateCartItem(id, +event.target.value)} />
            <button onClick={() => updateCartItem(id, quantity + 1)}>+1</button>
            <button onClick={() => removeFromCart(id)}>Remove From Cart</button>
        </div>
    )
}

export default CartProduct;
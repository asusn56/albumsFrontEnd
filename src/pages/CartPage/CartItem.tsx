// import React from 'react';
// import { CartItem as CartItemType } from '../../types/CartItemType'
// import { AlbumFormat } from '../../types/AlbumFormatType';

// interface CartItemProps {
//   item: CartItemType;
//   onUpdateQuantity: (quantity: number) => void;
//   onRemove: () => void;
// }

// const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemove }) => {
//   const { albumFormat, quantity } = item;
//   const price = albumFormat?.price || 0;
//   console.log(item);


  
//   return (
//     <li>
//       <h2>{albumFormat.album.title}</h2>
//       <h3>{albumFormat?.albumType?.name || 'Unknown Format'}</h3>
//       <p>Price: €{price}</p>
      
//       <p>
//         Quantity:
//         <button onClick={() => onUpdateQuantity(quantity - 1)} disabled={quantity <= 1}>
//           -
//         </button>
//         {quantity}
//         <button onClick={() => onUpdateQuantity(quantity + 1)}>+</button>
//       </p>
//       <p>Subtotal: €{(price * quantity)}</p>
//       <button onClick={onRemove}>Remove</button>
//     </li>
//   );
// };

// export default CartItem;
// import React from 'react';
// import { CartItem as CartItemType } from '../../types/CartItemType'
// import { AlbumFormat } from '../../types/AlbumFormatType';

// interface CartItemProps {
//   item: CartItemType;
//   onUpdateQuantity: (quantity: number) => void;
//   onRemove: () => void;
// }

// const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemove }) => {
//   const { albumFormat, quantity } = item;
//   const price = albumFormat?.price || 0;
//   console.log(item);


  
//   return (
//     <li>
//       <h2>{albumFormat.album.title}</h2>
//       <h3>{albumFormat?.albumType?.name || 'Unknown Format'}</h3>
//       <p>Price: €{price}</p>
      
//       <p>
//         Quantity:
//         <button onClick={() => onUpdateQuantity(quantity - 1)} disabled={quantity <= 1}>
//           -
//         </button>
//         {quantity}
//         <button onClick={() => onUpdateQuantity(quantity + 1)}>+</button>
//       </p>
//       <p>Subtotal: €{(price * quantity)}</p>
//       <button onClick={onRemove}>Remove</button>
//     </li>
//   );
// };

// export default CartItem;

import { useCart } from "../CartPage/CartContextProvider"
import { CartItem as CartItemType } from "../../types/CartItemType";

type Props = {
  data: CartItemType;
};

const CartItem: React.FC<Props> = ({ data }) => {
  const { updateCartItem, removeFromCart } = useCart();
  const { albumFormat, quantity } = data;
  console.log("data",data);
  console.log(quantity);
  
console.log(data._id);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      updateCartItem(data._id, newQuantity);
    }
  };

  return (
    <div className="car-item">
      <h3>{albumFormat.album.title} ({albumFormat.albumType.name})</h3>
      <p>Price: €{albumFormat.price} × {quantity} = €{albumFormat.price * quantity}</p>

      <button onClick={() => handleQuantityChange(quantity - 1)} disabled={quantity <= 1}>-1</button>
   
      <button onClick={() => handleQuantityChange(quantity + 1)}>+1</button>

      <button onClick={() => removeFromCart(data._id)}>Remove</button>
    </div>
  );
};

export default CartItem;

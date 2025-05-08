import { useCart } from "../../src/pages/CartPage/CartContextProvider";
import { useAuth } from "../AuthContext";

import { AlbumFormat } from "../types/AlbumFormatType";

type FormatItemProps = {
    data: AlbumFormat;
  };
  
  const FormatItem: React.FC<FormatItemProps> = ({ data }) => {
    const { user } = useAuth()
    const { addToCart } = useCart();
    
    return (
       
    <div className="format-item">
           <li key={data._id}>
    <strong>{data.albumType.name}</strong>  {data.albumType.description}
    ${data.price} — Stock: {data.stock}
    {user && ( <button onClick={() => addToCart(data._id, 1)} disabled={data.stock === 0}>Add to Cart</button>
      )}
  </li>


    </div>
     
    )
  }


  export default FormatItem;
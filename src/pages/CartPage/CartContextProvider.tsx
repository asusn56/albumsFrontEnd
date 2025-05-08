  import { createContext, useReducer, useContext, useEffect, ReactNode } from "react";
 
import userAuth from "../../api/userAuth";
import { CartItem } from "../../types/CartItemType";


  export interface CreateCart {
    
    user: string;
    items: CartItem[];
   
  }

  export interface Cart extends CreateCart {
    _id: string;
   
    updatedAt: string;
  }

  interface CartState {
    cart: Cart | null;
    loading: boolean;
    error: string | null;
  }

  export enum CartActionTypes {
    FETCH_CART = 'FETCH_CART',
    ADD_ITEM = 'ADD_ITEM',
    REMOVE_ITEM = 'REMOVE_ITEM',
    CLEAR_CART = 'CLEAR_CART',
    UPDATE_QUANTITY = 'UPDATE_QUANTITY'
}


  type CartAction =
    | { type: CartActionTypes.FETCH_CART; payload: Cart }
    | { type: CartActionTypes.ADD_ITEM; payload: Cart }
    | { type: CartActionTypes.UPDATE_QUANTITY; payload: Cart }
    | { type: CartActionTypes.REMOVE_ITEM; payload: Cart }
    | { type: CartActionTypes.CLEAR_CART; payload: Cart }
    | { type: "SET_LOADING" }
    | { type: "SET_ERROR"; payload: string };

  interface CartContextType extends CartState {
    fetchCart: () => void;
    addToCart: (albumFormatId: string, quantity: number) => void;
    updateCartItem: (albumFormatId: string, quantity: number) => void;
    removeFromCart: (albumFormatId: string) => void;
    clearCart: () => void;
  }

  const CartContext = createContext<CartContextType | undefined>(undefined);


  const initialState: CartState = {
    cart: null,
    loading: false,
    error: null,
  };

  function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
      case "FETCH_CART":
      case CartActionTypes.ADD_ITEM:
      case CartActionTypes.UPDATE_QUANTITY:
      case CartActionTypes.REMOVE_ITEM:
        return { ...state, cart: action.payload, loading: false, error: null };
        case CartActionTypes.CLEAR_CART:
        return { ...state, cart: action.payload, loading: false, error: null };
      case "SET_LOADING":
        return { ...state, loading: true };
      case "SET_ERROR":
        return { ...state, error: action.payload, loading: false };
      default:
        return state;
    }
  }


  export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);
    const { cart,error } = state







    const fetchCart = async () => {
      dispatch({ type: "SET_LOADING" });
      try {
       
        const response = await userAuth.get("/cart");
       
        dispatch({ type: CartActionTypes.FETCH_CART, payload: response.data });
      } catch (error: any) {
        dispatch({ type: "SET_ERROR", payload: error.message });
      }
    };

    const addToCart = async (albumFormatId: string, quantity: number) => {
      dispatch({ type: "SET_LOADING" });
      try {
      
        const response = await userAuth.post("/cart", { albumFormatId, quantity });
        await fetchCart();
        dispatch({ type: CartActionTypes.ADD_ITEM, payload: response.data });
      } catch (error: any) {
        dispatch({ type: "SET_ERROR", payload: error.message });
      }
    };

    const updateCartItem = async (albumFormatId: string, quantity: number) => {
      dispatch({ type: "SET_LOADING" });
      try {
        const response = await userAuth.put(`/cart/${albumFormatId}`,{ quantity });
        await fetchCart();
        dispatch({ type: CartActionTypes.UPDATE_QUANTITY, payload: response.data });
        
      } catch (error: any) {
        dispatch({ type: "SET_ERROR", payload: error.message });
      }
    };

    const removeFromCart = async (itemId: string) => {
      dispatch({ type: "SET_LOADING" });
      try {
        const response = await userAuth.delete(`/cart/${itemId}`);
        await fetchCart();
        dispatch({ type: CartActionTypes.REMOVE_ITEM, payload: response.data });
      } catch (error: any) {
        dispatch({ type: "SET_ERROR", payload: error.message });
      }
    };

    const clearCart = async () => {
      dispatch({ type: "SET_LOADING" });
      try {
        const response = await userAuth.delete("/cart/");
        await fetchCart();
        dispatch({ type: CartActionTypes.CLEAR_CART, payload: response.data });
      } catch (error: any) {
        dispatch({ type: "SET_ERROR", payload: error.message });
      }
    };


    useEffect(() => {
      fetchCart();
    }, []);



    const ctxValue: CartContextType = {
      cart,
    error,
    fetchCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart
      };
    


    return (
      <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
    );
  };


  export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
      throw new Error("useCart must be used within a CartProvider");
    }
    return context;
  };


import { BrowserRouter, Route, Routes } from "react-router"

import AlbumsPage from './pages/AlbumsPage';
import SingleAlbumPage from './pages/SingleAlbumPage';
import { AlbumsContextProvider } from "./pages/AlbumsContextProvider";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { CartProvider } from "./pages/CartPage/CartContextProvider";

import CartPage from './pages/CartPage/CartPage';


function App() {
  
  return (
    <AlbumsContextProvider>
      <CartProvider>
    <BrowserRouter>
    <Routes>
    <Route path='cart2' element={<CartPage />} />
    <Route path='cart' element={<CartPage />} />
    <Route path="/" element={<AlbumsPage />} />
    <Route path='albums'>
    <Route index element={<AlbumsPage />} />
      <Route path=":id" element={<SingleAlbumPage/>} />
      
      </Route>
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/register" element={<RegisterPage/>} />
     </Routes>
    </BrowserRouter>
    </CartProvider>
    </AlbumsContextProvider>
  
  )
}

export default App

import React, { createContext, ReactNode, useContext, useEffect, useReducer } from "react"
import { Album } from '../types/AlbumType';
import { AlbumActionTypes, albumInitialState, albumReducer } from "./AlbumsReducer";
import { createAlbum, getAllAlbums } from '../api/albums';


type AlbumsContextProviderProps = {
    children: ReactNode
}
type AlbumsContextType = {
  albums: Album[];
  selectedAlbum?: Album;
  loading: boolean;
  error?: string;
  fetchAlbums: () => Promise<void>;
  addAlbum: (album: Album) => void;
  getAlbum: (id: string) => Album |undefined;
  updateAlbum: (album: Album) => Promise<void>;
  deleteAlbum: (id: string) => Promise<void>;
  
  
}

const AlbumsContext = createContext<AlbumsContextType | undefined>(undefined);
export const AlbumsContextProvider: React.FC<AlbumsContextProviderProps> = ({ children }) => {
    
    const [state, dispatch] = useReducer(albumReducer, albumInitialState);
    const {albums} = state;
  

    useEffect(() => {
      fetchAlbums();
  }, []);



//
const fetchAlbums = async () => {
  dispatch({ type: AlbumActionTypes.SET_LOADING, payload: true });
  try {
    const data = await getAllAlbums();;
    console.log("data",data);
    
    dispatch({ type: AlbumActionTypes.GET_ALBUMS, payload: data });
  } catch (error: any) {
    dispatch({ type: AlbumActionTypes.SET_ERROR, payload: error.message });
  } finally {
    dispatch({ type: AlbumActionTypes.SET_LOADING, payload: false });
  }
};  
const getAlbum =  (id: string) => {
  
 
    const foundAlbum =  albums.find((album) => album._id === id);
   
    
    return foundAlbum;
   
};

const addAlbum = async (album: Album) => {
  try {
  const data = await createAlbum(album);
    dispatch({ type: AlbumActionTypes.ADD_ALBUM, payload: data });
  } catch (error: any) {
    dispatch({ type: AlbumActionTypes.SET_ERROR, payload: error.message });
  }
};

const updateAlbum = async (album: Album) => {
  try {
    const res = await fetch(`/api/albums/${album._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(album),
    });
    const updated = await res.json();
    dispatch({ type: AlbumActionTypes.UPDATE_ALBUM, payload: updated });
  } catch (error: any) {
    dispatch({ type: AlbumActionTypes.SET_ERROR, payload: error.message });
  }
};

const deleteAlbum = async (id: string) => {
  try {
    await fetch(`/api/albums/${id}`, { method: "DELETE" });
    dispatch({ type: AlbumActionTypes.DELETE_ALBUM, payload: id });
  } catch (error: any) {
    dispatch({ type: AlbumActionTypes.SET_ERROR, payload: error.message });
  }
};







const ctxValue: AlbumsContextType = {
  albums: albums,
 
  loading: state.loading,
  error: state.error,
  fetchAlbums,
  addAlbum,
  updateAlbum,
  deleteAlbum,
  getAlbum,
  };






    return <AlbumsContext.Provider value={ctxValue}>{children}</AlbumsContext.Provider>;
};

export const useAlbums = () => {
    const ctx = useContext(AlbumsContext);
    if (!ctx) throw new Error("useAlbums must be used within AlbumsContextProvider");
    return ctx;
  };
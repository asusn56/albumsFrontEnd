import { Album } from "../types/AlbumType";


export enum AlbumActionTypes {
    GET_ALBUMS = "GET_ALBUMS",
    GET_ALBUM = "GET_ALBUM",
    ADD_ALBUM = "ADD_ALBUM",
    UPDATE_ALBUM = "UPDATE_ALBUM",
    DELETE_ALBUM = "DELETE_ALBUM",
    // SET_SELECTED_ALBUM = "SET_SELECTED_ALBUM",
    SET_LOADING = "SET_LOADING",
    SET_ERROR = "SET_ERROR",
  }
  
  export type AlbumAction =
    | { type: AlbumActionTypes.GET_ALBUMS; payload: Album[] }
    | { type: AlbumActionTypes.GET_ALBUM; payload: Album }
    | { type: AlbumActionTypes.ADD_ALBUM; payload: Album }
    | { type: AlbumActionTypes.UPDATE_ALBUM; payload: Album }
    | { type: AlbumActionTypes.DELETE_ALBUM; payload: string } 
    // | { type: AlbumActionTypes.SET_SELECTED_ALBUM; payload: Album }
    | { type: AlbumActionTypes.SET_LOADING; payload: boolean }
    | { type: AlbumActionTypes.SET_ERROR; payload: string };


    export interface AlbumState {
        albums: Album[];
        selectedAlbum?: Album;
        loading: boolean;
        error?: string;
      }

      
export const albumInitialState:AlbumState = {
    albums: [],
    selectedAlbum: undefined,
    loading: false,
    error: undefined,
  };


export const albumReducer = (state: AlbumState, action: AlbumAction): AlbumState => {
    switch (action.type) {
      case AlbumActionTypes.GET_ALBUMS:
        return { ...state, albums: action.payload };
      case AlbumActionTypes.GET_ALBUM:
          return { ...state, selectedAlbum: action.payload };
      case AlbumActionTypes.ADD_ALBUM:
        return { ...state, albums: [...state.albums, action.payload] };
  
      case AlbumActionTypes.UPDATE_ALBUM:
        return {
          ...state,
          albums: state.albums.map(album =>
            album._id === action.payload._id ? action.payload : album
          ),
        };
  
      case AlbumActionTypes.DELETE_ALBUM:
        return {
          ...state,
          albums: state.albums.filter(album => album._id !== action.payload),
        };
  
      // case AlbumActionTypes.SET_SELECTED_ALBUM:
      //   return { ...state, selectedAlbum: action.payload };
  
      case AlbumActionTypes.SET_LOADING:
        return { ...state, loading: action.payload };
  
      case AlbumActionTypes.SET_ERROR:
        return { ...state, error: action.payload };
  
      default:
        return state;
    }
  };
  
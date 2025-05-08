import axios from "axios";
import { Album } from '../types/AlbumType';

const API_URL =	import.meta.env.VITE_API_URL;

export const getAllAlbums = async (): Promise < Album[] >=> {
    try {

        const { data } = await axios.get(`${API_URL}/albums`);

        console.log("axios",data);
        
        return data;
    } catch (error) {
        console.error('/getAllAlbums:', error);
        throw new Error("getAllAlbums");
    }
};

export const getAlbumById = async (id: string): Promise<Album> => {
    const {data} = await axios.get(`${API_URL}/albums/${id}`);
    return data;
  };

export const createAlbum = async (album:Album):Promise<Album>=>{

    try{
        const {data} = await axios.post(`${API_URL}/albums`,album)
        return data;
    }catch {
        throw new Error("createNewAlbum");
    }
 

}
import axios from "axios";
import { CreateUser } from "../types/UserType";
const API_URL =	import.meta.env.VITE_API_URL;

export const createUser = async (user:CreateUser):Promise<CreateUser>=>{

    try{
        const {data} = await axios.post(`${API_URL}/users/register`,user)
        return data;
    }catch {
        throw new Error("createNewAlbum");
    }
 

}
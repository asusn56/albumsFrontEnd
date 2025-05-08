import axios from "axios";

import { AlbumFormat } from "../types/AlbumFormatType";

const API_URL =	import.meta.env.VITE_API_URL;

export const getAllFormats= async (): Promise < AlbumFormat[] >=> {
    try {

        const { data } = await axios.get(`${API_URL}/album-formats`);

        console.log("axios",data);
        
        return data;
    } catch (error) {
        console.error('/fromats:', error);
        throw new Error("fromats");
    }
};
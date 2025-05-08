import axios from "axios";

import { Review } from "../types/ReviewType";

const API_URL =	import.meta.env.VITE_API_URL;

export const getAllReviews= async (): Promise < Review[] >=> {
    try {

        const { data } = await axios.get(`${API_URL}/reviews`);

        console.log("axios",data);
        
        return data;
    } catch (error) {
        console.error('/reviews:', error);
        throw new Error("reviews");
    }
};
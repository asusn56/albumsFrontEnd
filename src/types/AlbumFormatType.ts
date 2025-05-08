import { Album } from "./AlbumType";
import { AlbumType } from "./AlbumTypeType";

export interface CreateAlbumFormat {
    
    album: Album;
    albumType: AlbumType;
    price: number;
    stock: number;
  
}

export interface AlbumFormat extends CreateAlbumFormat {
    _id: string;
    createdAt?: string;
    updatedAt?: string;
}
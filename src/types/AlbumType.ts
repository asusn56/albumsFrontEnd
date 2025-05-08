import { Artist } from "./ArtistType";
import { Genre } from "./GenreType";
import { User } from "./UserType";
import { Track } from './TrackType';
import { AlbumType } from './AlbumTypeType';
import { AlbumFormat } from "./AlbumFormatType";

export interface CreateAlbum  {
    
    title: string;
    artist:  Artist; 
    genreId:  Genre;
    albumFormat:AlbumFormat[];
    releaseDate: string; 
    albumType:AlbumType[];
    coverImageUrl?: string;
    description?: string;
    price: number;
    stock: number;
    albumAddedBy:  User;
    createdAt: string;
    updatedAt: string;
    trackList:Track[],
  }

  export interface Album extends CreateAlbum{
    _id: string; 
  }
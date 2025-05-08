import { Album } from './AlbumType';
import { User } from './UserType';
import { Types } from 'mongoose'
export interface CreateReview {

   
    album: Album;
    // user: User;
    rating?: number;
    comment: string;
   
    
  }
  export interface Review extends CreateReview {
    _id: string;

  }
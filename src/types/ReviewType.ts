import { Album } from './AlbumType';
import { User } from './UserType';
export interface CreateReview {

   
    album: Album;
    user: User;
    rating?: number;
    comment: string;
   
    
  }
  export interface Review extends CreateReview {
    _id: string;

  }
export interface CreateArtist {
   
    title: string;
    imageUrl?: string;
    bio?: string;
    genre?: string;
    formedIn?: string; 
    // albums?: string[] | Album[];
  }
  export interface Artist extends CreateArtist {
    _id: string;

  }
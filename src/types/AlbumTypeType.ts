export interface CreateAlbumType  {
  
    name: 'Disc' | 'Vinyl' | 'DVD' | 'Cassette';
    description?: string;
  };


  export interface AlbumType extends CreateAlbumType  {
    _id: string;
    
  };

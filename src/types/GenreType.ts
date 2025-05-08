export interface CreateGenre {
    _id: string;
    name: string;
    description?: string;
  }
  export interface Genre extends CreateGenre{
    _id: string;
    
  }
  
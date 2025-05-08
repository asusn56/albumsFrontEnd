export interface CreateTrack {
    trackNumber: number;
    title: string;
    duration?: string;
  }

  export interface Track extends CreateTrack {
    _id: string;
    
  }
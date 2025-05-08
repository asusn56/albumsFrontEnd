export interface CreateUser {
  
    username: string;
    email: string;
     password: string; 
  
  }
  export interface User extends CreateUser {
    _id: string;
    role: 'User' | 'Admin' | 'Moderator';
  }


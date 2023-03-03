export interface NotesDto {
  _id: string;
  title: string;
  text: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface UserDto {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

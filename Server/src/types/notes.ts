export interface createDto {
  title: string;
  text?: string;
  userId: string;
}

export interface userResponcesDto {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

import { UserDto } from "../types";

interface TokenDto {
  token: string;
}

export const setTokenCookie = ({ token }: TokenDto) => {
  const cookieName = "access_token"; // choose a name for your cookie
  document.cookie = `${cookieName}=${token}; path=/; max-age=${
    60 * 60 * 24 * 7
  }; SameSite=strict;`; // set the cookie value and options
};

export const getTokenCookie = () => {
  const cookieName = "access_token"; // choose a name for your cookie
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(cookieName + "="));
  return cookie ? cookie.split("=")[1] : undefined;
};

//get user details from local storage
export const getUserFromLocalStorage = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : undefined;
};

//set user details to local storage
export const setUserToLocalStorage = (user: UserDto) => {
  localStorage.setItem("user", JSON.stringify(user));
};

//set token to local storage
export const setTokenToLocalStorage = (token: TokenDto) => {
  localStorage.setItem("access_token", JSON.stringify(token));
};

//get token from local storage
export const getTokenFromLocalStorage = () => {
  const token = localStorage.getItem("access_token");
  return token ? JSON.parse(token) : undefined;
};

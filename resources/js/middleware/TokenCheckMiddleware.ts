/**
 * If user authenticated -> user & menu will stored.
 * @param next
 */
import {MiddlewareInterface} from "./MiddlewareInterface";
import {usersStore} from "../store/modules/UsersStore";
import {http, setToken} from "../utils/axios";
import {apiRoutes} from "../apiRoutes";
import {applicationStore} from "../store/modules/ApplicationStore";

export interface ITokenDecoded {
  exp: number;
  iat: number;
  iss: string;
  jti: string;
  nbf: number;
  prv: string;
  sub: number;
}

const decodedToken = (): ITokenDecoded | null => {
  const token = sessionStorage.getItem('accessToken');
  if (!token) return null;
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

/**
 * @param decodedToken
 */
const isTokenExpired = (decodedToken: ITokenDecoded) => {
  return decodedToken.exp < Date.now() / 1000;
};

const refreshToken = async (): Promise<boolean> => {
  if (!applicationStore.itWasTokenRefreshAttempt) {
    applicationStore.setTokenRefreshAttempt(true);
    try {
      const token = await http.post(apiRoutes.auth.refreshToken);
      applicationStore.setTokenRefreshAttempt(false);
      setToken(token.data.access_token);
      return true;
    } catch (e) {
      return false;
    }
  }
  return false;
};

export default async ({next}: MiddlewareInterface) => {
  const token = decodedToken();

  if (!token) {
    usersStore.setAuthorized(false);
    return next();
  }

  if (isTokenExpired(token)) {
    const refreshedToken = await refreshToken();
    usersStore.setAuthorized(refreshedToken);
  }

  return next();
}

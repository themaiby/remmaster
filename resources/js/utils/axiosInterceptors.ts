export interface ITokenDecoded {
  exp: number;
  iat: number;
  iss: string;
  jti: string;
  nbf: number;
  prv: string;
  sub: number;
}

/**
 * Return false on fail
 * @param token
 */



import IUser from "../models/IUser";

const rolesConst = {
  admin: 'Admin',
};

const hasRole = (user: IUser, role: string): boolean => {
  if (!user.roles) return false;
  return user.roles.some(userRole => userRole.name === role)
};

const isAdmin = (user: IUser): boolean => {
  return hasRole(user, rolesConst.admin);
};

const can = (user: IUser, action: string): boolean => {
  if (!user.roles) return false;
  return user.permissions.some(pernission => pernission.name === action)
};


export const userHelper = {hasRole, can, isAdmin};

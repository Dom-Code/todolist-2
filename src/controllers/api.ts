import { Request, Response, NextFunction } from 'express';

const home = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({
    message: 'this home from controllers.',
  });
};

const login = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({
    message: 'this Login from controllers.',
  });
};

const register = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({
    message: 'this Register from controllers.',
  });
};

const logout = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({
    message: 'this Logout from controllers.',
  });
};

export default {
  home,
  login,
  register,
  logout,
};

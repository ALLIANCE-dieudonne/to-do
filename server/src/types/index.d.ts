import { Request, Response } from "express";

export interface AuthRequest extends Request{
    user:{
        id: string; role?: string
    }
}

type AuthMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => void



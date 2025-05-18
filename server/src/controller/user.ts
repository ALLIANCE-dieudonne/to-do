import { compareSync, hashSync } from "bcrypt";
import { Request, Response } from "express"
import prisma from "../prisma/prisma-client"
import jwt from "jsonwebtoken"
import ServerResponse from "../utils/ServerResponse";
import { AuthRequest } from "../types";

export const createUser = async (req: Request, res: Response) =>{

    try {
        const { email, name, password } = req.body
        const hashedPassword = hashSync(password, 10)
        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
            }
        })
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY as string, { expiresIn: '3d' })
         ServerResponse.created(res, "User created successfully", { user, token }) 
    } catch (error: any) {
        if (error.code === 'P2002') {
            const key = error.meta.target[0]
             ServerResponse.error(res, `${key.charAt(0).toUpperCase() + key.slice(1)} (${req.body[key]}) already exists`, 400) 
        }
         ServerResponse.error(res, "Error occured", { error }) 
    }

}

export const login:any = async (req: Request, res: Response) =>{
    try {
        const {email, password} = req.body
    
        const user = await prisma.user.findUnique({
            where: {email}
        })
    
        if(!user)  return ServerResponse.error(res,"Invalid email or passsword");
    
        const isMatch = compareSync(password, user.password);
    
        if(!isMatch) return ServerResponse.error(res, "Invalid email or password");
    
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET_KEY as string, {expiresIn: '3d'}) 
    
        return ServerResponse.success(res, "Login success",{ user, token  });
        
       } catch (error) {
        ServerResponse.error(res, "Something went wrong", error)
       }
}

export const me:any = async (req: AuthRequest, res: Response) => {
    try {
        const user = await prisma.user.findUnique({ where: { id: req.user.id } })
         return ServerResponse.success(res, "User fetched successfully", { user })
    } catch (error) {
        return ServerResponse.error(res, "Error occured", { error })
    }
  }
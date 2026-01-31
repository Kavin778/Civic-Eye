import {Request,Response, NextFunction } from "express";
import { HttpError } from "../error/HttpError";
import { ZodError } from "zod";

export const ErrorHandler = async(err:Error,req:Request,res:Response,next:NextFunction,)=>{
    if(err instanceof HttpError){
        return  res.status(err.statusCode).json({
            message:err.message
        })
    }

    if(err instanceof ZodError){
        return res.status(400).json({
            message:"Validation Failed"
        })
    }

    return res.status(500).json({
        message:"Internal Error"
    })
}
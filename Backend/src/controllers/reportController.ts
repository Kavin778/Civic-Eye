import { Request, Response, NextFunction } from "express";
import { createReportSchema } from "../validator/reportValidator";
import { createReportService } from "../service/reportService";
import { success } from "zod";

export const createReportController = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try{
        const validatedRequest = createReportSchema.parse(req.body);
        const response = await createReportService(validatedRequest);

        res.status(response.statusCode).json({
            success: response.success,
            message: response.message,
            data: response.data,
        });
    } catch(error){
        next(error);
    }
};

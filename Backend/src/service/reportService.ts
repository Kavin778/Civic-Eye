import { reportResponse, reportResponseDTO } from "../dto/reportDTO";
import { HttpError } from "../error/HttpError";
import { createReportRepo } from "../repo/reportRepo";
import { reportTransformer } from "../transformer/reportTransformer";
import { createReportType } from "../validator/reportValidator";

export const createReportService = async (data: createReportType): 
Promise<reportResponseDTO<reportResponse>> => {
    try{
        const response = await createReportRepo(data);

        const transformedResponse = reportTransformer.createReportTransformer(response);

        return {
            success: true,
            statusCode: 201,
            message: "Report created successfully",
            data: transformedResponse,
        };
    } catch(error){
        if(error instanceof HttpError){
            throw error;
        }

        throw new HttpError(500, "Internal server error");
    }
}
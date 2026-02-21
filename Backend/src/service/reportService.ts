import { CacheKeys } from "../cache/cacheKeys";
import { CacheService } from "../cache/redisClient";
import { reportResponse, reportResponseDTO } from "../dto/reportDTO";
import { HttpError } from "../error/HttpError";
import { createReportRepo, findReportById } from "../repo/reportRepo";
import { reportTransformer } from "../transformer/reportTransformer";
import { createReportType, reportIdType } from "../validator/reportValidator";

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

export const getReportService = async (data: reportIdType):
Promise<reportResponseDTO<reportResponse>> => {
    try{
        const cacheKey = CacheKeys.reportById(data);

        const cachedResponse = await CacheService.get<reportResponse>(cacheKey);

        if(cachedResponse){
            return {
                success: true,
                statusCode: 200,
                message: "Report fetched Successfully",
                data: cachedResponse,
            };
        }

        const dbResponse = await findReportById(data);

        if(! dbResponse){
            throw new HttpError(404, "Report Not found");
        }

        const transformedResponse = reportTransformer.createReportTransformer(dbResponse);

        await CacheService.set(cacheKey, transformedResponse, 3600);

        return{
            success: true,
            statusCode: 200,
            message: "Report fetched Successfully",
            data: transformedResponse,
        };
    } catch(error){
        if (error instanceof HttpError) {
            throw error;
        }

        throw new HttpError(500, "Error while fetching report");
    }
};
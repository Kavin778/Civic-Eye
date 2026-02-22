import { CacheKeys } from "../cache/cacheKeys";
import { CacheService } from "../cache/redisClient";
import { reportResponse, reportResponseDTO } from "../dto/reportDTO";
import { HttpError } from "../error/HttpError";
import { countReports, createReportRepo, findAllReports, findReportById } from "../repo/reportRepo";
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

export const getAllReportService = async (page: number, limit: number):
Promise<reportResponseDTO<reportResponse[]>> => {
    try{
        const skip = (page - 1) * limit;

        const cacheKey = CacheKeys.allReports(page, limit);

        const cachedResponse = await CacheService.get<{
            data: reportResponse[];
            totalRecords: number;
        }>(cacheKey);

        if(cachedResponse){
            return{
                success: true,
                statusCode: 200,
                message: "Reports Fetched Successfully",
                page,
                limit,
                totalRecords: cachedResponse.totalRecords,
                totalPages: Math.ceil(cachedResponse.totalRecords / limit),
                data: cachedResponse.data,
            };
        }

        const [dbResponse, totalRecords] = await Promise.all([
            findAllReports(skip, limit),
            countReports(),
        ]);

        if (!dbResponse || dbResponse.length === 0) {
            throw new HttpError(404, "Reports not found");
        }

        const transformedResponse = dbResponse.map(reportTransformer.createReportTransformer);

        await CacheService.set(cacheKey, { data: transformedResponse, totalRecords }, 3600);

        return {
            success: true,
            statusCode: 200,
            message: "Reports fetched successfully",
            page,
            limit,
            totalRecords,
            totalPages: Math.ceil(totalRecords/limit),
            data: transformedResponse,
        };
    } catch(error){
        if(error instanceof HttpError)
            throw error;

        throw new HttpError(500, "Error while fetching reports");
    }
}
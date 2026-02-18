import { Report } from "@prisma/client";
import { reportResponse } from "../dto/reportDTO";

export class reportTransformer {
    static createReportTransformer(data: Report): reportResponse {
        return {
            id: data.id,
            description: data.description,
            type: data.type,
            status: data.status,
            latitude: data.latitude,
            longtitude: data.longtitude,
            beforeImage: data.beforeImage,
            afterImage: data.afterImage,
            streetName: data.streetName,
            streetNumber: data.streetNumber,
            city: data.city,
            region: data.region,
            isoCountryCode: data.isoCountryCode,
            postalCode: data.postalCode,
            formattedAddress: data.formattedAddress,
            accuracy: data.accuracy,
            remarks: data.remarks,
            createdAt: data.createdAt,
            resolvedAt: data.resolvedAt,
            userId: data.userId,
        }
    }
}
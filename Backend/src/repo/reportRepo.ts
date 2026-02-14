import { Report,Prisma } from "@prisma/client";
import { prisma } from "../config/db";
import { HttpError } from "../error/HttpError";
import { createReportType } from "../validator/reportValidator";

export const createReportRepo = async (data: createReportType): Promise<Report> => {
  try {
    const response = await prisma.report.create({
      data: {
        description: data.description,
        type: data.type,
        accuracy: data.accuracy,
        remarks: data.remarks,
        streetName: data.streetName,
        streetNumber: data.streetNumber,
        city: data.city,
        region: data.region,
        isoCountryCode: data.isoCountryCode,
        postalCode: data.postalCode,
        formattedAddress: data.formattedAddress,
        latitude: data.latitude,
        longtitude: data.longtitude,
        beforeImage: data.beforeImage,
        afterImage: data.afterImage,
        userId: data.userId,
      },
    });

    return response;
  } catch (error) {
        throw new HttpError(422, "Unable to create the report");
  }
};
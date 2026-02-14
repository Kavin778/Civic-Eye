import {boolean, z} from "zod";

export const createReportSchema = z.object({
    description : z.string().trim().min(1, { message: "Decription is required"}),
    type : z.string().trim().min(1, { message: "Type is required"}),
    status : z.enum(["open", "in_progress", "resolved", "closed"]).optional(),
    isMocked : z.boolean().optional(),
    accuracy : z.number().optional(),
    userConfirmed : z.boolean().optional(),
    remarks : z.array(z.string().trim()).default([]),
    streetName : z.string().trim().optional(),
    streetNumber : z.string().trim().optional(),
    city : z.string().trim().optional(),
    region : z.string().trim().optional(),
    isoCountryCode : z.string().trim().optional(),
    postalCode : z.string().trim().optional(),
    formattedAddress : z.string().trim().optional(),
    latitude : z.coerce.number().min(-90).max(90),
    longtitude : z.coerce.number().min(-180).max(180),
    beforeImage: z.url({ message: "beforeImage must be a valid URL" }),
    afterImage: z.url({ message: "afterImage must be a valid URL" }),
    userId : z.cuid()
});

export type createReportType = z.infer<typeof createReportSchema>;

export const reportIdSchema = z.cuid({ message: "Invalid CUID" });

export type reportIdType = z.infer<typeof reportIdSchema>;
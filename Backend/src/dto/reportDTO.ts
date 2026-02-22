export type reportResponse = {
    id: string;
    description: string;
    type: string;
    status: "open" | "in_progress" | "resolved" | "closed";
    latitude: number;
    longtitude: number;
    beforeImage: string | null;
    afterImage: string | null;
    streetName?: string | null;
    streetNumber?: string | null;
    city?: string | null;
    region?: string | null;
    isoCountryCode?: string | null;
    postalCode?: string | null;
    formattedAddress?: string | null;
    accuracy?: number | null;
    remarks: string[];
    createdAt: Date;
    resolvedAt?: Date | null;
    userId: string;
}

export type reportResponseDTO<T> = {
    success : boolean;
    statusCode :number;
    message : string;
    data : T;
    page?: number;
    limit?: number;
    totalRecords?: number;
    totalPages?: number;
};
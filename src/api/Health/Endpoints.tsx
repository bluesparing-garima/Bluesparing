
export interface FilterTypes {
    [key: string]: string | number;
}

export const AddHealthEp = () => {
    return "/api/health/add"
}

export const GHealthEp = (
    limit?: number,
    page?: number,
    sortedBy?: string,
    q?: FilterTypes,
    order?: string
): string => {
    let ep = "/api/health/health-policies";

    const params: string[] = [];

    params.push(`limit=${limit ?? 10}`);
    params.push(`page=${page ?? 1}`);
    params.push(`sortBy=${sortedBy ?? "createdBy"}`);
    params.push(`order=${order ?? "desc"}`);

    if (q) {
        for (const key in q) {
            if (q[key]) {
                params.push(`${encodeURIComponent(key)}=${encodeURIComponent(q[key])}`);
            }
        }
    }

    ep += `?${params.join("&")}`;
    return ep;
};

export const searchHealthEp = (q:string)=>{
    return `/api/health/search?query=${q}`
}

export const filteredEp = (startDate:string,endDate:string)=>{
    return `/api/health/filtered?issueDate=${startDate}&endDate=${endDate}`
}
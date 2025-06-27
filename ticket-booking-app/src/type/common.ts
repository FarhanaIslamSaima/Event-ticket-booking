export interface DecodedData {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
}
export type Tmeta = {
    page: number;
    limit: number;
    total: number;
}
export type ResponseSuccessType = {
    data: any;
    meta?: Tmeta;
}
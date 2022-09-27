
import eCommerceClient, { eCommerceApiResponse } from "./eCommerceClient";

const baseURL = "/api/order"

export const apiGetUserOrders= async (id: number): Promise<eCommerceApiResponse> => {
    const response = await eCommerceClient.get<any>(
        `${baseURL}/${id}`
    );
    return { status: response.status, payload: response.data };
}

export const apiPurchase = async (OrderRequest: any): Promise<eCommerceApiResponse> => {
    const response = await eCommerceClient.post<any>(
        `${baseURL}`,
        OrderRequest
    );
    return { status: response.status, payload: response.data };
}
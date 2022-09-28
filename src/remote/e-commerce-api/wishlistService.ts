import eCommerceClient, { eCommerceApiResponse } from "./eCommerceClient";

const baseURL = "/api/wishlist"

// Get all Products from Wishlist
export const apiGetAllWishlistProducts =async (userId: number): Promise<eCommerceApiResponse> => {
    const response = await eCommerceClient.get<any>(
        `${baseURL}/${userId}`
    );
    return { status: response.status, payload: response.data };
}


// Add a Wishlist Product
export const apiAddWishlistProduct =async (userId: number, productId: number): Promise<eCommerceApiResponse> => {
    const response = await eCommerceClient.post<any>(
        `${baseURL}/addProduct?userId=${userId}&productId=${productId}`
    );
    return { status: response.status, payload: response.data };    
}

// Delete a Wishlist Product
export const apiDeleteWishlistProduct =async (userId: number, productId: number): Promise<eCommerceApiResponse> => {
    const response = await eCommerceClient.delete<any>(
        `${baseURL}/delete?userId=${userId}&productId=${productId}`
    );
    return { status: response.status, payload: response.data };
}

// Add a Wishlist Record, intended to be executed when new user is registered
export const apiAddWishlistRecord =async (userId: number): Promise<eCommerceApiResponse> => {
    const response = await eCommerceClient.post<any>(
        `${baseURL}/addWishlist/${userId}`
    );
    return { status: response.status, payload: response.data };
}
import { rejects } from "assert";
import { resolve } from "path";
import Product from "../../models/Product";
import eCommerceClient, { eCommerceApiResponse } from "./eCommerceClient";

const baseURL = "/api/wishlist"

// Get all Products from Wishlist
export const apiGetAllWishlistProducts =async (userId: Number): Promise<eCommerceApiResponse> => {
    let response;

    try {
        response = await eCommerceClient.get<any>(
            `${baseURL}/${userId}`
        );
    } catch (error) {
        response = await eCommerceClient.get<any>(
            `${baseURL}/1`
        );  
    }

    return { status: response.status, payload: response.data };    
}


// Add a Wishlist Product
export const apiAddWishlistProduct =async (userId: Number, productId: Number): Promise<eCommerceApiResponse> => {
    const response = await eCommerceClient.post<any>(
        `${baseURL}/addProduct?user_id=${userId}&product_id=${productId}`
    );
    return { status: response.status, payload: response.data };    
}

// Delete a Wishlist Product
export const apiDeleteWishlistProduct =async (userId: Number, productId: Number): Promise<eCommerceApiResponse> => {
    const response = await eCommerceClient.delete<any>(
        `${baseURL}/delete?user_id=${userId}&product_id=${productId}`
    );
    return { status: response.status, payload: response.data };
}

// Add a Wishlist Record, intended to be executed when new user is registered
export const apiAddWishlistRecord =async (userId: Number): Promise<eCommerceApiResponse> => {
    const response = await eCommerceClient.post<any>(
        `${baseURL}/addWishlist/${userId}`
    );
    return { status: response.status, payload: response.data };
}
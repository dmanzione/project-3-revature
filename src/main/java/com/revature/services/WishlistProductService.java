package com.revature.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.revature.models.Product;
import com.revature.models.Wishlist;
import com.revature.models.WishlistProduct;
import com.revature.repositories.WishlistProductRepository;

@Service
public class WishlistProductService {

    private final WishlistProductRepository wishlist_productsRepository;

    public WishlistProductService(WishlistProductRepository wishlist_productsRepository) {
        this.wishlist_productsRepository = wishlist_productsRepository;
    }

    public List<WishlistProduct> findAll() {
        return wishlist_productsRepository.findAll();
    }

    public Optional<WishlistProduct> findById(int id) {
        return wishlist_productsRepository.findById(id);
    }

    public Optional<WishlistProduct> findByWishlistAndProduct(Wishlist wishlist, Product product) {
        return wishlist_productsRepository.findByWishlistAndProduct(wishlist, product);
    }

    public WishlistProduct save(WishlistProduct wishlist) {
        return wishlist_productsRepository.save(wishlist);
    }
    
    public List<WishlistProduct> saveAll(List<WishlistProduct> wishlistList) {
    	return wishlist_productsRepository.saveAll(wishlistList);
    }

    public void delete(int id) {
        wishlist_productsRepository.deleteById(id);
    }
    
}

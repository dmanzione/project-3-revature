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

    private final WishlistProductRepository wishlistProductsRepository;

    public WishlistProductService(WishlistProductRepository wishlistProductsRepository) {
        this.wishlistProductsRepository = wishlistProductsRepository;
    }

    public List<WishlistProduct> findAll() {
        return wishlistProductsRepository.findAll();
    }

    public Optional<WishlistProduct> findById(int id) {
        return wishlistProductsRepository.findById(id);
    }

    public Optional<WishlistProduct> findByWishlistAndProduct(Wishlist wishlist, Product product) {
        return wishlistProductsRepository.findByWishlistAndProduct(wishlist, product);
    }

    public WishlistProduct save(WishlistProduct wishlist) {
        return wishlistProductsRepository.save(wishlist);
    }
    
    public List<WishlistProduct> saveAll(List<WishlistProduct> wishlistList) {
    	return wishlistProductsRepository.saveAll(wishlistList);
    }

    public void delete(int id) {
        wishlistProductsRepository.deleteById(id);
    }
    
}

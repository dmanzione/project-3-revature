package com.revature.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.revature.models.Wishlist_products;
import com.revature.repositories.Wishlist_productsRepository;

@Service
public class Wishlist_productsService {

    private final Wishlist_productsRepository wishlist_productsRepository;

    public Wishlist_productsService(Wishlist_productsRepository wishlist_productsRepository) {
        this.wishlist_productsRepository = wishlist_productsRepository;
    }

    public List<Wishlist_products> findAll() {
        return wishlist_productsRepository.findAll();
    }

    public Optional<Wishlist_products> findById(int id) {
        return wishlist_productsRepository.findById(id);
    }

    public Wishlist_products save(Wishlist_products wishlist) {
        return wishlist_productsRepository.save(wishlist);
    }
    
    public List<Wishlist_products> saveAll(List<Wishlist_products> wishlistList) {
    	return wishlist_productsRepository.saveAll(wishlistList);
    }

    public void delete(int id) {
        wishlist_productsRepository.deleteById(id);
    }
    
}

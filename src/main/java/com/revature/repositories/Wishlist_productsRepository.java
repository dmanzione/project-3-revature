package com.revature.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.revature.models.Wishlist_products;

public interface Wishlist_productsRepository extends JpaRepository<Wishlist_products, Integer> {
    
}

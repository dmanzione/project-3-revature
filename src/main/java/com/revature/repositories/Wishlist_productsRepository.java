package com.revature.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.revature.models.Product;
import com.revature.models.Wishlist;
import com.revature.models.WishlistProduct;

public interface Wishlist_productsRepository extends JpaRepository<WishlistProduct, Integer> {
    List<WishlistProduct> findByWishlist(Wishlist wishlist);
    Optional<WishlistProduct> findByWishlistAndProduct(Wishlist wishlist, Product product);
}

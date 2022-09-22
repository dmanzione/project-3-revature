package com.revature.controllers;


import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.revature.annotations.Authorized;
import com.revature.models.Product;
import com.revature.models.Wishlist_products;
import com.revature.models.Wishlists;
import com.revature.services.Wishlist_productsService;
import com.revature.services.WishlistsService;


@RestController
@RequestMapping("/api/wishlist")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:3000"}, allowCredentials = "true")
public class WishlistController {
    
    private final WishlistsService wishlistService;
    private final Wishlist_productsService wishlist_productsService;

    public WishlistController(WishlistsService wishlistService, Wishlist_productsService wishlist_productsService){
        this.wishlistService = wishlistService;
        this.wishlist_productsService = wishlist_productsService;
    }

    @Authorized
    @GetMapping("/{user_id}")
    public ResponseEntity<List<Product>> getWishlistInventoryByUserId(@PathVariable int user_id) {
        return ResponseEntity.ok(wishlistService.findAllFilterById(user_id));
    }

    @Authorized
    @PostMapping("/addProduct")
    public ResponseEntity<Wishlist_products> addWishlistProduct(@RequestParam("wishlist_id") int wishlist_id, @RequestParam("product_id") int product_id) {
        return ResponseEntity.status(HttpStatus.CREATED).body(wishlist_productsService.save(new Wishlist_products(0, wishlist_id, product_id)));
    }

    @Authorized
    @PostMapping("/addWishlist/{user_id}")
    public ResponseEntity<Wishlists> addWishlistRecord(@PathVariable int user_id) {
        return ResponseEntity.status(HttpStatus.CREATED).body(wishlistService.save(new Wishlists(0, user_id)));
    }

    @Authorized
    @DeleteMapping("/delete")
    public ResponseEntity<Wishlist_products> deleteWishlistProduct(@RequestParam("wishlist_id") int wishlist_id, @RequestParam("product_id") int product_id) {
        List<Wishlist_products> wishlist_productsList = wishlist_productsService.findAll();
        int wishlist_products_id = -1;
        for (Wishlist_products wishlist_products : wishlist_productsList) {
            if(wishlist_products.getProduct_id() == product_id && wishlist_products.getWishlist_id() == wishlist_id){
                wishlist_products_id = wishlist_products.getId();
                break;
            }
        }
        Optional<Wishlist_products> optional = wishlist_productsService.findById(wishlist_products_id);
        wishlist_productsService.delete(wishlist_products_id);
        
        return ResponseEntity.ok(optional.get());
    }
}

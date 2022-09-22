package com.revature.controllers;


import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.revature.annotations.Authorized;
import com.revature.models.Product;
import com.revature.models.WishlistProduct;
import com.revature.models.Wishlist;
import com.revature.services.ProductService;
import com.revature.services.UserService;
import com.revature.services.Wishlist_productsService;
import com.revature.services.WishlistsService;


@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {
    
    private final WishlistsService wishlistService;
    private final Wishlist_productsService wishlist_productsService;
    private final UserService userService;
    private final ProductService productService;

    public WishlistController(WishlistsService wishlistService, Wishlist_productsService wishlist_productsService, UserService userService, ProductService productService){
        this.wishlistService = wishlistService;
        this.wishlist_productsService = wishlist_productsService;
        this.userService = userService;
        this.productService = productService;
    }

    @Authorized
    @GetMapping("/{user_id}")
    public ResponseEntity<List<Product>> getWishlistInventoryByUserId(@PathVariable int user_id) {
        return ResponseEntity.ok(wishlistService.getAllWishlistProducts(user_id));
    }

    @Authorized
    @PostMapping("/addProduct")
    public ResponseEntity<WishlistProduct> addWishlistProduct(@RequestParam("wishlist_id") int wishlist_id, @RequestParam("product_id") int product_id) {
        return ResponseEntity.status(HttpStatus.CREATED).body(wishlist_productsService.save(
            new WishlistProduct(
                0, 
                wishlistService.findById(wishlist_id).get(), 
                productService.findById(product_id).get())));
    }

    @Authorized
    @PostMapping("/addWishlist/{user_id}")
    public ResponseEntity<Wishlist> addWishlistRecord(@PathVariable int user_id) {
        return ResponseEntity.status(HttpStatus.CREATED).body(wishlistService.save(
            new Wishlist(
                0, 
                userService.findById(user_id).get())));
    }

    @Authorized
    @DeleteMapping("/delete")
    public ResponseEntity<WishlistProduct> deleteWishlistProduct(@RequestParam("wishlist_id") int wishlist_id, @RequestParam("product_id") int product_id) {
        
        Wishlist wishlist = wishlistService.findById(wishlist_id).get();
        Product product = productService.findById(product_id).get();
        Optional<WishlistProduct> optional = wishlist_productsService.findByWishlistAndProduct(wishlist, product);

        wishlist_productsService.delete(optional.get().getId());
        
        return ResponseEntity.ok(optional.get());
    }
}

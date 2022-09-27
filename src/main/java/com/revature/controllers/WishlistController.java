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

import com.revature.models.Product;
import com.revature.models.WishlistProduct;
import com.revature.models.Wishlist;
import com.revature.services.ProductService;
import com.revature.services.UserService;
import com.revature.services.WishlistProductService;
import com.revature.services.WishlistService;


@RestController
@RequestMapping("/api/wishlist")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:3000"}, allowCredentials = "true")
public class WishlistController {
    
    private final WishlistService wishlistService;
    private final WishlistProductService wishlist_productsService;
    private final UserService userService;
    private final ProductService productService;

    public WishlistController(WishlistService wishlistService, WishlistProductService wishlist_productsService, UserService userService, ProductService productService){
        this.wishlistService = wishlistService;
        this.wishlist_productsService = wishlist_productsService;
        this.userService = userService;
        this.productService = productService;
    }

    @GetMapping("/{user_id}")
    public ResponseEntity<List<Product>> getWishlistInventoryByUserId(@PathVariable int user_id) {
        return ResponseEntity.ok(wishlistService.getAllWishlistProducts(user_id));
    }

    @PostMapping("/addProduct")
    public ResponseEntity<WishlistProduct> addWishlistProduct(@RequestParam("user_id") int user_id, @RequestParam("product_id") int product_id) {
        Optional<Wishlist> wishlist = wishlistService.findByUserId(user_id);
        return ResponseEntity.status(HttpStatus.CREATED).body(wishlist_productsService.save(
            new WishlistProduct(
                0, 
                wishlistService.findById(wishlist.get().getId()).get(), 
                productService.findById(product_id).get())));
    }

    @PostMapping("/addWishlist/{user_id}")
    public ResponseEntity<Wishlist> addWishlistRecord(@PathVariable int user_id) {
        return ResponseEntity.status(HttpStatus.CREATED).body(wishlistService.save(
            new Wishlist(
                0, 
                userService.findById(user_id).get())));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<WishlistProduct> deleteWishlistProduct(@RequestParam("user_id") int user_id, @RequestParam("product_id") int product_id) {
        
        Optional<Wishlist> wishlist = wishlistService.findByUserId(user_id);
        Product product = productService.findById(product_id).get();
        Optional<WishlistProduct> optional = wishlist_productsService.findByWishlistAndProduct(wishlist.get(), product);

        wishlist_productsService.delete(optional.get().getId());
        
        return ResponseEntity.ok(optional.get());
    }
}

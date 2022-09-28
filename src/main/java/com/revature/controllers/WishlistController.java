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

import com.revature.models.Product;
import com.revature.models.User;
import com.revature.models.WishlistProduct;
import com.revature.models.Wishlist;
import com.revature.services.ProductService;
import com.revature.services.UserService;
import com.revature.services.WishlistProductService;
import com.revature.services.WishlistService;


@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {
    
    private final WishlistService wishlistService;
    private final WishlistProductService wishlistProductsService;
    private final UserService userService;
    private final ProductService productService;

    public WishlistController(WishlistService wishlistService, WishlistProductService wishlistProductsService, UserService userService, ProductService productService){
        this.wishlistService = wishlistService;
        this.wishlistProductsService = wishlistProductsService;
        this.userService = userService;
        this.productService = productService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Product>> getWishlistInventoryByUserId(@PathVariable int userId) {
        return ResponseEntity.ok(wishlistService.getAllWishlistProducts(userId));
    }

    @PostMapping("/addProduct")
    public ResponseEntity<WishlistProduct> addWishlistProduct(@RequestParam("userId") int userId, @RequestParam("productId") int productId) {
        Optional<Wishlist> wishlistUser = wishlistService.findByUserId(userId);

        if(!wishlistUser.isPresent()){
            return ResponseEntity.notFound().build();
        }

        Optional<Wishlist> wishlistRecord = wishlistService.findById(wishlistUser.get().getId());

        if(!wishlistRecord.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Optional<Product> wishlistProduct = productService.findById(productId);

        if(!wishlistProduct.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(wishlistProductsService.save(
            new WishlistProduct(
                0, 
                wishlistRecord.get(),
                wishlistProduct.get())));
    }

    @PostMapping("/addWishlist/{userId}")
    public ResponseEntity<Wishlist> addWishlistRecord(@PathVariable int userId) {

        Optional<User> optional = userService.findById(userId);

        if(!optional.isPresent()){
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(wishlistService.save(
            new Wishlist(
                0, 
                optional.get())));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<WishlistProduct> deleteWishlistProduct(@RequestParam("userId") int userId, @RequestParam("productId") int productId) {
        
        Optional<Wishlist> wishlist = wishlistService.findByUserId(userId);

        if(!wishlist.isPresent()){
            return ResponseEntity.notFound().build();
        }

        Optional<Product> product = productService.findById(productId);

        if(!product.isPresent()){
            return ResponseEntity.notFound().build();
        }

        Optional<WishlistProduct> optional = wishlistProductsService.findByWishlistAndProduct(wishlist.get(), product.get());

        if(!optional.isPresent()){
            return ResponseEntity.notFound().build();
        }

        wishlistProductsService.delete(optional.get().getId());
        
        return ResponseEntity.ok(optional.get());
    }
}

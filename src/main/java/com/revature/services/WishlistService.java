package com.revature.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.revature.models.Product;
import com.revature.models.User;
import com.revature.models.WishlistProduct;
import com.revature.models.Wishlist;
import com.revature.repositories.ProductRepository;
import com.revature.repositories.WishlistProductRepository;
import com.revature.repositories.WishlistRepository;

@Service
public class WishlistService {
    
    private final WishlistRepository wishlistRepository;
    private final ProductRepository productRepository;
    private final WishlistProductRepository wishlistProductsRepository;
    private final UserService userService;

    public WishlistService(WishlistRepository wishlistRepository, ProductRepository productRepository, WishlistProductRepository wishlistProductsRepository, UserService userService) {
        this.productRepository = productRepository;
        this.wishlistRepository = wishlistRepository;
        this.wishlistProductsRepository = wishlistProductsRepository;
        this.userService = userService;
    }

    public List<Wishlist> findAll() {
        return wishlistRepository.findAll();
    }

    public Optional<Wishlist> findByUserId(int userId) {

        Optional<User> optionalUser = userService.findById(userId);

        if(!optionalUser.isPresent()){
            return findByUserId(1);
        }

        return wishlistRepository.findByUser(optionalUser.get());
    }

    /**
     * Returns JSON list of Products based on given user id.
     * If user does not exist, returns an empty array
     * @param user_id
     * @return
     */
    public List<Product> getAllWishlistProducts(int userId) {

        Optional<User> optionalUser = userService.findById(userId);

        if(!optionalUser.isPresent()){
            return getAllWishlistProducts(1);
        }
        
        Optional<Wishlist> wishlist = wishlistRepository.findByUser(optionalUser.get());

        if(!wishlist.isPresent()) {
            return new ArrayList<>();
        }

        List<WishlistProduct> wishlistProducts = wishlistProductsRepository.findByWishlist(wishlist.get());
        
        List<Product> resultList = new ArrayList<>();
        for (WishlistProduct wishlistProduct : wishlistProducts) {
            resultList.add(productRepository.getById(wishlistProduct.getProduct().getId()));
        }
        
        return resultList;
    }

    public Optional<Wishlist> findById(int id) {
        return wishlistRepository.findById(id);
    }

    public Wishlist save(Wishlist wishlist) {
        return wishlistRepository.save(wishlist);
    }
    
    public List<Wishlist> saveAll(List<Wishlist> wishlistList) {
    	return wishlistRepository.saveAll(wishlistList);
    }

    public void delete(int id) {
        wishlistRepository.deleteById(id);
    }
}

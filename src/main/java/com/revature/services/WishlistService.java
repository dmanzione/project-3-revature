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
    private final WishlistProductRepository wishlist_productsRepository;
    private final UserService userService;

    public WishlistService(WishlistRepository wishlistRepository, ProductRepository productRepository, WishlistProductRepository wishlist_productsRepository, UserService userService) {
        this.productRepository = productRepository;
        this.wishlistRepository = wishlistRepository;
        this.wishlist_productsRepository = wishlist_productsRepository;
        this.userService = userService;
    }

    public List<Wishlist> findAll() {
        return wishlistRepository.findAll();
    }

    public Optional<Wishlist> findByUserId(int user_id) {
        return wishlistRepository.findByUser(userService.findById(user_id).get());
    }

    /**
     * Returns JSON list of Products based on given user id.
     * If user does not exist, returns an empty array
     * @param user_id
     * @return
     */
    public List<Product> getAllWishlistProducts(int user_id) {
        
        Optional<Wishlist> wishlist = wishlistRepository.findByUser(userService.findById(user_id).get());

        if(!wishlist.isPresent()) {
            List<Product> emptyList = new ArrayList<Product>();
            return emptyList;
        }

        List<WishlistProduct> wishlistProducts = wishlist_productsRepository.findByWishlist(wishlist.get());
        
        List<Product> resultList = new ArrayList<Product>();
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

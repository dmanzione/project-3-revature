package com.revature.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.revature.models.Product;
import com.revature.models.Wishlist_products;
import com.revature.models.Wishlists;
import com.revature.repositories.ProductRepository;
import com.revature.repositories.Wishlist_productsRepository;
import com.revature.repositories.WishlistsRepository;

@Service
public class WishlistsService {
    
    private final WishlistsRepository wishlistRepository;
    private final ProductRepository productRepository;
    private final Wishlist_productsRepository wishlist_productsRepository;    

    public WishlistsService(WishlistsRepository wishlistRepository, ProductRepository productRepository, Wishlist_productsRepository wishlist_productsRepository) {
        this.productRepository = productRepository;
        this.wishlistRepository = wishlistRepository;
        this.wishlist_productsRepository = wishlist_productsRepository;
    }

    public List<Wishlists> findAll() {
        return wishlistRepository.findAll();
    }

    /**
     * Returns JSON list of Products based on given user id.
     * If user does not exist, returns an empty array
     * @param user_id
     * @return
     */
    public List<Product> findAllFilterById(int user_id) {
        
        // with user_id given, get Wishlist ID
        List<Wishlists> listWishlists = wishlistRepository.findAll();
        int wishlist_id = -1;
        for (Wishlists wishlistRow : listWishlists) {
            if(wishlistRow.getUser_id() == user_id){
                wishlist_id = wishlistRow.getId();
                break;
            }            
        }

        // with Wishlist ID, get <List>product_id from wishlist_products
        List<Wishlist_products> listWishlist_Products = wishlist_productsRepository.findAll();
        List<Integer> productIdList = new ArrayList<Integer>();
        for (Wishlist_products wishlist_ProductsRow : listWishlist_Products) {
            if(wishlist_ProductsRow.getWishlist_id() == wishlist_id){
                productIdList.add(wishlist_ProductsRow.getProduct_id());
            }            
        }

        // with <List>product_id, get <List>product
        List<Product> productList = productRepository.findAll();
        List<Product> resultList = new ArrayList<Product>();
        for (Product product : productList) {
            if(productIdList.contains(product.getId())){
                resultList.add(product);
            }   
        }

        // return result List<product>
        return resultList;
    }

    public Optional<Wishlists> findById(int id) {
        return wishlistRepository.findById(id);
    }

    public Wishlists save(Wishlists wishlist) {
        return wishlistRepository.save(wishlist);
    }
    
    public List<Wishlists> saveAll(List<Wishlists> wishlistList) {
    	return wishlistRepository.saveAll(wishlistList);
    }

    public void delete(int id) {
        wishlistRepository.deleteById(id);
    }
}

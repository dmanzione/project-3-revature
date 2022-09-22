package com.revature.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.revature.models.User;
import com.revature.models.Wishlist;

public interface WishlistsRepository extends JpaRepository<Wishlist, Integer>{
    Optional<Wishlist> findByUser(User user);
    
}

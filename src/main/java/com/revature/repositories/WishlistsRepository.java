package com.revature.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.revature.models.Wishlists;

public interface WishlistsRepository extends JpaRepository<Wishlists, Integer>{
    
}

package com.revature.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Wishlist_products {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int wishlist_id;
    private int product_id;
    
}

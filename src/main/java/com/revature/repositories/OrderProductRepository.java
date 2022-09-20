package com.revature.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.revature.models.OrderProduct;

public interface OrderProductRepository extends JpaRepository<OrderProduct, Integer> {

}

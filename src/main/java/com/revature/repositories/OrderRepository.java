package com.revature.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.revature.models.Order;

public interface OrderRepository extends JpaRepository<Order, Integer> {

}

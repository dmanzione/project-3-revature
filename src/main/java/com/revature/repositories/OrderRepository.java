package com.revature.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.revature.models.Order;

public interface OrderRepository extends JpaRepository<Order, Integer> {
	@Query("select orders.id, orders.total, orders.user_id from orders where orders.user_id=?1")
	Optional<Order> findOrderByUserId(int id);
}

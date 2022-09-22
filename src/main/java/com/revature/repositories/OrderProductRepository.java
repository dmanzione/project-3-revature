package com.revature.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.revature.models.OrderProduct;

public interface OrderProductRepository extends JpaRepository<OrderProduct, Integer> {
	public List<OrderProduct> findAllByOrder_Id(int orderId);
}

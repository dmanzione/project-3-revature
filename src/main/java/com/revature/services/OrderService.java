package com.revature.services;


import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.revature.models.Order;
import com.revature.repositories.OrderRepository;

@Service
public class OrderService {

	private final OrderRepository orderRepository;

	public OrderService(OrderRepository orderRepository) {
		this.orderRepository = orderRepository;
	}
	
	public List<Order> findAll(){
		return orderRepository.findAll();
	}
	
	public Optional<Order> findById(int id){
		return orderRepository.findById(id);
	}
	
	public Optional<List<Order>> findByUser(int userId)
	{
		return Optional.of(orderRepository.findAllByUser_Id(userId));
	}
	
	public Order save(Order order) {
		return orderRepository.save(order);
	}
	
	public List<Order> saveAll(List<Order> orderList){
		return orderRepository.saveAll(orderList);
	}
	
}

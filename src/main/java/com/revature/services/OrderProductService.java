package com.revature.services;

import java.util.List;
import java.util.Optional;

import com.revature.models.OrderProduct;
import com.revature.repositories.OrderProductRepository;


public class OrderProductService {

	private final OrderProductRepository orderProductRepository;

	public OrderProductService(OrderProductRepository orderProductRepository) {
		this.orderProductRepository = orderProductRepository;
	}

	public List<OrderProduct> findAll(){
		return orderProductRepository.findAll();
	}
	
	public Optional<OrderProduct> findById(int id){
		return orderProductRepository.findById(id);
	}
	
	public OrderProduct save(OrderProduct orderProduct) {
		return orderProductRepository.save(orderProduct);
	}
	
	public List<OrderProduct> saveAll(List<OrderProduct> orderProductList){
		return orderProductRepository.saveAll(orderProductList);
	}
	
	public void delete(int id) {
		orderProductRepository.deleteById(id);
	}
}

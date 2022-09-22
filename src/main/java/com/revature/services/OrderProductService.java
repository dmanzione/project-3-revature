package com.revature.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.revature.models.OrderProduct;
import com.revature.repositories.OrderProductRepository;

@Service
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
	
	public List<OrderProduct> findAllByOrder(int orderId){
		return orderProductRepository.findAllByOrder_Id(orderId);
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

package com.revature.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.revature.annotations.Authorized;
import com.revature.models.Order;
import com.revature.services.OrderService;

@RestController
@RequestMapping("api/order")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:3000"}, allowCredentials = "true")
public class OrderController {
	
	private final OrderService orderService;

	public OrderController(OrderService orderService) {
		this.orderService = orderService;
	}
	
	@Authorized
	@GetMapping
	public ResponseEntity<List<Order>> getOrders() {
		return ResponseEntity.ok(orderService.findAll());
	}
	
	@Authorized
	@GetMapping("/{id}")
	public ResponseEntity<Order> getOrderById(@PathVariable("id")int id){
		Optional<Order> optional = orderService.findById(id);
		
		if(!optional.isPresent()) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(optional.get());
	}
	
}

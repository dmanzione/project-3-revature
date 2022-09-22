package com.revature.controllers;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.revature.annotations.Authorized;
import com.revature.dtos.OrderRequest;
import com.revature.models.Order;
import com.revature.models.OrderProduct;
import com.revature.services.OrderService;
import com.revature.services.OrderProductService;

@RestController
@RequestMapping("api/order")
public class OrderController {
	
	private final OrderService orderService;
	private final OrderProductService orderProductService;

	
	
	public OrderController(OrderService orderService, OrderProductService orderProductService) {
		this.orderService = orderService;
		this.orderProductService = orderProductService;
	}

	@Authorized
	@GetMapping
	public ResponseEntity<List<Order>> getOrders() {
		return ResponseEntity.ok(orderService.findAll());
	}
	
	@Authorized
	@GetMapping("/{user_id}")
	public ResponseEntity<List<OrderRequest>> getOrderByUserId(@PathVariable("user_id")int user_id){
		Optional<List<Order>> optional = orderService.findByUser(user_id);
		
		if(!optional.isPresent()) {
			return ResponseEntity.notFound().build();
		}
		LinkedList<OrderRequest> orderRequests = new LinkedList<>();
		List<Order> orders = optional.get();
		for(Order o: orders)
		{
			List<OrderProduct> orderProducts = orderProductService.findAllByOrder(o.getId());
			orderRequests.add(new OrderRequest(o, orderProducts));
		}
		
		return ResponseEntity.ok(orderRequests);
	}
	
	@Authorized
	@PostMapping
	public ResponseEntity <OrderRequest> createOrder(@RequestBody OrderRequest newOrder)
	{
		Order order = orderService.save(newOrder.getOrder());
		for(int i = 0; i < newOrder.getOrderProducts().size(); i++)
		{
			newOrder.getOrderProducts().get(i).setOrder(order);
		}
		List <OrderProduct> orderProductList = orderProductService.saveAll(newOrder.getOrderProducts());
		
		OrderRequest orderRequest = new OrderRequest(order, orderProductList);
		return ResponseEntity.ok(orderRequest);
	}
	
}

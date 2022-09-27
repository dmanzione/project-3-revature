package com.revature.controller;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import com.revature.controllers.OrderController;
import com.revature.dtos.OrderRequest;
import com.revature.models.Order;
import com.revature.models.OrderProduct;
import com.revature.services.OrderProductService;
import com.revature.services.OrderService;

@ExtendWith(MockitoExtension.class)
class OrderControllerTest {

	@Mock
	OrderService mockOrderService;
	
	@Mock
	OrderProductService mockOrderProductService;
	
	@InjectMocks
	OrderController orderController;
	
	Order order1;
	Order order2;
	Order order3;
	List<Order> orderList1;
	List<Order> orderList2;
	OrderProduct op1;
	OrderProduct op2;
	List<OrderProduct> opList;
	OrderRequest or;
	List<OrderRequest> orList;
	
	@BeforeEach
	void init() {
		order1 = new Order(1, null, 10.0);
		order2 = new Order(2, null, 20.0);
		order3 = new Order(3, null, 30.0);
		orderList1 = new ArrayList<>(Arrays.asList(order1, order2, order3));
		orderList2 = new ArrayList<>(Arrays.asList(order1));
		op1 = new OrderProduct(1,order1,null,2,10);
		op2 = new OrderProduct(2,order1,null,2,10);
		opList = new ArrayList<>(Arrays.asList(op1, op2));
		or = new OrderRequest(order1, opList);
		orList = new ArrayList<>(Arrays.asList(or));
		//orList.add(or);
	}
	
	
	@Test
	void getOrders_test_pass() {
		ResponseEntity<List<Order>> expected = ResponseEntity.ok(orderList1);
		when(mockOrderService.findAll()).thenReturn(orderList1);
		ResponseEntity<List<Order>> actual = orderController.getOrders();
		Assertions.assertEquals(expected, actual);
	}
	
	@Test
	void getOrderByUserId_test_pass() {
		when(mockOrderService.findByUser(1)).thenReturn(Optional.ofNullable(orderList2));
		when(mockOrderProductService.findAllByOrder(order1.getId())).thenReturn(opList);
		ResponseEntity<List<OrderRequest>> actual = orderController.getOrderByUserId(1);
		Assertions.assertEquals(ResponseEntity.ok(orList), actual);
	}
	
	@Test
	void getOrderByUserId_test_fail() {
		when(mockOrderService.findByUser(1)).thenReturn(Optional.ofNullable(null));
		ResponseEntity<List<OrderRequest>> expected = ResponseEntity.notFound().build();
		ResponseEntity<List<OrderRequest>> actual = orderController.getOrderByUserId(1);
		Assertions.assertEquals(expected, actual);
		
	}
	
	@Test
	void createOrder_test_pass() {
		
		when(mockOrderService.save(order1)).thenReturn(order1);
		when(mockOrderProductService.saveAll(opList)).thenReturn(opList);
		ResponseEntity<OrderRequest> actual = orderController.createOrder(or);
		Assertions.assertEquals(ResponseEntity.ok(or), actual);
	}

}

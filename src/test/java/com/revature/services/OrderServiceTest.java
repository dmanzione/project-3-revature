package com.revature.services;

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

import com.revature.models.Order;
import com.revature.repositories.OrderRepository;

@ExtendWith(MockitoExtension.class)
class OrderServiceTest {

	@Mock
	OrderRepository mockOrderRepository;
	
	@InjectMocks
	OrderService orderService;
	
	Order order1;
	Order order2;
	Order order3;
	List<Order> orderList1;
	List<Order> orderList2;
	
	@BeforeEach
	void init() {
		order1 = new Order(1, null, 10.0);
		order2 = new Order(2, null, 20.0);
		order3 = new Order(3, null, 30.0);
		orderList1 = new ArrayList<>(Arrays.asList(order1, order2, order3));
		orderList2 = new ArrayList<>(Arrays.asList(order2, order3));
	}
	
	@Test
	void findAll_test_pass() {
		when(mockOrderRepository.findAll()).thenReturn(orderList1);
		List<Order> actualList = orderService.findAll();
		Assertions.assertEquals(actualList, orderList1);
	}
	
	@Test
	void findById_test_pass() {
		Optional<Order> oOrder1 = Optional.ofNullable(order1);
		when(mockOrderRepository.findById(1)).thenReturn(Optional.ofNullable(order1));
		Optional<Order> actual = orderService.findById(1);
		Assertions.assertEquals(actual, oOrder1);
	}
	
	@Test
	void save_test_pass() {
		when(mockOrderRepository.save(order1)).thenReturn(order1);
		Order actual = orderService.save(order1);
		Assertions.assertEquals(actual, order1);
	}
	
	@Test
	void saveAll_test_pass() {
		when(mockOrderRepository.saveAll(orderList1)).thenReturn(orderList1);
		List<Order> actualList = orderService.saveAll(orderList1);
		Assertions.assertEquals(actualList, orderList1);
	}

}

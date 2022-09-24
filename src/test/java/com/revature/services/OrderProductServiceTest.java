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
import com.revature.models.OrderProduct;
import com.revature.repositories.OrderProductRepository;

@ExtendWith(MockitoExtension.class)
class OrderProductServiceTest {
	
	@Mock
	OrderProductRepository orderProductRepository;
	
	@InjectMocks
	OrderProductService orderProductService;
	
	OrderProduct op1;
	OrderProduct op2;
	List<OrderProduct> opList;

	@BeforeEach
	void init() {
		Order order1 = new Order(1, null, 10.0);
		op1 = new OrderProduct(1,order1,null,2,10);
		op2 = new OrderProduct(2,order1,null,2,10);
		opList = new ArrayList<>(Arrays.asList(op1, op2));
	}
	
	@Test
	void findAll_test_pass() {
		when(orderProductRepository.findAll()).thenReturn(opList);
		
		List<OrderProduct> actual = orderProductService.findAll();
		
		Assertions.assertEquals(opList, actual);
	}
	
	@Test
	void findById_test_Pass() {
		Optional<OrderProduct> expected = Optional.ofNullable(op1);
		when(orderProductRepository.findById(1)).thenReturn(expected);
		
		Optional<OrderProduct> actual = orderProductService.findById(1);
		
		Assertions.assertEquals(expected, actual);
	}
	
	@Test
	void findAllByOrder_test_pass() {
		when(orderProductRepository.findAllByOrder_Id(1)).thenReturn(opList);
		
		List<OrderProduct> actual = orderProductService.findAllByOrder(1);
		
		Assertions.assertEquals(opList, actual);
	}
	
	@Test
	void save_test_pass() {
		when(orderProductRepository.save(op1)).thenReturn(op1);
		
		OrderProduct actual = orderProductService.save(op1);
		
		Assertions.assertEquals(op1, actual);
	}
	
	@Test
	void saveAll_test_pass(){
		when(orderProductRepository.saveAll(opList)).thenReturn(opList);
		
		List<OrderProduct> actual = orderProductService.saveAll(opList);
		
		Assertions.assertEquals(opList, actual);
	}

}

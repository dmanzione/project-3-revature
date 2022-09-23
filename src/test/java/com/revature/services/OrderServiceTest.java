package com.revature.services;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.revature.repositories.OrderRepository;

@ExtendWith(MockitoExtension.class)
class OrderServiceTest {

	@Mock
	OrderRepository mockOrderRepository;
	
	@BeforeEach
	void init() {
		System.out.println("print");
	}
	
	@Test
	void test() {
		fail("Not yet implemented");
	}

}

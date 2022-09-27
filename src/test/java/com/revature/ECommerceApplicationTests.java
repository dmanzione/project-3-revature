package com.revature;

import static org.junit.jupiter.api.Assertions.fail;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class ECommerceApplicationTests {

	@Test
	void contextLoads() {
		Boolean expected = true;
		Boolean actual = true;
		Assertions.assertEquals(expected, actual);
	}

}
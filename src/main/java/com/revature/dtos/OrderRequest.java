package com.revature.dtos;

import java.util.List;

import com.revature.models.Order;
import com.revature.models.OrderProduct;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequest {
	Order order;
	List<OrderProduct> orderProducts;
	
}

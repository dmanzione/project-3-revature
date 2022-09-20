package com.revature.models;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;


import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "order_products")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class OrderProduct {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name = "order-id")
	private Order order;
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name = "product-id")
	private Product product;	
	private int quanty;
	private double subtotal;
	
	
}

package com.revature;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class ECommerceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ECommerceApplication.class, args);
	}
	
	@Bean
	WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**")
				.allowedOrigins(
					"*" // Temporarily allow all origins for dev
//					"http://bizbazaarbizbazaarappeb-frontend-env.eba-rzd5q64x.us-east-1.elasticbeanstalk.com",
//					"http://localhost:3000"
				)
				.allowedMethods("DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT");
//				.allowCredentials(true);
			}
		};
	}
}

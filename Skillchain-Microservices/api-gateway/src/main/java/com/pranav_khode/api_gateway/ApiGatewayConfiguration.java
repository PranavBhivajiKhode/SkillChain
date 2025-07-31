package com.pranav_khode.api_gateway;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ApiGatewayConfiguration {
	
	@Bean
	public RouteLocator gatewayRouter(RouteLocatorBuilder builder) {
		return builder.routes()
				.route(p -> p.path("/bidding-service/**")
						.uri("lb://bidding-service"))
				.route(p -> p.path("/job-posting-service/**")
						.uri("lb://job-posting-service"))
				.route(p -> p.path("/rating-review-service/**")
						.uri("lb://rating-review-service"))
				.build();
	}
}

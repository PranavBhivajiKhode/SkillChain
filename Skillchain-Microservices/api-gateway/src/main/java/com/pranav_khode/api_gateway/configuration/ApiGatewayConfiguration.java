package com.pranav_khode.api_gateway.configuration;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ApiGatewayConfiguration {

    @Bean
    public RouteLocator gatewayRouter(RouteLocatorBuilder builder) {
        return builder.routes()
                // Direct (static) route to user-service IP (no discovery / LB)
                .route(p -> p.path("/users/**").uri("lb://user-service"))


                // Keep other services on discovery / load-balanced
                .route(p -> p.path("/jobs/**")
                             .uri("lb://job-service"))
                .route(p -> p.path("/bids/**")
                             .uri("lb://bidding-service"))
                .build();
    }
}


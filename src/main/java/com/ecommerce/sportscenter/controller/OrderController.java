package com.ecommerce.sportscenter.controller;

import com.ecommerce.sportscenter.dto.CreateOrderRequest;
import com.ecommerce.sportscenter.dto.OrderDto;
import com.ecommerce.sportscenter.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<OrderDto> createOrder(
            @Valid @RequestBody CreateOrderRequest request,
            Principal principal) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(orderService.createOrder(request, principal.getName()));
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<OrderDto> findById(@PathVariable Integer orderId) {
        return ResponseEntity.ok(orderService.findById(orderId));
    }

    @GetMapping
    public ResponseEntity<List<OrderDto>> findMyOrders(Principal principal) {
        return ResponseEntity.ok(orderService.findForBuyer(principal.getName()));
    }
}

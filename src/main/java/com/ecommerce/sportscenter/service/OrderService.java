package com.ecommerce.sportscenter.service;

import com.ecommerce.sportscenter.dto.CreateOrderRequest;
import com.ecommerce.sportscenter.dto.OrderDto;

import java.util.List;

public interface OrderService {

    OrderDto createOrder(CreateOrderRequest request, String buyerUsername);

    OrderDto findForBuyer(Integer orderId, String buyerUsername);

    List<OrderDto> findForBuyer(String buyerUsername);
}

package com.ecommerce.sportscenter.dto;

import com.ecommerce.sportscenter.entity.OrderStatus;

import java.time.Instant;
import java.util.List;

public record OrderDto(
        Integer id,
        String basketId,
        String buyerUsername,
        ShippingAddressDto shippingAddress,
        Instant orderDate,
        List<OrderItemDto> items,
        Long subTotal,
        Long deliveryFee,
        Long total,
        OrderStatus status
) {
}

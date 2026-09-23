package com.ecommerce.sportscenter.dto;

public record OrderItemDto(
        Integer productId,
        String name,
        String pictureUrl,
        Long price,
        Integer quantity,
        Long lineTotal
) {
}

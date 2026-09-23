package com.ecommerce.sportscenter.dto;

public record BasketItemDto(
        Integer productId,
        String name,
        String description,
        Long price,
        String pictureUrl,
        String brand,
        String type,
        Integer quantity
) {
}

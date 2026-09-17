package com.ecommerce.sportscenter.dto;

public record ProductDto(
        Integer id,
        String name,
        String description,
        Long price,
        String pictureUrl,
        String brand,
        String type
) {
}

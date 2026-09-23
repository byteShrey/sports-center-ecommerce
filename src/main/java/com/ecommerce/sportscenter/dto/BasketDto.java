package com.ecommerce.sportscenter.dto;

import java.util.List;

public record BasketDto(
        String id,
        List<BasketItemDto> items,
        long itemCount,
        long subtotal
) {
}

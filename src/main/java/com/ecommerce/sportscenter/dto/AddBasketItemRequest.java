package com.ecommerce.sportscenter.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record AddBasketItemRequest(
        @NotNull Integer productId,
        @NotNull @Min(1) Integer quantity
) {
}

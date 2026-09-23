package com.ecommerce.sportscenter.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreateOrderRequest(
        @NotBlank String basketId,
        @NotNull @Valid ShippingAddressDto shippingAddress,
        @NotNull @Min(0) Long deliveryFee
) {
}

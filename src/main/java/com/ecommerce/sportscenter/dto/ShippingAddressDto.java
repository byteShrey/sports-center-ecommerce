package com.ecommerce.sportscenter.dto;

import jakarta.validation.constraints.NotBlank;

public record ShippingAddressDto(
        @NotBlank String name,
        @NotBlank String address1,
        String address2,
        @NotBlank String city,
        @NotBlank String state,
        @NotBlank String zipCode,
        @NotBlank String country
) {
}

package com.ecommerce.sportscenter.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BasketItem {

    private Integer productId;
    private String name;
    private String description;
    private Long price;
    private String pictureUrl;
    private String brand;
    private String type;
    private Integer quantity;
}

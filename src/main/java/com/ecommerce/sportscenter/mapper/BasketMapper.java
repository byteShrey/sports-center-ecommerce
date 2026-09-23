package com.ecommerce.sportscenter.mapper;

import com.ecommerce.sportscenter.dto.BasketDto;
import com.ecommerce.sportscenter.dto.BasketItemDto;
import com.ecommerce.sportscenter.entity.Basket;
import com.ecommerce.sportscenter.entity.BasketItem;
import org.springframework.stereotype.Component;

@Component
public class BasketMapper {

    public BasketDto toDto(Basket basket) {
        return new BasketDto(
                basket.getId(),
                basket.getItems().stream().map(this::toDto).toList(),
                basket.itemCount(),
                basket.subtotal()
        );
    }

    public BasketItemDto toDto(BasketItem item) {
        return new BasketItemDto(
                item.getProductId(),
                item.getName(),
                item.getDescription(),
                item.getPrice(),
                item.getPictureUrl(),
                item.getBrand(),
                item.getType(),
                item.getQuantity()
        );
    }
}

package com.ecommerce.sportscenter.mapper;

import com.ecommerce.sportscenter.dto.OrderDto;
import com.ecommerce.sportscenter.dto.OrderItemDto;
import com.ecommerce.sportscenter.dto.ShippingAddressDto;
import com.ecommerce.sportscenter.entity.Order;
import com.ecommerce.sportscenter.entity.OrderItem;
import com.ecommerce.sportscenter.entity.ShippingAddress;
import org.springframework.stereotype.Component;

@Component
public class OrderMapper {

    public OrderDto toDto(Order order) {
        return new OrderDto(
                order.getId(),
                order.getBasketId(),
                order.getBuyerUsername(),
                toDto(order.getShippingAddress()),
                order.getOrderDate(),
                order.getItems().stream().map(this::toDto).toList(),
                order.getSubTotal(),
                order.getDeliveryFee(),
                order.getTotal(),
                order.getStatus()
        );
    }

    public OrderItemDto toDto(OrderItem item) {
        return new OrderItemDto(
                item.getProduct().getProductId(),
                item.getProduct().getName(),
                item.getProduct().getPictureUrl(),
                item.getPrice(),
                item.getQuantity(),
                item.lineTotal()
        );
    }

    public ShippingAddressDto toDto(ShippingAddress address) {
        return new ShippingAddressDto(
                address.getName(),
                address.getAddress1(),
                address.getAddress2(),
                address.getCity(),
                address.getState(),
                address.getZipCode(),
                address.getCountry()
        );
    }

    public ShippingAddress toEntity(ShippingAddressDto dto) {
        return ShippingAddress.builder()
                .name(dto.name())
                .address1(dto.address1())
                .address2(dto.address2())
                .city(dto.city())
                .state(dto.state())
                .zipCode(dto.zipCode())
                .country(dto.country())
                .build();
    }
}

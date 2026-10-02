package com.ecommerce.sportscenter.service;

import com.ecommerce.sportscenter.dto.BasketDto;
import com.ecommerce.sportscenter.dto.BasketItemDto;
import com.ecommerce.sportscenter.dto.CreateOrderRequest;
import com.ecommerce.sportscenter.dto.OrderDto;
import com.ecommerce.sportscenter.dto.ShippingAddressDto;
import com.ecommerce.sportscenter.entity.Order;
import com.ecommerce.sportscenter.exception.ResourceNotFoundException;
import com.ecommerce.sportscenter.mapper.OrderMapper;
import com.ecommerce.sportscenter.repository.OrderRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class OrderServiceImplTest {

    private static final ShippingAddressDto ADDRESS =
            new ShippingAddressDto("Asha Rao", "12 MG Road", null, "Pune", "Maharashtra", "411001", "India");

    @Mock
    private OrderRepository orderRepository;

    @Mock
    private BasketService basketService;

    private OrderServiceImpl orderService;

    @BeforeEach
    void setUp() {
        orderService = new OrderServiceImpl(
                orderRepository, basketService, new OrderMapper(), new DeliveryFeeCalculator(5000, 150));
    }

    @Test
    void createOrderChargesServerSideDeliveryFeeAndClearsBasket() {
        BasketItemDto racket = new BasketItemDto(1, "Yonex Nanoflare", "Racket", 3000L, null, "Yonex", "Rackets", 1);
        when(basketService.getBasket("basket-1")).thenReturn(new BasketDto("basket-1", List.of(racket), 1, 3000));
        when(orderRepository.save(any(Order.class))).thenAnswer(invocation -> invocation.getArgument(0));

        OrderDto order = orderService.createOrder(new CreateOrderRequest("basket-1", ADDRESS), "shopper");

        assertThat(order.buyerUsername()).isEqualTo("shopper");
        assertThat(order.subTotal()).isEqualTo(3000);
        assertThat(order.deliveryFee()).isEqualTo(150);
        assertThat(order.total()).isEqualTo(3150);
        assertThat(order.items()).singleElement()
                .satisfies(item -> assertThat(item.lineTotal()).isEqualTo(3000));
        verify(basketService).deleteBasket("basket-1");
    }

    @Test
    void createOrderRejectsEmptyBasket() {
        when(basketService.getBasket("basket-1")).thenReturn(new BasketDto("basket-1", List.of(), 0, 0));

        assertThatThrownBy(() -> orderService.createOrder(new CreateOrderRequest("basket-1", ADDRESS), "shopper"))
                .isInstanceOf(IllegalArgumentException.class);
        verify(orderRepository, never()).save(any());
    }

    @Test
    void anotherBuyersOrderIsReportedAsNotFound() {
        when(orderRepository.findByIdAndBuyerUsername(7, "intruder")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> orderService.findForBuyer(7, "intruder"))
                .isInstanceOf(ResourceNotFoundException.class);
    }
}

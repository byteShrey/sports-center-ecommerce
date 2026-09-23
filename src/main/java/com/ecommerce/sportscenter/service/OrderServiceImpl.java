package com.ecommerce.sportscenter.service;

import com.ecommerce.sportscenter.dto.BasketDto;
import com.ecommerce.sportscenter.dto.BasketItemDto;
import com.ecommerce.sportscenter.dto.CreateOrderRequest;
import com.ecommerce.sportscenter.dto.OrderDto;
import com.ecommerce.sportscenter.entity.Order;
import com.ecommerce.sportscenter.entity.OrderItem;
import com.ecommerce.sportscenter.entity.OrderStatus;
import com.ecommerce.sportscenter.entity.OrderedProduct;
import com.ecommerce.sportscenter.exception.ResourceNotFoundException;
import com.ecommerce.sportscenter.mapper.OrderMapper;
import com.ecommerce.sportscenter.repository.OrderRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final BasketService basketService;
    private final OrderMapper orderMapper;

    public OrderServiceImpl(
            OrderRepository orderRepository,
            BasketService basketService,
            OrderMapper orderMapper) {
        this.orderRepository = orderRepository;
        this.basketService = basketService;
        this.orderMapper = orderMapper;
    }

    @Override
    @Transactional
    public OrderDto createOrder(CreateOrderRequest request, String buyerUsername) {
        BasketDto basket = basketService.getBasket(request.basketId());
        if (basket.items().isEmpty()) {
            throw new IllegalArgumentException("Cannot place an order with an empty basket");
        }

        Order order = Order.builder()
                .basketId(basket.id())
                .buyerUsername(buyerUsername)
                .shippingAddress(orderMapper.toEntity(request.shippingAddress()))
                .orderDate(Instant.now())
                .subTotal(basket.subtotal())
                .deliveryFee(request.deliveryFee())
                .status(OrderStatus.PENDING)
                .build();

        for (BasketItemDto item : basket.items()) {
            order.addItem(toOrderItem(item));
        }

        Order saved = orderRepository.save(order);
        basketService.deleteBasket(basket.id());
        return orderMapper.toDto(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public OrderDto findById(Integer orderId) {
        return orderRepository.findById(orderId)
                .map(orderMapper::toDto)
                .orElseThrow(() -> ResourceNotFoundException.order(orderId));
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderDto> findForBuyer(String buyerUsername) {
        return orderRepository.findByBuyerUsernameOrderByOrderDateDesc(buyerUsername).stream()
                .map(orderMapper::toDto)
                .toList();
    }

    private OrderItem toOrderItem(BasketItemDto item) {
        return OrderItem.builder()
                .product(OrderedProduct.builder()
                        .productId(item.productId())
                        .name(item.name())
                        .pictureUrl(item.pictureUrl())
                        .build())
                .price(item.price())
                .quantity(item.quantity())
                .build();
    }
}

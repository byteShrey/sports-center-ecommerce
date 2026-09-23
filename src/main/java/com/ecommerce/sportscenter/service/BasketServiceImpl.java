package com.ecommerce.sportscenter.service;

import com.ecommerce.sportscenter.dto.AddBasketItemRequest;
import com.ecommerce.sportscenter.dto.BasketDto;
import com.ecommerce.sportscenter.dto.UpdateBasketItemRequest;
import com.ecommerce.sportscenter.entity.Basket;
import com.ecommerce.sportscenter.entity.BasketItem;
import com.ecommerce.sportscenter.entity.Product;
import com.ecommerce.sportscenter.exception.ResourceNotFoundException;
import com.ecommerce.sportscenter.mapper.BasketMapper;
import com.ecommerce.sportscenter.repository.ProductRepository;
import com.ecommerce.sportscenter.repository.redis.BasketRepository;
import org.springframework.stereotype.Service;

@Service
public class BasketServiceImpl implements BasketService {

    private final BasketRepository basketRepository;
    private final ProductRepository productRepository;
    private final BasketMapper basketMapper;

    public BasketServiceImpl(
            BasketRepository basketRepository,
            ProductRepository productRepository,
            BasketMapper basketMapper) {
        this.basketRepository = basketRepository;
        this.productRepository = productRepository;
        this.basketMapper = basketMapper;
    }

    @Override
    public BasketDto getBasket(String basketId) {
        return basketMapper.toDto(requireBasket(basketId));
    }

    @Override
    public BasketDto createBasket(String basketId) {
        Basket basket = basketRepository.findById(basketId)
                .orElseGet(() -> Basket.builder().id(basketId).build());
        return basketMapper.toDto(basketRepository.save(basket));
    }

    @Override
    public BasketDto addItem(String basketId, AddBasketItemRequest request) {
        Basket basket = basketRepository.findById(basketId)
                .orElseGet(() -> Basket.builder().id(basketId).build());

        Product product = productRepository.findWithAssociationsById(request.productId())
                .orElseThrow(() -> ResourceNotFoundException.product(request.productId()));

        basket.findItem(product.getId()).ifPresentOrElse(
                existing -> existing.setQuantity(existing.getQuantity() + request.quantity()),
                () -> basket.getItems().add(toBasketItem(product, request.quantity()))
        );

        return basketMapper.toDto(basketRepository.save(basket));
    }

    @Override
    public BasketDto updateItemQuantity(String basketId, Integer productId, UpdateBasketItemRequest request) {
        Basket basket = requireBasket(basketId);
        BasketItem item = basket.findItem(productId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Product " + productId + " is not in basket " + basketId));
        item.setQuantity(request.quantity());
        return basketMapper.toDto(basketRepository.save(basket));
    }

    @Override
    public BasketDto removeItem(String basketId, Integer productId) {
        Basket basket = requireBasket(basketId);
        if (!basket.removeItem(productId)) {
            throw new ResourceNotFoundException(
                    "Product " + productId + " is not in basket " + basketId);
        }
        return basketMapper.toDto(basketRepository.save(basket));
    }

    @Override
    public void deleteBasket(String basketId) {
        if (!basketRepository.existsById(basketId)) {
            throw ResourceNotFoundException.basket(basketId);
        }
        basketRepository.deleteById(basketId);
    }

    private Basket requireBasket(String basketId) {
        return basketRepository.findById(basketId)
                .orElseThrow(() -> ResourceNotFoundException.basket(basketId));
    }

    private BasketItem toBasketItem(Product product, Integer quantity) {
        return BasketItem.builder()
                .productId(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .pictureUrl(product.getPictureUrl())
                .brand(product.getBrand().getName())
                .type(product.getType().getName())
                .quantity(quantity)
                .build();
    }
}

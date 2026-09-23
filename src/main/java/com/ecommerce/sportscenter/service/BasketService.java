package com.ecommerce.sportscenter.service;

import com.ecommerce.sportscenter.dto.AddBasketItemRequest;
import com.ecommerce.sportscenter.dto.BasketDto;
import com.ecommerce.sportscenter.dto.UpdateBasketItemRequest;

public interface BasketService {

    BasketDto getBasket(String basketId);

    BasketDto createBasket(String basketId);

    BasketDto addItem(String basketId, AddBasketItemRequest request);

    BasketDto updateItemQuantity(String basketId, Integer productId, UpdateBasketItemRequest request);

    BasketDto removeItem(String basketId, Integer productId);

    void deleteBasket(String basketId);
}

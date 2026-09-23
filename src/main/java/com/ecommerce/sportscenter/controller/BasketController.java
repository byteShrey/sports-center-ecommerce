package com.ecommerce.sportscenter.controller;

import com.ecommerce.sportscenter.dto.AddBasketItemRequest;
import com.ecommerce.sportscenter.dto.BasketDto;
import com.ecommerce.sportscenter.dto.UpdateBasketItemRequest;
import com.ecommerce.sportscenter.service.BasketService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/baskets")
public class BasketController {

    private final BasketService basketService;

    public BasketController(BasketService basketService) {
        this.basketService = basketService;
    }

    @GetMapping("/{basketId}")
    public ResponseEntity<BasketDto> getBasket(@PathVariable String basketId) {
        return ResponseEntity.ok(basketService.getBasket(basketId));
    }

    @PostMapping("/{basketId}")
    public ResponseEntity<BasketDto> createBasket(@PathVariable String basketId) {
        return ResponseEntity.status(HttpStatus.CREATED).body(basketService.createBasket(basketId));
    }

    @PostMapping("/{basketId}/items")
    public ResponseEntity<BasketDto> addItem(
            @PathVariable String basketId,
            @Valid @RequestBody AddBasketItemRequest request) {
        return ResponseEntity.ok(basketService.addItem(basketId, request));
    }

    @PutMapping("/{basketId}/items/{productId}")
    public ResponseEntity<BasketDto> updateItemQuantity(
            @PathVariable String basketId,
            @PathVariable Integer productId,
            @Valid @RequestBody UpdateBasketItemRequest request) {
        return ResponseEntity.ok(basketService.updateItemQuantity(basketId, productId, request));
    }

    @DeleteMapping("/{basketId}/items/{productId}")
    public ResponseEntity<BasketDto> removeItem(
            @PathVariable String basketId,
            @PathVariable Integer productId) {
        return ResponseEntity.ok(basketService.removeItem(basketId, productId));
    }

    @DeleteMapping("/{basketId}")
    public ResponseEntity<Void> deleteBasket(@PathVariable String basketId) {
        basketService.deleteBasket(basketId);
        return ResponseEntity.noContent().build();
    }
}

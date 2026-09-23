package com.ecommerce.sportscenter.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RedisHash("basket")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Basket {

    @Id
    private String id;

    @Builder.Default
    private List<BasketItem> items = new ArrayList<>();

    public Optional<BasketItem> findItem(Integer productId) {
        return items.stream()
                .filter(item -> item.getProductId().equals(productId))
                .findFirst();
    }

    public void upsertItem(BasketItem item) {
        findItem(item.getProductId()).ifPresentOrElse(
                existing -> existing.setQuantity(item.getQuantity()),
                () -> items.add(item)
        );
    }

    public boolean removeItem(Integer productId) {
        return items.removeIf(item -> item.getProductId().equals(productId));
    }

    public long itemCount() {
        return items.stream().mapToLong(BasketItem::getQuantity).sum();
    }

    public long subtotal() {
        return items.stream()
                .mapToLong(item -> item.getPrice() * item.getQuantity())
                .sum();
    }
}

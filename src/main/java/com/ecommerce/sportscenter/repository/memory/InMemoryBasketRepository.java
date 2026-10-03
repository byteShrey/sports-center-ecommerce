package com.ecommerce.sportscenter.repository.memory;

import com.ecommerce.sportscenter.entity.Basket;
import com.ecommerce.sportscenter.repository.redis.BasketRepository;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Keeps baskets in memory so the demo profile can run without a Redis server.
 * Baskets are lost on restart, which is fine for local demos only.
 */
@Repository
@Profile("demo")
public class InMemoryBasketRepository implements BasketRepository {

    private final Map<String, Basket> baskets = new ConcurrentHashMap<>();

    @Override
    public <S extends Basket> S save(S basket) {
        baskets.put(basket.getId(), basket);
        return basket;
    }

    @Override
    public <S extends Basket> Iterable<S> saveAll(Iterable<S> entities) {
        List<S> saved = new ArrayList<>();
        entities.forEach(basket -> saved.add(save(basket)));
        return saved;
    }

    @Override
    public Optional<Basket> findById(String id) {
        return Optional.ofNullable(baskets.get(id));
    }

    @Override
    public boolean existsById(String id) {
        return baskets.containsKey(id);
    }

    @Override
    public Iterable<Basket> findAll() {
        return List.copyOf(baskets.values());
    }

    @Override
    public Iterable<Basket> findAllById(Iterable<String> ids) {
        List<Basket> found = new ArrayList<>();
        ids.forEach(id -> findById(id).ifPresent(found::add));
        return found;
    }

    @Override
    public long count() {
        return baskets.size();
    }

    @Override
    public void deleteById(String id) {
        baskets.remove(id);
    }

    @Override
    public void delete(Basket basket) {
        baskets.remove(basket.getId());
    }

    @Override
    public void deleteAllById(Iterable<? extends String> ids) {
        ids.forEach(baskets::remove);
    }

    @Override
    public void deleteAll(Iterable<? extends Basket> entities) {
        entities.forEach(this::delete);
    }

    @Override
    public void deleteAll() {
        baskets.clear();
    }
}

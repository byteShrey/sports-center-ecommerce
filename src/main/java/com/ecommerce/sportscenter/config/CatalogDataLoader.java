package com.ecommerce.sportscenter.config;

import com.ecommerce.sportscenter.entity.Brand;
import com.ecommerce.sportscenter.entity.Product;
import com.ecommerce.sportscenter.entity.Type;
import com.ecommerce.sportscenter.repository.BrandRepository;
import com.ecommerce.sportscenter.repository.ProductRepository;
import com.ecommerce.sportscenter.repository.TypeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
public class CatalogDataLoader implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(CatalogDataLoader.class);

    private final BrandRepository brandRepository;
    private final TypeRepository typeRepository;
    private final ProductRepository productRepository;

    public CatalogDataLoader(
            BrandRepository brandRepository,
            TypeRepository typeRepository,
            ProductRepository productRepository) {
        this.brandRepository = brandRepository;
        this.typeRepository = typeRepository;
        this.productRepository = productRepository;
    }

    @Override
    @Transactional
    public void run(String... args) {
        if (productRepository.count() > 0) {
            log.info("Catalog already populated; skipping seed data");
            return;
        }

        Brand adidas = brandRepository.save(Brand.builder().name("Adidas").build());
        Brand nike = brandRepository.save(Brand.builder().name("Nike").build());
        Brand yonex = brandRepository.save(Brand.builder().name("Yonex").build());
        Brand puma = brandRepository.save(Brand.builder().name("Puma").build());

        Type shoes = typeRepository.save(Type.builder().name("Shoes").build());
        Type rackets = typeRepository.save(Type.builder().name("Rackets").build());
        Type football = typeRepository.save(Type.builder().name("Football").build());
        Type bags = typeRepository.save(Type.builder().name("Kit Bags").build());

        List<Product> products = List.of(
                product("Adidas CourtFlex Indoor Shoes", "Lightweight indoor court shoes with cushioned midsole.", 3499L, "images/products/adidas-shoes-1.png", adidas, shoes),
                product("Adidas SpeedServe Shoes", "Breathable upper designed for badminton and squash.", 3199L, "images/products/adidas-shoes-2.png", adidas, shoes),
                product("Nike Strike Premier Football", "Machine-stitched TPU casing for durable touch.", 1599L, "images/products/nike-football-1.png", nike, football),
                product("Nike Pitch Training Football", "High-visibility graphics for easier ball tracking.", 1299L, "images/products/nike-football-2.png", nike, football),
                product("Yonex Nanoflare Racket", "Head-light racket built for fast swings and control.", 8999L, "images/products/yonex-racket-1.png", yonex, rackets),
                product("Yonex Astrox Power Racket", "Stiff shaft racket for aggressive smash play.", 10999L, "images/products/yonex-racket-2.png", yonex, rackets),
                product("Yonex Team 6 Kit Bag", "Compact bag with two compartments for gear.", 2499L, "images/products/yonex-bag-1.png", yonex, bags),
                product("Puma Spike Cricket Shoes", "Rubber outsole built for long sessions on turf.", 4799L, "images/products/puma-shoes-1.png", puma, shoes),
                product("Puma Ultra Soft Kit Bag", "Roomy sports bag with padded shoulder strap.", 1999L, "images/products/puma-bag-1.png", puma, bags),
                product("Adidas Match Ball", "Thermally bonded panels for consistent flight.", 2799L, "images/products/adidas-football-1.png", adidas, football)
        );

        productRepository.saveAll(products);
        log.info("Seeded catalog with {} brands, {} types and {} products", 4, 4, products.size());
    }

    private Product product(
            String name,
            String description,
            Long price,
            String pictureUrl,
            Brand brand,
            Type type) {
        return Product.builder()
                .name(name)
                .description(description)
                .price(price)
                .pictureUrl(pictureUrl)
                .brand(brand)
                .type(type)
                .build();
    }
}

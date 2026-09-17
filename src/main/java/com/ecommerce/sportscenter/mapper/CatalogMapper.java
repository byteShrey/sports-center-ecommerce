package com.ecommerce.sportscenter.mapper;

import com.ecommerce.sportscenter.dto.BrandDto;
import com.ecommerce.sportscenter.dto.ProductDto;
import com.ecommerce.sportscenter.dto.TypeDto;
import com.ecommerce.sportscenter.entity.Brand;
import com.ecommerce.sportscenter.entity.Product;
import com.ecommerce.sportscenter.entity.Type;
import org.springframework.stereotype.Component;

@Component
public class CatalogMapper {

    public ProductDto toDto(Product product) {
        return new ProductDto(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getPictureUrl(),
                product.getBrand().getName(),
                product.getType().getName()
        );
    }

    public BrandDto toDto(Brand brand) {
        return new BrandDto(brand.getId(), brand.getName());
    }

    public TypeDto toDto(Type type) {
        return new TypeDto(type.getId(), type.getName());
    }
}

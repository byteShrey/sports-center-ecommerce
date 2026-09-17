package com.ecommerce.sportscenter.repository;

import com.ecommerce.sportscenter.dto.ProductFilter;
import com.ecommerce.sportscenter.entity.Product;
import org.springframework.data.jpa.domain.Specification;

public final class ProductSpecifications {

    private ProductSpecifications() {
    }

    public static Specification<Product> matching(ProductFilter filter) {
        return Specification.where(hasBrand(filter.brandId()))
                .and(hasType(filter.typeId()))
                .and(nameContains(filter.keyword()));
    }

    private static Specification<Product> hasBrand(Integer brandId) {
        if (brandId == null) {
            return null;
        }
        return (root, query, builder) -> builder.equal(root.get("brand").get("id"), brandId);
    }

    private static Specification<Product> hasType(Integer typeId) {
        if (typeId == null) {
            return null;
        }
        return (root, query, builder) -> builder.equal(root.get("type").get("id"), typeId);
    }

    private static Specification<Product> nameContains(String keyword) {
        if (keyword == null || keyword.isBlank()) {
            return null;
        }
        String pattern = "%" + keyword.trim().toLowerCase() + "%";
        return (root, query, builder) -> builder.like(builder.lower(root.get("name")), pattern);
    }
}

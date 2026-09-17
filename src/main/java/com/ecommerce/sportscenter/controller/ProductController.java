package com.ecommerce.sportscenter.controller;

import com.ecommerce.sportscenter.dto.PageResponse;
import com.ecommerce.sportscenter.dto.ProductDto;
import com.ecommerce.sportscenter.dto.ProductFilter;
import com.ecommerce.sportscenter.service.ProductService;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private static final Set<String> SORTABLE_FIELDS = Set.of("name", "price");
    private static final int MAX_PAGE_SIZE = 50;

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<PageResponse<ProductDto>> search(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(defaultValue = "name") String sort,
            @RequestParam(defaultValue = "asc") String order,
            @RequestParam(required = false) Integer brandId,
            @RequestParam(required = false) Integer typeId,
            @RequestParam(required = false) String keyword) {

        Pageable pageable = PageRequest.of(
                Math.max(page, 0),
                Math.min(Math.max(size, 1), MAX_PAGE_SIZE),
                resolveSort(sort, order)
        );
        ProductFilter filter = new ProductFilter(brandId, typeId, keyword);
        return ResponseEntity.ok(productService.search(filter, pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDto> findById(@PathVariable Integer id) {
        return ResponseEntity.ok(productService.findById(id));
    }

    private Sort resolveSort(String field, String order) {
        String property = SORTABLE_FIELDS.contains(field) ? field : "name";
        Sort.Direction direction = "desc".equalsIgnoreCase(order) ? Sort.Direction.DESC : Sort.Direction.ASC;
        return Sort.by(direction, property);
    }
}

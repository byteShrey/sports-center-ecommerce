package com.ecommerce.sportscenter.service;

import com.ecommerce.sportscenter.dto.PageResponse;
import com.ecommerce.sportscenter.dto.ProductDto;
import com.ecommerce.sportscenter.dto.ProductFilter;
import org.springframework.data.domain.Pageable;

public interface ProductService {

    PageResponse<ProductDto> search(ProductFilter filter, Pageable pageable);

    ProductDto findById(Integer productId);
}

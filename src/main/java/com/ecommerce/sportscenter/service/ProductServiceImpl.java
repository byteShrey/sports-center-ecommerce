package com.ecommerce.sportscenter.service;

import com.ecommerce.sportscenter.dto.PageResponse;
import com.ecommerce.sportscenter.dto.ProductDto;
import com.ecommerce.sportscenter.dto.ProductFilter;
import com.ecommerce.sportscenter.exception.ResourceNotFoundException;
import com.ecommerce.sportscenter.mapper.CatalogMapper;
import com.ecommerce.sportscenter.repository.ProductRepository;
import com.ecommerce.sportscenter.repository.ProductSpecifications;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CatalogMapper catalogMapper;

    public ProductServiceImpl(ProductRepository productRepository, CatalogMapper catalogMapper) {
        this.productRepository = productRepository;
        this.catalogMapper = catalogMapper;
    }

    @Override
    public PageResponse<ProductDto> search(ProductFilter filter, Pageable pageable) {
        return PageResponse.from(
                productRepository.findAll(ProductSpecifications.matching(filter), pageable)
                        .map(catalogMapper::toDto)
        );
    }

    @Override
    public ProductDto findById(Integer productId) {
        return productRepository.findWithAssociationsById(productId)
                .map(catalogMapper::toDto)
                .orElseThrow(() -> ResourceNotFoundException.product(productId));
    }
}

package com.ecommerce.sportscenter.service;

import com.ecommerce.sportscenter.dto.BrandDto;
import com.ecommerce.sportscenter.mapper.CatalogMapper;
import com.ecommerce.sportscenter.repository.BrandRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class BrandServiceImpl implements BrandService {

    private final BrandRepository brandRepository;
    private final CatalogMapper catalogMapper;

    public BrandServiceImpl(BrandRepository brandRepository, CatalogMapper catalogMapper) {
        this.brandRepository = brandRepository;
        this.catalogMapper = catalogMapper;
    }

    @Override
    public List<BrandDto> findAll() {
        return brandRepository.findAll(Sort.by("name"))
                .stream()
                .map(catalogMapper::toDto)
                .toList();
    }
}

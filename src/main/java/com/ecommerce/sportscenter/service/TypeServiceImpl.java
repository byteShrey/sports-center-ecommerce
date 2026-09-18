package com.ecommerce.sportscenter.service;

import com.ecommerce.sportscenter.dto.TypeDto;
import com.ecommerce.sportscenter.mapper.CatalogMapper;
import com.ecommerce.sportscenter.repository.TypeRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class TypeServiceImpl implements TypeService {

    private final TypeRepository typeRepository;
    private final CatalogMapper catalogMapper;

    public TypeServiceImpl(TypeRepository typeRepository, CatalogMapper catalogMapper) {
        this.typeRepository = typeRepository;
        this.catalogMapper = catalogMapper;
    }

    @Override
    public List<TypeDto> findAll() {
        return typeRepository.findAll(Sort.by("name"))
                .stream()
                .map(catalogMapper::toDto)
                .toList();
    }
}

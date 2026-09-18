package com.ecommerce.sportscenter.controller;

import com.ecommerce.sportscenter.dto.BrandDto;
import com.ecommerce.sportscenter.service.BrandService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/brands")
public class BrandController {

    private final BrandService brandService;

    public BrandController(BrandService brandService) {
        this.brandService = brandService;
    }

    @GetMapping
    public ResponseEntity<List<BrandDto>> findAll() {
        return ResponseEntity.ok(brandService.findAll());
    }
}

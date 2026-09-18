package com.ecommerce.sportscenter.controller;

import com.ecommerce.sportscenter.dto.TypeDto;
import com.ecommerce.sportscenter.service.TypeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/types")
public class TypeController {

    private final TypeService typeService;

    public TypeController(TypeService typeService) {
        this.typeService = typeService;
    }

    @GetMapping
    public ResponseEntity<List<TypeDto>> findAll() {
        return ResponseEntity.ok(typeService.findAll());
    }
}

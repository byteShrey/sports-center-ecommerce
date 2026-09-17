package com.ecommerce.sportscenter.dto;

import org.springframework.data.domain.Page;

import java.util.List;

/**
 * Stable pagination envelope so the API contract does not depend on the
 * serialized shape of Spring's {@link Page}.
 */
public record PageResponse<T>(
        List<T> content,
        int page,
        int size,
        long totalElements,
        int totalPages,
        boolean last
) {

    public static <T> PageResponse<T> from(Page<T> page) {
        return new PageResponse<>(
                page.getContent(),
                page.getNumber(),
                page.getSize(),
                page.getTotalElements(),
                page.getTotalPages(),
                page.isLast()
        );
    }
}

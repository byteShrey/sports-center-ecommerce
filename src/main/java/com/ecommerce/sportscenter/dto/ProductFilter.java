package com.ecommerce.sportscenter.dto;

/**
 * Optional catalog filters; any {@code null} field is ignored when querying.
 */
public record ProductFilter(Integer brandId, Integer typeId, String keyword) {
}

package com.ecommerce.sportscenter.exception;

public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(String message) {
        super(message);
    }

    public static ResourceNotFoundException product(Integer id) {
        return new ResourceNotFoundException("Product " + id + " was not found");
    }
}

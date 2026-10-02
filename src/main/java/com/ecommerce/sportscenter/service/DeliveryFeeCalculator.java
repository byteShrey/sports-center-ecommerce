package com.ecommerce.sportscenter.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class DeliveryFeeCalculator {

    private final long freeDeliveryThreshold;
    private final long standardFee;

    public DeliveryFeeCalculator(
            @Value("${app.delivery.free-threshold:5000}") long freeDeliveryThreshold,
            @Value("${app.delivery.standard-fee:150}") long standardFee) {
        this.freeDeliveryThreshold = freeDeliveryThreshold;
        this.standardFee = standardFee;
    }

    public long feeFor(long subtotal) {
        return subtotal == 0 || subtotal >= freeDeliveryThreshold ? 0 : standardFee;
    }
}

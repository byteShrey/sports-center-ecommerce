package com.ecommerce.sportscenter.service;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class DeliveryFeeCalculatorTest {

    private final DeliveryFeeCalculator calculator = new DeliveryFeeCalculator(5000, 150);

    @Test
    void chargesStandardFeeBelowThreshold() {
        assertThat(calculator.feeFor(4999)).isEqualTo(150);
    }

    @Test
    void deliveryIsFreeAtThreshold() {
        assertThat(calculator.feeFor(5000)).isZero();
    }

    @Test
    void emptyBasketHasNoDeliveryFee() {
        assertThat(calculator.feeFor(0)).isZero();
    }
}

package com.ecommerce.sportscenter.repository;

import com.ecommerce.sportscenter.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {

    List<Order> findByBuyerUsernameOrderByOrderDateDesc(String buyerUsername);
}

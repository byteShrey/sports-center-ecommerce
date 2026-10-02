package com.ecommerce.sportscenter.repository;

import com.ecommerce.sportscenter.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {

    List<Order> findByBuyerUsernameOrderByOrderDateDesc(String buyerUsername);

    Optional<Order> findByIdAndBuyerUsername(Integer id, String buyerUsername);
}

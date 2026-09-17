package com.ecommerce.sportscenter.repository;

import com.ecommerce.sportscenter.entity.Type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TypeRepository extends JpaRepository<Type, Integer> {

    Optional<Type> findByNameIgnoreCase(String name);
}

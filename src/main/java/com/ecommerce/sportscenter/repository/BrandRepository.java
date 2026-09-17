package com.ecommerce.sportscenter.repository;

import com.ecommerce.sportscenter.entity.Brand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BrandRepository extends JpaRepository<Brand, Integer> {

    Optional<Brand> findByNameIgnoreCase(String name);
}

package com.ecommerce.sportscenter.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;

@Configuration
@Profile("!demo")
@EnableRedisRepositories(basePackages = "com.ecommerce.sportscenter.repository.redis")
public class RedisConfig {
}

package com.main.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {
    private static final String ORIGIN = "http://localhost:3000";

    @Override
    public void addCorsMappings(@org.jetbrains.annotations.NotNull CorsRegistry registry) {
        System.out.println("CORS CONFIG!!!!!!!");
        registry.addMapping("/**")
                .allowedOrigins(ORIGIN)
                .allowedMethods("PUT", "DELETE", "GET", "POST");
    }
}
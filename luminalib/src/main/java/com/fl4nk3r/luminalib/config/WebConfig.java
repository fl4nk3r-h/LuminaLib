package com.fl4nk3r.luminalib.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    // CORS is now configured in SecurityConfig.java
    // No need to configure here to avoid conflicts
}

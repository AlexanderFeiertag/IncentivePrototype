package at.feiertag;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
@EnableScheduling
public class WebApplication {
    public static void main(String[] args) {
        SpringApplication.run(WebApplication.class, args);
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        System.out.println("CORS configuration....");

        String[] allowDomains = new String[4];
        allowDomains[0] = "http://localhost:4200";
        allowDomains[1] = "http://localhost:8080";
        allowDomains[2] = "http://localhost:80";
        allowDomains[2] = "http://localhost";

        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedOrigins(allowDomains).allowedMethods("GET", "POST", "PUT", "DELETE");
            }
        };
    }
}

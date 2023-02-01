package ru.kata.spring.boot_security.demo;

import lombok.AllArgsConstructor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import ru.kata.spring.boot_security.demo.dao.UserRepository;

@AllArgsConstructor
@SpringBootApplication
public class SpringBootSecurityDemoApplication {


    public static void main(String[] args) {
        SpringApplication.run(SpringBootSecurityDemoApplication.class, args);
    }

}

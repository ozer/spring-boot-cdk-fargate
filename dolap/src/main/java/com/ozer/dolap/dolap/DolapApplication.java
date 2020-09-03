package com.ozer.dolap.dolap;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan({"com.ozer.dolap"})
public class DolapApplication {
    public static void main(String[] args) {
        SpringApplication.run(DolapApplication.class, args);
    }
}

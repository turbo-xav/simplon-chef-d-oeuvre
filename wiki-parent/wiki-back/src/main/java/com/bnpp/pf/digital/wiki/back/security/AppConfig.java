package com.bnpp.pf.digital.wiki.back.security;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
@ComponentScan("com.bnpp.pf.digital.wiki.back.controller")
@EnableWebMvc
public class AppConfig extends WebMvcConfigurerAdapter {
	@Override
	public void addCorsMappings(CorsRegistry registry) {
	  //System.out.println("AppConfig");
		//registry.addMapping("/**")
	   	  //.allowedOrigins("http://localhost:4200", "http://localhost:8090")
		  //.allowedMethods("POST", "GET",  "PUT", "OPTIONS", "DELETE", "HEAD");
		
		  //.allowedHeaders("*")
		  //.exposedHeaders("origin","content-type", "accept", "x-req", "Access-Control-Allow-Methods", "Access-Control-Allow-Origin")
		  //.allowCredentials(false)
		  //.maxAge(4800);
	}
} 
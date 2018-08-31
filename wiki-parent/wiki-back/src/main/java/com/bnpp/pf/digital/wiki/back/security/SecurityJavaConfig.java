package com.bnpp.pf.digital.wiki.back.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.access.channel.ChannelProcessingFilter;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
@EnableWebSecurity
@ComponentScan("com.bnpp.pf.digital.wiki.back.security")
public class SecurityJavaConfig extends WebSecurityConfigurerAdapter {

	@Autowired
    private RestAuthenticationEntryPoint restAuthenticationEntryPoint;
	
	@Autowired
    private MySavedRequestAwareAuthenticationSuccessHandler
      authenticationSuccessHandler;
	
	@Autowired
	private CORSFilter corsFilter;
	
	@Override
	    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.inMemoryAuthentication().withUser("417165").password("admin").roles("ADMIN");
		auth.inMemoryAuthentication().withUser("417166").password("user").roles("USER");		
		auth.inMemoryAuthentication().withUser("417167").password("techlead").roles("TECHLEAD");
	}
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		System.out.println("configure");
	  
		 http
	        .cors()
	        .and()		 	
	        .csrf().disable()
	        .exceptionHandling()
	        .authenticationEntryPoint(restAuthenticationEntryPoint)
	        .and()
	        .addFilterBefore(corsFilter, ChannelProcessingFilter.class)
	        .authorizeRequests()
	        .antMatchers("/rest/role/**").access("hasRole('ADMIN')")	        
			.antMatchers("/rest/user/**").access("hasRole('ADMIN') or hasRole('TECHLEAD')")
			.antMatchers("/rest/guideline/**").access("hasRole('ADMIN') or hasRole('TECHLEAD')")
	        .antMatchers("/**").permitAll()	        
	        .and()
	        .formLogin()
	        .loginPage("/login")
			.permitAll()
	        .successHandler(authenticationSuccessHandler)
	        .failureHandler(new SimpleUrlAuthenticationFailureHandler())
	        .and()
	        .logout();
		 	//.addLogoutHandler(logoutHandler);
	}	
		
	 @Bean
	 public MySavedRequestAwareAuthenticationSuccessHandler mySuccessHandler(){
	     return new MySavedRequestAwareAuthenticationSuccessHandler();
	 }
	    
	 @Bean
	 public SimpleUrlAuthenticationFailureHandler myFailureHandler(){
	     return new SimpleUrlAuthenticationFailureHandler();
	 }
	
}

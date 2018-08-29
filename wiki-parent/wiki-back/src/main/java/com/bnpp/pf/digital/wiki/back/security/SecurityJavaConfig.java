package com.bnpp.pf.digital.wiki.back.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
@ComponentScan("com.bnpp.pf.digital.wiki.back.security")
public class SecurityJavaConfig extends WebSecurityConfigurerAdapter {

	@Autowired
    private RestAuthenticationEntryPoint restAuthenticationEntryPoint;
	
	@Autowired
    private MySavedRequestAwareAuthenticationSuccessHandler
      authenticationSuccessHandler;
	
	@Override
	    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.inMemoryAuthentication().withUser("bill").password("abc123").roles("USER");
		auth.inMemoryAuthentication().withUser("admin").password("root123").roles("ADMIN");
		auth.inMemoryAuthentication().withUser("dba").password("root123").roles("TECHLEAD");
	}
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		System.out.println("configure");
	  
		 http
	        .csrf().disable()
	        .exceptionHandling()
	        .authenticationEntryPoint(restAuthenticationEntryPoint)
	        .and()
	        .authorizeRequests()
	        .antMatchers("/rest/**").permitAll()
	        //.antMatchers("/rest/role/**").access("hasRole('ADMIN')")
			//.antMatchers("/rest/user/**").access("hasRole('ADMIN') or hasRole('TECHLEAD')")
			//.antMatchers("/rest/guideline/**").access("hasRole('ADMIN') or hasRole('TECHLEAD')")
	        .and()
	        .formLogin()
	        .successHandler(authenticationSuccessHandler)
	        .failureHandler(new SimpleUrlAuthenticationFailureHandler())
	        .and()
	        .logout();
	        //.logoutUrl("/logout").addLogoutHandler(logoutHandler);
		
		
		
		/*http
	  	.csrf().disable().exceptionHandling()
	  	.and()
	  	.authorizeRequests()
	  	.antMatchers("/").permitAll() 
		.antMatchers("/rest/role/**").access("hasRole('ADMIN')")
		.antMatchers("/rest/user/**").access("hasRole('ADMIN') or hasRole('TECHLEAD')")
		.antMatchers("/rest/guideline/**").access("hasRole('ADMIN') or hasRole('TECHLEAD')")
		.and()
        .httpBasic()
        
		.authenticationEntryPoint(authenticationEntryPoint)
		//.and().formLogin()
		.and()
		.exceptionHandling().accessDeniedPage("/rest/auth/access-denied")
		.and()		
		.logout().logoutUrl("/rest/auth/logout")
		.logoutSuccessUrl("/rest/role")
		.deleteCookies("auth_code", "JSESSIONID")
		.addLogoutHandler(logoutHandler)
		.clearAuthentication(true)
        .invalidateHttpSession(true);*/
		 
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

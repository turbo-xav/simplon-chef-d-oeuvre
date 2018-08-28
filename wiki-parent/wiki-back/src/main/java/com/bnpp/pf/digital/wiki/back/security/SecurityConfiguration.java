package com.bnpp.pf.digital.wiki.back.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

	@Autowired
    private MyBasicAuthenticationEntryPoint authenticationEntryPoint;
	
	@Autowired
    private LogoutHandler logoutHandler;
	
	@Autowired
	public void configureGlobalSecurity(AuthenticationManagerBuilder auth) throws Exception {
		auth.inMemoryAuthentication().withUser("bill").password("abc123").roles("USER");
		auth.inMemoryAuthentication().withUser("admin").password("root123").roles("ADMIN");
		auth.inMemoryAuthentication().withUser("dba").password("root123").roles("ADMIN","DBA");
	}
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		System.out.println("configure");
	  
		/*http
        .authorizeRequests()
        	.antMatchers("/rest/auth/**").permitAll()     
        	.antMatchers("/resources/**").permitAll() 
            .anyRequest().authenticated()
            .and()
        .formLogin()
            .loginPage("/rest/auth/login")
            .permitAll()
            .and()
        .logout()                                    
            .permitAll();*/
		
		
		
		http
	  	.csrf().disable().exceptionHandling()
	  	.and()
	  	.authorizeRequests()
	  	.antMatchers("/**", "/home").permitAll() 
		//.antMatchers("/rest/role/**").access("hasRole('ADMIN')")
		//.antMatchers("/rest/user/**").access("hasRole('ADMIN') or hasRole('DBA')")
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
        .invalidateHttpSession(true);
 
	}
	
	
}

package com.bnpp.pf.digital.wiki.back.security;

import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import com.bnpp.pf.digital.wiki.back.service.PropertyLoader;

@Configuration
@EnableWebMvc
@ComponentScan(basePackages = "com.bnpp.pf.digital.wiki.back")
public class CORSFilter implements Filter {
	
	public CORSFilter () {
	    super();
	}
	
	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
        	HttpServletResponse httpResponse = (HttpServletResponse) response;
        	PropertyLoader propertyLoader = new PropertyLoader();
        	
        	httpResponse.setHeader("Access-Control-Allow-Origin", (String) propertyLoader.load().get("security.accessControlAllowOrigin"));
	        httpResponse.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS, DELETE");
        	httpResponse.setHeader("Access-Control-Allow-Headers", "ResponseType, Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
	        httpResponse.setHeader("Access-Control-Expose-Headers", "*");
        	httpResponse.setHeader("Access-Control-Allow-Credentials", "true");
	        httpResponse.setHeader("Access-Control-Max-Age", "4800");
	        //System.out.println("---CORS Configuration Completed---");
	        chain.doFilter(request, response);
	}
	
	
	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
	}
	
	
	@Override
	public void destroy() {
	}
} 
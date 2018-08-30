/**
 * 
 */
package com.bnpp.pf.digital.wiki.back.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author 417165
 *
 */

//@CrossOrigin(maxAge = 3600)
@RestController
@RequestMapping("/hello")
public class HelloController {

    /**
     * 
     */
    public HelloController() {
        // TODO Auto-generated constructor stub
    }
    
    /**
     * 
     * @param name
     * @return
     */
    
    @RequestMapping("/greeting/{name}")
    @ResponseStatus(code=HttpStatus.OK)
    @ResponseBody
    public String greeting(@PathVariable("name") String name) {
        return "Hello : "+name +" !";
    }

}

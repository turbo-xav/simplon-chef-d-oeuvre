/**
 * 
 */
package com.bnpp.pf.digital.wiki.back.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author 417165
 *
 */

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
    @ResponseBody
    public String greeting(@PathVariable("name") String name) {
        return "Hello : "+name +" !";
    }

}

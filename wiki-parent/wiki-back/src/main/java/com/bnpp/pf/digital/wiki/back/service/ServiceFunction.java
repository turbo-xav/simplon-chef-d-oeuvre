package com.bnpp.pf.digital.wiki.back.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.bnpp.pf.digital.wiki.back.entity.Function;
import com.bnpp.pf.digital.wiki.back.repository.FunctionRepository;

@Component
@Transactional
public class ServiceFunction implements IServiceFunction {

    @Autowired
    private FunctionRepository functionRepository;
    
    
        
    /* (non-Javadoc)
	 * @see com.bnpp.pf.digital.wiki.back.service.IServiceRole#findAll()
	 */
    
    public List<Function> findAll() {
        return functionRepository.findAll();
    }
    
   
    public Function getById(int id) {
    	return functionRepository.getById(id);       
    }
    
    
    @Transactional()
    public Function save(Function function) {       
			return functionRepository.save(function);		
    }
    
    /* (non-Javadoc)
	 * @see com.bnpp.pf.digital.wiki.back.service.IServiceRole#deleteById(int)
	 */
    
    public void deleteById(int id) {
      functionRepository.deleteById(id);
    }
      
}

package com.bnpp.pf.digital.wiki.back.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.bnpp.pf.digital.wiki.back.entity.Function;
import com.bnpp.pf.digital.wiki.back.entity.Member;
import com.bnpp.pf.digital.wiki.back.entity.Team;
import com.bnpp.pf.digital.wiki.back.repository.FunctionRepository;
import com.bnpp.pf.digital.wiki.back.repository.MemberRepository;

@Component
@Transactional
public class ServiceMember implements IServiceMember {

    @Autowired
    private MemberRepository memberRepository;
    
    @Autowired
    private FunctionRepository functionRepository;
    
   
    /* (non-Javadoc)
	 * @see com.bnpp.pf.digital.wiki.back.service.IServiceMember#findAll()
	 */
    
    public List<Member> findAll() {
        return memberRepository.findAll();
    }
    
   
    public Member getById(int id) {
    	Member member = memberRepository.getById(id);
        return member;
    }
    
    
    public Member save(Member member) {       
		
    	boolean okToSave = true;
    	   	
    	   	   	
    	/*int nb = memberRepository.countByFunction(functionRepository.getByName("Responsible"));
    	if( nb >= 1 && member.getFunction().getName().equals("Responsible")) {
    		okToSave = false;    		
    	}*/    	
    	
    	if(okToSave) {    	
    		return memberRepository.save(member);
    	}
    	
    	return member;
    }
    
    /* (non-Javadoc)
	 * @see com.bnpp.pf.digital.wiki.back.service.IServiceMember#deleteById(int)
	 */
    
    public void deleteById(int id) {               
    	memberRepository.deleteById(id);
    }
      
}

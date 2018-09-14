package com.bnpp.pf.digital.wiki.back.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.bnpp.pf.digital.wiki.back.entity.Member;
import com.bnpp.pf.digital.wiki.back.entity.Team;
import com.bnpp.pf.digital.wiki.back.repository.MemberRepository;

@Component
@Transactional
public class ServiceMember implements IServiceMember {

    @Autowired
    private MemberRepository memberRepository;
    
    
    
   
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
		return memberRepository.save(member);    	
    }
    
    /* (non-Javadoc)
	 * @see com.bnpp.pf.digital.wiki.back.service.IServiceMember#deleteById(int)
	 */
    
    public void deleteById(int id) {               
    	memberRepository.deleteById(id);
    }


	@Override
	public List<Member> getMembersByTeam(Team team) {
		return memberRepository.getMembersByTeam(team);
	}
      
}

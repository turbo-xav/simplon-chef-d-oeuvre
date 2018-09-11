package com.bnpp.pf.digital.wiki.back.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bnpp.pf.digital.wiki.back.entity.Function;
import com.bnpp.pf.digital.wiki.back.entity.Member;
import com.bnpp.pf.digital.wiki.back.entity.Team;

/**
 * 
 * @author 417165
 *
 */

//@Repository
public interface MemberRepository extends JpaRepository<Member, Integer>{
    
	 
	@Query("SELECT m FROM Member m")
	public List<Member> findAll();
	
	/**
     * 
     * @param id
     * @return
     */
    
	@Query("SELECT m FROM Member m WHERE m.id = :id")
	Member getById(@Param("id") int id);
	
	/**
     * 
     * @param id
     * @return
     */
    
	int countByFunction(Function function);
	
		    
    /**
     * 
     * @param id
     * @return
     */
    
    void deleteById(int id);    
    
}

//package com.bnpp.pf.digital.wiki.back.repository;
//
//import java.util.List;
//
//import org.jboss.logging.Param;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.stereotype.Repository;
//
//import com.bnpp.pf.digital.wiki.back.entity.Application;
//import com.bnpp.pf.digital.wiki.back.entity.User;
//
//@Repository
//public interface ApplicationRepository extends JpaRepository<Application, Integer> {
//
//	@Query("SELECT a FROM Application a LEFT OUTER JOIN FETCH a.server s")
//	public List<Application> findAll();
//
////	@Query("SELECT a FROM Application a LEFT OUTER JOIN FETCH a.server s WHERE a.id = :id")
////	Application getById(@Param("id") int id);
//	
////	@Query("SELECT a FROM Application a LEFT OUTER JOIN FETCH a.server s WHERE a.codeApp = :codeApp")
////	User getByCodeApp(@Param("codeApp") String codeApp);
//
////List<Application> getbyCodeApp(String codeApp);
//    
//    
//    
//    void deleteById(int id);    
//	
//}

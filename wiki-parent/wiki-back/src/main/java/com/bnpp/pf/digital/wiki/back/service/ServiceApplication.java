package com.bnpp.pf.digital.wiki.back.service;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.bnpp.pf.digital.wiki.back.entity.Application;
import com.bnpp.pf.digital.wiki.back.entity.Diagnostic;
import com.bnpp.pf.digital.wiki.back.entity.Layer;
import com.bnpp.pf.digital.wiki.back.entity.Server;
import com.bnpp.pf.digital.wiki.back.repository.ApplicationRepository;

@Component
@Transactional
public class ServiceApplication implements IServiceApplication {

	@Autowired
	private ApplicationRepository applicationRepository;
		
	
	public Application save(Application application) {
		return applicationRepository.save(application);
	}
	
	public List<Application> findAll(){
		return applicationRepository.findAll();
	}
	
	public Application getById(int id) {
		return applicationRepository.getById(id);
	}
	
	public List<Application> getByCodeApp(String codeApp) {
		return applicationRepository.getByCodeApp(codeApp);
	}
	
	public List <Application> getByTitle(String title) {
		return applicationRepository.getByTitle(title);
		
	}
	public void deleteById(int id) {
		applicationRepository.deleteById(id);
	}
	
	

	public List<Application> findByCriteria2(final String codeApp){
        
		
		
		//return new ArrayList<Application>();
		
		return applicationRepository.findAll(new Specification<Application>() {
			
			//@PersistenceContext
		    //private EntityManager em;
			
			@Override
            public Predicate toPredicate(Root<Application> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                
            	/*query = criteriaBuilder.createQuery(Application.class);
            	Root<Layer> layerRoot = query.from(Layer.class);
            	Join<Application, Layer> layers = layerRoot.join("application");
            	
            	List<Application> results = (List<Application>) em.createQuery(query).getResultList();
            	for (Application app : results) {
            		System.out.println("code = " + app.getCodeApp() );
            			
            	}*/
            	
            	
            	List<Predicate> predicates = new ArrayList<Predicate>();
               
            	
            	if(codeApp != null) {
                    predicates.add(criteriaBuilder.and(criteriaBuilder.equal(root.get("codeApp"), codeApp)));
                }
                return criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()]));
            }
        });
    }
}



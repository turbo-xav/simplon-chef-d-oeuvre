package com.bnpp.pf.digital.wiki.back.controller;

import java.util.List;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.bnpp.pf.digital.wiki.back.entity.Function;
import com.bnpp.pf.digital.wiki.back.entity.Member;
import com.bnpp.pf.digital.wiki.back.entity.dto.MemberDto;
import com.bnpp.pf.digital.wiki.back.exception.FunctionnalException;
import com.bnpp.pf.digital.wiki.back.service.IServiceFunction;
import com.bnpp.pf.digital.wiki.back.service.IServiceMember;

@RestController
@RequestMapping("/member")
public class MemberController {
	private static final String LISTING_ERROR_MSG = "get list of members is not possible please verify your database";

	private static final String GETTING_ERROR_MSG = "get this user is not possible please verify your database";

	private static final String DELETING_BY_ID_ERROR_MSG = "delete this user is not possible please verify your database";

	private static final String CREATING_ERROR_MSG = "creating this member is not possible please verify your database";

	private static final String UPDATING_ERROR_MSG = "updating this member is not possible please verify your database";

	private static final String CREATING_INTERITY_ERROR_MSG = "creating this member is not possible please verify if you are not create an exiting member";

	private static final String UPDATING_INTERITY_ERROR_MSG = "updating this member is not possible please verify if you are not update a member with the same name";

	private static final String CREATING_DATA_ACCESS_ERROR_MSG = "creating this member is not possible please verify your datas";

	private static final String UPDATING_DATA_ACCESS_ERROR_MSG = "updating this member is not possible please verify your datas";

	private static final String MISSING_FIRSTNAME_ERROR_MSG = "please specify a firstName ";

	private static final String MISSING_LASTNAME_ERROR_MSG = "please specify a lastName";

	private static final String MISSING_MAIL_ERROR_MSG = "please specify the mail";

	private static final String INVALID_MAIL_ERROR_MSG = "please specify a valid mail adress (ex : jean-pierre.dupond@cetelem.fr)";
	
	private static final String MISSING_TEL_ERROR_MSG = "please specify a tel (ex : 0146399718)";
	
	private static final String BAD_TEL_FORMAT_ERROR_MSG = "please specify a good format for tel (ex : 0146399718)";
	
	
	
	@Autowired
	private IServiceMember serviceMember;
	
	@Autowired
	private IServiceFunction serviceFunction;
	
	
	public MemberController() {

	}

	@RequestMapping(method = RequestMethod.GET)
	// @ResponseStatus(code=HttpStatus.OK)
	@ResponseBody
	public ResponseEntity<?> getAll() {

		try {
			List<Member> members = serviceMember.findAll();
			return new ResponseEntity<List<Member>>(members, HttpStatus.OK);
		} catch (DataAccessException e) {
			return new ResponseEntity<WikiError>(new WikiError(LISTING_ERROR_MSG), HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			return new ResponseEntity<WikiError>(new WikiError(LISTING_ERROR_MSG), HttpStatus.BAD_REQUEST);
		}

	}

	@RequestMapping(path = "{id}", method = RequestMethod.GET)
	@ResponseBody
	// @Transactional
	public ResponseEntity<?> getById(@PathVariable("id") int id) {
		try {
			Member member = serviceMember.getById(id);
			return new ResponseEntity<Member>(member, HttpStatus.OK);
		} catch (DataAccessException e) {
			return new ResponseEntity<WikiError>(new WikiError(GETTING_ERROR_MSG), HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			return new ResponseEntity<WikiError>(new WikiError(GETTING_ERROR_MSG), HttpStatus.BAD_REQUEST);
		}

	}

	@RequestMapping(path = "{id}", method = RequestMethod.DELETE)
	@ResponseBody
	// @Transactional
	public ResponseEntity<?> deleteById(@PathVariable("id") int id) {
		try {
			serviceMember.deleteById(id);
			return new ResponseEntity<Integer>(id, HttpStatus.OK);
		} catch (DataAccessException e) {
			return new ResponseEntity<WikiError>(new WikiError(DELETING_BY_ID_ERROR_MSG), HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			return new ResponseEntity<WikiError>(new WikiError(DELETING_BY_ID_ERROR_MSG), HttpStatus.BAD_REQUEST);
		}
	}

	/**
	 * 
	 * @param name
	 * @return
	 */

	@RequestMapping(method = RequestMethod.PUT)
	@ResponseBody
	public ResponseEntity<?> update(@RequestBody MemberDto memberDto) {
		
	try {

			WikiError wikiError = this.checkMemberDatas(memberDto);   		
    		
    		if(wikiError.getErrors().size() > 0) {
    			wikiError.setMsg("some errors has stopped saving of the member");
    			return new ResponseEntity<WikiError>(wikiError, HttpStatus.BAD_REQUEST);    					
    		
    		}    		
    		
    		checkBeforeSave(memberDto);
    		
    		Member member = memberDto.toMember();
    		serviceMember.save(member);
        	return new ResponseEntity<Integer>(member.getId(), HttpStatus.OK);
		}catch(FunctionnalException e){
			return new ResponseEntity<WikiError>(new WikiError(e.getMessage()), HttpStatus.BAD_REQUEST);
		} catch (DataIntegrityViolationException e) {
			return new ResponseEntity<WikiError>(new WikiError(UPDATING_INTERITY_ERROR_MSG), HttpStatus.BAD_REQUEST);
		} catch (DataAccessException e) {
			return new ResponseEntity<WikiError>(new WikiError(UPDATING_DATA_ACCESS_ERROR_MSG), HttpStatus.BAD_REQUEST);
		} catch (Exception e) {			
			System.out.println(e);
			return new ResponseEntity<WikiError>(new WikiError(UPDATING_ERROR_MSG), HttpStatus.BAD_REQUEST);
		}

	}

	/**
	 * 
	 * @param name
	 * @return
	 */

	@RequestMapping(method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<?> insert(@RequestBody MemberDto memberDto) {
		try {
			WikiError wikiError = this.checkMemberDatas(memberDto);   		
    		
    		if(wikiError.getErrors().size() > 0) {
    			wikiError.setMsg("some errors has stopped saving of the member");
    			return new ResponseEntity<WikiError>(wikiError, HttpStatus.BAD_REQUEST);    					
    		} 
    		
    		checkBeforeSave(memberDto);
    		
    		Member member = memberDto.toMember();
    		serviceMember.save(member);
        	return new ResponseEntity<Integer>(member.getId(), HttpStatus.OK);
		
		}catch(FunctionnalException e){
			return new ResponseEntity<WikiError>(new WikiError(e.getMessage()), HttpStatus.BAD_REQUEST);
		}
		catch (DataIntegrityViolationException e) {
			return new ResponseEntity<WikiError>(new WikiError(CREATING_INTERITY_ERROR_MSG), HttpStatus.BAD_REQUEST);
		} catch (DataAccessException e) {
			return new ResponseEntity<WikiError>(new WikiError(CREATING_DATA_ACCESS_ERROR_MSG), HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			System.out.println(e);
			return new ResponseEntity<WikiError>(new WikiError(CREATING_ERROR_MSG), HttpStatus.BAD_REQUEST);
		}
	}
	
	 private WikiError checkMemberDatas(MemberDto member) {
	    	String EMAIL_PATTERN = "^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$";
	    	
	    	String TEL_PATTERN = "'^0[1-9]{1}[0-9]{8}$";
	    	
	    	WikiError wikiError = new WikiError("");
						
			if (member.getFirstName().isEmpty()) {
				wikiError.addError("firstName", MISSING_FIRSTNAME_ERROR_MSG);
			}
			
			if (member.getLastName().isEmpty()) {
				wikiError.addError("lastName", MISSING_LASTNAME_ERROR_MSG);
			}
			
			if (member.getTel().isEmpty()) {
				wikiError.addError("tel", BAD_TEL_FORMAT_ERROR_MSG);
			} else if(!Pattern.compile(TEL_PATTERN).matcher(member.getTel()).matches()) {
				
			}
			
			if (member.getMail().isEmpty()) {
				wikiError.addError("mail", MISSING_MAIL_ERROR_MSG);
			} else if(!Pattern.compile(EMAIL_PATTERN).matcher(member.getMail()).matches()) {
				wikiError.addError("mail", INVALID_MAIL_ERROR_MSG);
			}
			
			return wikiError;
	    }
	 
	 private boolean checkBeforeSave(MemberDto memberDto) throws Exception {
		 	
		 	Function functionMemberDto = serviceFunction.getById(memberDto.getFunction().getId());  	   		
		 	List<Member> teamMembers = serviceMember.getMembersByTeam(memberDto.getTeam().toTeam()); 
		 	
		 	for(Member memberTeam: teamMembers) {
		 		System.out.println("Member Team Function : " + memberTeam.getFunction().getName());
		 		if(memberTeam.getId() != memberDto.getId() && memberTeam.getFunction().getName().equals("Responsible") && functionMemberDto.getName().equals("Responsible")) {
		 			throw new FunctionnalException("Team can't have more than one reponsible");
		 		}
		 	}
		 		 	
	    	return true;
	 }
}

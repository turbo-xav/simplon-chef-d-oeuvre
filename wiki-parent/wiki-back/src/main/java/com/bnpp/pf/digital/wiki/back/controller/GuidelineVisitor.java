package com.bnpp.pf.digital.wiki.back.controller;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.List;

import javax.activation.MimetypesFileTypeMap;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
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
import com.bnpp.pf.digital.wiki.back.entity.Guideline;
import com.bnpp.pf.digital.wiki.back.entity.Member;
import com.bnpp.pf.digital.wiki.back.entity.Team;
import com.bnpp.pf.digital.wiki.back.exception.FunctionnalException;
import com.bnpp.pf.digital.wiki.back.exception.TechnicalException;
import com.bnpp.pf.digital.wiki.back.service.IServiceFunction;
import com.bnpp.pf.digital.wiki.back.service.IServiceGuideline;
import com.bnpp.pf.digital.wiki.back.service.IServiceMember;
import com.bnpp.pf.digital.wiki.back.service.IServiceTeam;
import com.bnpp.pf.digital.wiki.back.service.ServiceFileUpload;

@RestController
@RequestMapping("/guideline-visitor")
public class GuidelineVisitor {
	private static final String LISTING_ERROR_MSG = "get list of guidelines is not possible please verify your database";

	private static final String GETTING_ERROR_MSG = "get this guideline is not possible please verify your database";
	
	
	
	@Autowired
	private IServiceGuideline serviceGuideline;
	
	@Autowired
	private ServiceFileUpload fileService;


	public GuidelineVisitor() {

	}

	@RequestMapping(method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<?> getAll() {

		try {
			List<Guideline> guidelines = serviceGuideline.findAll();
			return new ResponseEntity<List<Guideline>>(guidelines, HttpStatus.OK);
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
			Guideline guideline = serviceGuideline.getById(id);
			return new ResponseEntity<Guideline>(guideline, HttpStatus.OK);
		} catch (DataAccessException e) {
			return new ResponseEntity<WikiError>(new WikiError(GETTING_ERROR_MSG), HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			return new ResponseEntity<WikiError>(new WikiError(GETTING_ERROR_MSG), HttpStatus.BAD_REQUEST);
		}

	}
	
	 @RequestMapping(value = "/download/{id}", method = RequestMethod.GET, produces = "application/jpg")
	    public @ResponseBody Resource download(@PathVariable("id") int id, HttpServletResponse response) throws FileNotFoundException {
	        
		 	File file = fileService.getFile(serviceGuideline.getById(id).getFile());
		 	
		 	MimetypesFileTypeMap mimetypesFileTypeMap = new MimetypesFileTypeMap();
		 	String contentType = mimetypesFileTypeMap.getContentType(file);
			response.setContentType(contentType);
	        response.setHeader("Content-Disposition", "inline; filename=" + file.getName());
	        response.setHeader("Content-Length", String.valueOf(file.length()));
	        return new FileSystemResource(file);
	    }
}

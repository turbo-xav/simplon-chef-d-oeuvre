package com.bnpp.pf.digital.wiki.back.controller;

import java.io.InputStream;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.bnpp.pf.digital.wiki.back.entity.Guideline;
import com.bnpp.pf.digital.wiki.back.service.IServiceGuideline;

//@CrossOrigin(origins = { "http://localhost:4200", "*" })
//@CrossOrigin(maxAge = 3600)
@RestController
@RequestMapping("/guideline")
public class GuidelineController {

	private static final String LISTING_ERROR_MSG = "get list of guidelines is not possible, please verify your database.";

	private static final String GETTING_ERROR_MSG = "get this guideline is not possible, please verify your database.";

	private static final String DELETING_BY_ID_ERROR_MSG = "delete this guideline is not possible, please verify your database.";

	private static final String CREATING_ERROR_MSG = "creating this guideline is not possible, please verify your database.";

	private static final String UPDATING_ERROR_MSG = "updating this guideline is not possible, please verify your database.";

	private static final String CREATING_INTERITY_ERROR_MSG = "creating this guideline is not possible, please verify if you are not create an exiting guideline.";

	private static final String UPDATING_INTERITY_ERROR_MSG = "updating this guideline is not possible, please verify if you are not update a guideline with the same name.";

	private static final String CREATING_DATA_ACCESS_ERROR_MSG = "creating this guideline is not possible, please verify your datas.";

	private static final String UPDATING_DATA_ACCESS_ERROR_MSG = "updating this guideline is not possible, please verify your datas.";

	private static final String MISSING_NAME_ERROR_MSG = "please specify the name of this guideline.";

	@Autowired
	private IServiceGuideline serviceGuideline;

	public GuidelineController() {

	}

	@RequestMapping(method = RequestMethod.GET)
	// @ResponseStatus(code=HttpStatus.OK)
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

	@RequestMapping(path = "{id}", method = RequestMethod.DELETE)
	@ResponseBody
	// @Transactional
	public ResponseEntity<?> deleteById(@PathVariable("id") int id) {
		try {
			serviceGuideline.deleteById(id);
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
	public ResponseEntity<?> update(@RequestBody Guideline guideline, @RequestParam("file") MultipartFile multipartFile) {
		try {

			if (guideline.getName().isEmpty()) {
				return new ResponseEntity<WikiError>(new WikiError(MISSING_NAME_ERROR_MSG), HttpStatus.BAD_REQUEST);
			} else {
				guideline = serviceGuideline.save(guideline);
				// guideline.getUser().getRole().getId();
				return new ResponseEntity<Integer>(guideline.getId(), HttpStatus.OK);

			}

		} catch (DataIntegrityViolationException e) {
			return new ResponseEntity<WikiError>(new WikiError(UPDATING_INTERITY_ERROR_MSG), HttpStatus.BAD_REQUEST);
		} catch (DataAccessException e) {
			return new ResponseEntity<WikiError>(new WikiError(UPDATING_DATA_ACCESS_ERROR_MSG), HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
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
	public ResponseEntity<?> insert(@RequestBody Guideline guideline) {
		try {
			if (guideline.getName().isEmpty()) {
				return new ResponseEntity<WikiError>(new WikiError(MISSING_NAME_ERROR_MSG), HttpStatus.BAD_REQUEST);
			} else {
				guideline = serviceGuideline.save(guideline);
				return new ResponseEntity<Integer>(guideline.getId(), HttpStatus.OK);

			}
		} catch (DataIntegrityViolationException e) {
			return new ResponseEntity<WikiError>(new WikiError(CREATING_INTERITY_ERROR_MSG), HttpStatus.BAD_REQUEST);
		} catch (DataAccessException e) {
			return new ResponseEntity<WikiError>(new WikiError(CREATING_DATA_ACCESS_ERROR_MSG), HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			return new ResponseEntity<WikiError>(new WikiError(CREATING_ERROR_MSG), HttpStatus.BAD_REQUEST);
		}
	}

}

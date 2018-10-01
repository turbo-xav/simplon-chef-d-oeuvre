package com.bnpp.pf.digital.wiki.back.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.bnpp.pf.digital.wiki.back.entity.Diagnostic;
import com.bnpp.pf.digital.wiki.back.entity.Server;
import com.bnpp.pf.digital.wiki.back.service.IserviceDiagnostic;
import com.bnpp.pf.digital.wiki.back.service.ServiceDiagnostic;

@RestController
@RequestMapping("/diagnostic")
public class DiagnosticController {

	private static final String LISTING_ERROR_MSG = "Get list of diagnostics is not possible, please verify your database.";

	private static final String GETTING_ERROR_MSG = "Get this diagnostic is not possible, please verify your database.";

	private static final String DELETING_BY_ID_ERROR_MSG = "Delete this diagnostic is not possible, please verify your database.";

	private static final String CREATING_ERROR_MSG = "Creating this diagnostic is not possible, please verify your database.";

	private static final String UPDATING_ERROR_MSG = "Updating this diagnostic is not possible, please verify your database.";

	private static final String CREATING_INTERITY_ERROR_MSG = "Creating this diagnostic is not possible, please verify if you are not create an exiting diagnostic.";

	private static final String UPDATING_INTERITY_ERROR_MSG = "Updating this diagnostic is not possible, please verify if you are not update a diagnostic with the same name.";

	private static final String CREATING_DATA_ACCESS_ERROR_MSG = "Creating this diagnostic is not possible, please verify your datas.";

	private static final String UPDATING_DATA_ACCESS_ERROR_MSG = "Updating this diagnostic is not possible, please verify your datas.";

	private static final String MISSING_NAME_ERROR_MSG = "Please specify the name of this diagnostic.";

	@Autowired
	private IserviceDiagnostic serviceDiagnostic;

	
	@RequestMapping(path = "getDiagnosticsWithParameters", method = RequestMethod.GET)
	@ResponseBody
	
	public ResponseEntity<?> getDiagnosticsWithParameters(@RequestParam("appId") String appId , @RequestParam("envId") String envId, @RequestParam("layerId") String layerId, @RequestParam("serverId") String serverId ) {
		//try {
			 List<Diagnostic> diags = serviceDiagnostic.findByCriteria(appId, envId, layerId, serverId);
			
			return new ResponseEntity< List<Diagnostic>>(diags, HttpStatus.OK);
		/*} catch (DataAccessException e) {
			System.out.println(e.getStackTrace());
			return new ResponseEntity<WikiError>(new WikiError(GETTING_ERROR_MSG), HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			System.out.println(e.getStackTrace());
			return new ResponseEntity<WikiError>(new WikiError(GETTING_ERROR_MSG), HttpStatus.BAD_REQUEST);
		}*/
	}	
	
	
	
	@RequestMapping(method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<?> getAll() {

		try {
			List<Diagnostic> diagnostics = serviceDiagnostic.findAll();
			
			return new ResponseEntity<List<Diagnostic>>(diagnostics, HttpStatus.OK);
		} catch (DataAccessException e) {
			return new ResponseEntity<WikiError>(new WikiError(LISTING_ERROR_MSG), HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			return new ResponseEntity<WikiError>(new WikiError(LISTING_ERROR_MSG), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(path = "{id}", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<?> getById(@PathVariable("id") int id) {
		try {
			Diagnostic diagnostic = serviceDiagnostic.getById(id);
			return new ResponseEntity<Diagnostic>(diagnostic, HttpStatus.OK);
		} catch (DataAccessException e) {
			return new ResponseEntity<WikiError>(new WikiError(GETTING_ERROR_MSG), HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			return new ResponseEntity<WikiError>(new WikiError(GETTING_ERROR_MSG), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(path = "url/{url}", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<?> getByName(@PathVariable("url") String url) {
		try {
			List<Diagnostic> diagnostics = serviceDiagnostic.getByUrl(url);
			return new ResponseEntity<List<Diagnostic>>(diagnostics, HttpStatus.OK);
		} catch (DataAccessException e) {
			return new ResponseEntity<WikiError>(new WikiError(GETTING_ERROR_MSG), HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			return new ResponseEntity<WikiError>(new WikiError(GETTING_ERROR_MSG), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(path = "{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public ResponseEntity<?> deleteById(@PathVariable("id") int id) {
		try {
			serviceDiagnostic.deleteById(id);
			return new ResponseEntity<Integer>(id, HttpStatus.OK);
		} catch (DataAccessException e) {
			return new ResponseEntity<WikiError>(new WikiError(DELETING_BY_ID_ERROR_MSG), HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			return new ResponseEntity<WikiError>(new WikiError(DELETING_BY_ID_ERROR_MSG), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<?> insert(@RequestBody Diagnostic diagnostic) {
		try {
			if (diagnostic.getUrl().isEmpty()) {
				return new ResponseEntity<WikiError>(new WikiError(MISSING_NAME_ERROR_MSG), HttpStatus.BAD_REQUEST);
			} else {
				diagnostic = serviceDiagnostic.save(diagnostic);
				return new ResponseEntity<Diagnostic>(diagnostic, HttpStatus.OK);
			}
		} catch (DataIntegrityViolationException e) {
			return new ResponseEntity<WikiError>(new WikiError(CREATING_INTERITY_ERROR_MSG), HttpStatus.BAD_REQUEST);
		} catch (DataAccessException e) {
			return new ResponseEntity<WikiError>(new WikiError(CREATING_DATA_ACCESS_ERROR_MSG), HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			return new ResponseEntity<WikiError>(new WikiError(CREATING_ERROR_MSG), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(method = RequestMethod.PUT)
	@ResponseBody
	public ResponseEntity<?> update(@RequestBody Diagnostic diagnostic) {
		try {
			if (diagnostic.getUrl().isEmpty()) {
				return new ResponseEntity<WikiError>(new WikiError(MISSING_NAME_ERROR_MSG), HttpStatus.BAD_REQUEST);
			} else {
				diagnostic = serviceDiagnostic.save(diagnostic);
				return new ResponseEntity<Diagnostic>(diagnostic, HttpStatus.OK);
			}

		} catch (DataIntegrityViolationException e) {
			return new ResponseEntity<WikiError>(new WikiError(UPDATING_INTERITY_ERROR_MSG), HttpStatus.BAD_REQUEST);
		} catch (DataAccessException e) {
			return new ResponseEntity<WikiError>(new WikiError(UPDATING_DATA_ACCESS_ERROR_MSG), HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			return new ResponseEntity<WikiError>(new WikiError(UPDATING_ERROR_MSG), HttpStatus.BAD_REQUEST);
		}

	}

}

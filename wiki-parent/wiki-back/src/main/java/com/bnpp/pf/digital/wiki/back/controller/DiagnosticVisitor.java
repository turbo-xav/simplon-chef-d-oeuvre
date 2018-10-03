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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.bnpp.pf.digital.wiki.back.entity.Application;
import com.bnpp.pf.digital.wiki.back.entity.Diagnostic;
import com.bnpp.pf.digital.wiki.back.entity.Environ;
import com.bnpp.pf.digital.wiki.back.entity.Function;
import com.bnpp.pf.digital.wiki.back.entity.Guideline;
import com.bnpp.pf.digital.wiki.back.entity.Layer;
import com.bnpp.pf.digital.wiki.back.entity.Member;
import com.bnpp.pf.digital.wiki.back.entity.Server;
import com.bnpp.pf.digital.wiki.back.entity.Team;
import com.bnpp.pf.digital.wiki.back.exception.FunctionnalException;
import com.bnpp.pf.digital.wiki.back.exception.TechnicalException;
import com.bnpp.pf.digital.wiki.back.service.IServiceApplication;
import com.bnpp.pf.digital.wiki.back.service.IServiceEnviron;
import com.bnpp.pf.digital.wiki.back.service.IServiceFunction;
import com.bnpp.pf.digital.wiki.back.service.IServiceGuideline;
import com.bnpp.pf.digital.wiki.back.service.IServiceLayer;
import com.bnpp.pf.digital.wiki.back.service.IServiceMember;
import com.bnpp.pf.digital.wiki.back.service.IServiceServer;
import com.bnpp.pf.digital.wiki.back.service.IServiceTeam;
import com.bnpp.pf.digital.wiki.back.service.IserviceDiagnostic;
import com.bnpp.pf.digital.wiki.back.service.ServiceFileUpload;

@RestController
@RequestMapping("/diagnostic-visitor")
public class DiagnosticVisitor {
	private static final String LISTING_ERROR_MSG = "get list of diganostics is not possible please verify your database";

	private static final String GETTING_ERROR_MSG = "get this diganostic is not possible please verify your database";
	
	private static final String LISTING_APPLICATION_ERROR_MSG = "get list of applications is not possible please verify your database";
	
	private static final String LISTING_ENVIRON_ERROR_MSG = "get list of environments is not possible please verify your database";
	
	private static final String LISTING_LAYER_ERROR_MSG = "get list of layers is not possible please verify your database";
	
	private static final String LISTING_SERVER_ERROR_MSG = "get list of servers is not possible please verify your database";
	
	
	@Autowired
	private IserviceDiagnostic serviceDiagnostic;
	
	@Autowired
	private IServiceApplication serviceApplication;
	
	@Autowired
	private IServiceEnviron serviceEnviron;
	
	@Autowired
	private IServiceLayer serviceLayer;
	
	@Autowired
	private IServiceServer serviceServer;

	public DiagnosticVisitor() {

	}
	
	@RequestMapping(path = "application",method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<?> getAllApplications() {

		try {
			List<Application> applications = serviceApplication.findAll();
			return new ResponseEntity<List<Application>>(applications, HttpStatus.OK);
		} catch (DataAccessException e) {
			return new ResponseEntity<WikiError>(new WikiError(LISTING_APPLICATION_ERROR_MSG), HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			return new ResponseEntity<WikiError>(new WikiError(LISTING_APPLICATION_ERROR_MSG), HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(path = "environment",method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<?> getAllEnvironments() {

		try {
			List<Environ> environs = serviceEnviron.findAll();
			return new ResponseEntity<List<Environ>>(environs, HttpStatus.OK);
		} catch (DataAccessException e) {
			return new ResponseEntity<WikiError>(new WikiError(LISTING_ENVIRON_ERROR_MSG), HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			return new ResponseEntity<WikiError>(new WikiError(LISTING_ENVIRON_ERROR_MSG), HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(path = "layer",method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<?> getAllLayers() {

		try {
			List<Layer> layers = serviceLayer.findAll();
			return new ResponseEntity<List<Layer>>(layers, HttpStatus.OK);
		} catch (DataAccessException e) {
			return new ResponseEntity<WikiError>(new WikiError(LISTING_LAYER_ERROR_MSG), HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			return new ResponseEntity<WikiError>(new WikiError(LISTING_LAYER_ERROR_MSG), HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(path = "server",method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<?> getAllServers() {

		try {
			List<Server> servers = serviceServer.findAll();
			return new ResponseEntity<List<Server>>(servers, HttpStatus.OK);
		} catch (DataAccessException e) {
			return new ResponseEntity<WikiError>(new WikiError(LISTING_SERVER_ERROR_MSG), HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			return new ResponseEntity<WikiError>(new WikiError(LISTING_SERVER_ERROR_MSG), HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(path = "getDiagnosticsWithParameters", method = RequestMethod.GET)
	@ResponseBody	
	public ResponseEntity<?> getDiagnosticsWithParameters(@RequestParam("appId") String appId , @RequestParam("envId") String envId, @RequestParam("layerId") String layerId, @RequestParam("serverId") String serverId ) {
		try {
			 List<Diagnostic> diags = serviceDiagnostic.findByCriteria(appId, envId, layerId, serverId);
			
			return new ResponseEntity< List<Diagnostic>>(diags, HttpStatus.OK);
		} catch (DataAccessException e) {
			System.out.println(e.getStackTrace());
			return new ResponseEntity<WikiError>(new WikiError(GETTING_ERROR_MSG), HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			System.out.println(e.getStackTrace());
			return new ResponseEntity<WikiError>(new WikiError(GETTING_ERROR_MSG), HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(path = "getEnvironnmentsByApplication/{applicationId}",method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<?> getEnvironnmentsByApplication(@PathVariable("applicationId") int applicationId) {
		try {
			List<Environ> environs = serviceEnviron.getEnvironnmentsByApplication(applicationId);
			return new ResponseEntity<List<Environ>>(environs, HttpStatus.OK);
		} catch (DataAccessException e) {
			return new ResponseEntity<WikiError>(new WikiError(LISTING_ERROR_MSG), HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			return new ResponseEntity<WikiError>(new WikiError(LISTING_ERROR_MSG), HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(path = "getLayersByEnviron/{id}",method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<?> getLayersByEnviron(@PathVariable("id") int id) {

		try {
			List<Layer> layers = serviceEnviron.getLayersByEnviron(serviceEnviron.getById(id));
			return new ResponseEntity<List<Layer>>(layers, HttpStatus.OK);
		} catch (DataAccessException e) {
			return new ResponseEntity<WikiError>(new WikiError(LISTING_ERROR_MSG), HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			return new ResponseEntity<WikiError>(new WikiError(LISTING_ERROR_MSG), HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(path = "getServersByLayer/{id}",method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<?> getServersByLayer(@PathVariable("id") int id) {

		try {
			List<Server> servers = serviceLayer.getServersByLayer(serviceLayer.getById(id));
			return new ResponseEntity<List<Server>>(servers, HttpStatus.OK);
		} catch (DataAccessException e) {
			return new ResponseEntity<WikiError>(new WikiError(LISTING_ERROR_MSG), HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			return new ResponseEntity<WikiError>(new WikiError(LISTING_ERROR_MSG), HttpStatus.BAD_REQUEST);
		}
	}	
	
}

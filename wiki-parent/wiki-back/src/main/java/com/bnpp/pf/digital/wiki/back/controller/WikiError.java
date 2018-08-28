package com.bnpp.pf.digital.wiki.back.controller;

import java.util.HashMap;
import java.util.Map;

import org.hibernate.type.descriptor.java.ArrayMutabilityPlan;

public class WikiError {

	private String msg = "";
	
	private Map<String, String> errors; 

	public WikiError(String msg) {
		super();
		this.msg = msg;
		this.errors = new HashMap<String,String>();
	}
	
	public void addError(String key, String errorMsg) {
		this.errors.put(key, errorMsg);
	}

	public Map<String, String> getErrors() {
		return errors;
	}

	public void setErrors(Map<String, String> errors) {
		this.errors = errors;
	}

	/**
	 * @return the msg
	 */
	public String getMsg() {
		return msg;
	}

	/**
	 * @param msg the msg to set
	 */
	public void setMsg(String msg) {
		this.msg = msg;
	}
}

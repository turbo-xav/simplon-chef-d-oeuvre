package com.bnpp.pf.digital.wiki.back.exception;

public class FunctionnalException extends Exception {

	public static enum TECHNICAL_EXCEPTION_TYPE {
		DB_ERROR			,
		FUNCTIONAL_ERROR
	};
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public FunctionnalException() {
		super();
		// TODO Auto-generated constructor stub
	}

	public FunctionnalException(String message, Throwable cause, boolean enableSuppression,
			boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
		// TODO Auto-generated constructor stub
	}

	public FunctionnalException(String message, Throwable cause) {
		super(message, cause);
		// TODO Auto-generated constructor stub
	}

	public FunctionnalException(String message) {
		super(message);
		// TODO Auto-generated constructor stub
	}

	public FunctionnalException(Throwable cause) {
		super(cause);
		// TODO Auto-generated constructor stub
	}
	
	

}

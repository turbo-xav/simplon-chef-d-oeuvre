package com.bnpp.pf.digital.wiki.back.exception;

public class TechnicalException extends Exception {

	public static enum TECHNICAL_EXCEPTION_TYPE {
		DB_ERROR			,
		TECHNICAL_ERROR
	};
	
	private TECHNICAL_EXCEPTION_TYPE type;
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public TechnicalException() {
		super();
		// TODO Auto-generated constructor stub
	}

	public TechnicalException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
		// TODO Auto-generated constructor stub
	}

	public TechnicalException(String message, Throwable cause) {
		super(message, cause);
		// TODO Auto-generated constructor stub
	}

	public TechnicalException(String message) {
		super(message);
		// TODO Auto-generated constructor stub
	}

	public TechnicalException(TECHNICAL_EXCEPTION_TYPE type, Throwable cause) {
		super(cause);
		this.type = type;
		// TODO Auto-generated constructor stub
	}

	/**
	 * @return the type
	 */
	public TECHNICAL_EXCEPTION_TYPE getType() {
		return type;
	}

	/**
	 * @param type the type to set
	 */
	public void setType(TECHNICAL_EXCEPTION_TYPE type) {
		this.type = type;
	}
	
	

}

package com.bnpp.pf.digital.wiki.back.aop;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.JoinPoint.StaticPart;

public class MonLogger {
	
	// Cette m�thode est appel�e � chaque fois (et avant) qu'une m�thode du package ew.service est intercept�e 
	  public void logMethodEntry(JoinPoint joinPoint) {
	    
	    Object[] args = joinPoint.getArgs();

	    // Nom de la m�thode intercept�e
	    String name = joinPoint.getSignature().toLongString();
	    StringBuffer sb = new StringBuffer(name + " called with: [");

	    // Liste des valeurs des arguments re�us par la m�thode
	    for(int i = 0; i < args.length; i++) {
	      Object o = args[i];
	      sb.append("'"+o+"'");
	      sb.append((i == args.length - 1) ? "" : ", ");
	    }
	    sb.append("]");
	    
	    System.out.println(sb);
	  }

	  // Cette m�thode est appel�e � chaque fois (et apr�s) qu'une m�thode du package ew.service est intercept�e 
	  // Elle re�oit en argument 'result' qui est le retour de la m�thode intercept�e
	  public void logMethodExit(StaticPart staticPart, Object result) {
	  
	    // Nom de la m�thode intercept�e
	    String name = staticPart.getSignature().toLongString();
	  
	    System.out.println(name + " returning: [" + result + "]");
	  }

}

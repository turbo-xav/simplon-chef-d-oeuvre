package com.bnpp.pf.digital.wiki.back.service;

import java.security.MessageDigest;

/**
 * 
 * @author <xavier.tagliarino@cetelem.fr>
 *
 */

public class ServiceCrypt {
	
	private String salt = "turboxav";
	
	/**
	  * 
	  * @param base : string to crypt with SHA
	  * @return
	  */
	
	private String cryptSha256(String base) {
		try{
	        
			MessageDigest digest = MessageDigest.getInstance("SHA-256");
	        byte[] hash = digest.digest(base.getBytes("UTF-8"));
	        StringBuffer hexString = new StringBuffer();

	        for (int i = 0; i < hash.length; i++) {
	            String hex = Integer.toHexString(0xff & hash[i]);
	            if(hex.length() == 1) hexString.append('0');
	            hexString.append(hex);
	        }

	        return hexString.toString();
	    } catch(Exception ex){
	       throw new RuntimeException(ex);
	    }
	}
	
	/**
	 * 
	 * @param str
	 * @return
	 */
	
	public String crypt(String valueToCrypt) {
		return this.cryptSha256(this.salt)+this.cryptSha256(valueToCrypt);
	}
	
}

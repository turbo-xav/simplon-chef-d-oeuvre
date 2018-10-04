package com.bnpp.pf.digital.wiki.back.service;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Properties;

public class PropertyLoader {

	/**
	 * Charge la liste des propri�t�s contenu dans le fichier sp�cifi�
	 *
	 * @param filename
	 *            le fichier contenant les propri�t�s
	 * @return un objet Properties contenant les propri�t�s du fichier
	 */
	public Properties load() {
		Properties properties = new Properties();

		try {
			properties.load(getClass().getResourceAsStream("/conf.properties"));
		} catch (IOException e) {
			e.printStackTrace();
		}

		return properties;
	}
}
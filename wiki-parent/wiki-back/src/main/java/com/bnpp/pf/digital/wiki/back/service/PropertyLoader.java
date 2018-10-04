package com.bnpp.pf.digital.wiki.back.service;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Properties;

public class PropertyLoader {

	/**
	 * Charge la liste des propriétés contenu dans le fichier spécifié
	 *
	 * @param filename
	 *            le fichier contenant les propriétés
	 * @return un objet Properties contenant les propriétés du fichier
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
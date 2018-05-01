/**
 * Useful methods for Tera development
 * and Skill Prediction
 * by SaltyMonkey 
 */
"use strict";

const fs = require("fs");
const path = require("path");

const fontRegex = /<FONT>(.*?)<\/FONT>/g;

function isIterable(obj) {
	if (obj == null) return false;
	if (
		typeof obj === "object" &&
		typeof obj[Symbol.iterator] === "function"
	) return true;
	return false;
}

function* flatten(iterable) {
	for (const value of iterable) {
		if (isIterable(value)) yield* flatten(value);
		else yield value;
	}
}

function _search(parents, child, results, keyToSearch) {
	for (const [k, v] of Object.entries(child)) {
		if (typeof v === "object") {
			if (v != null && !parents.has(v)) {
				parents.add(v);
				try {
					_search(parents, v, results, keyToSearch);
				} catch (err) { /* empty */ }
			}
			if (keyToSearch === k)
				results[results.length] = Object.keys(v);
		}
	}
}

class Utilities {

	/**
	 * Extract string contents of chat messages.
	 * @param {String} raw
	 * @returns {Array}
	 */
	static getClearString(raw) {
		try { return fontRegex.exec(raw); }
		catch (up) { throw up; }
		finally { fontRegex.lastIndex = 0; }
	}

	/**
	 * Flatten iterable objects
	 * @param {Object|Array} list
	 * @returns {Array}
	 */
	static getFlatArray(list) {
		if (isIterable(list)) return [...flatten(list)];
		return [];
	}

	/**
	 * Recursively look for properties whose name matches the second argument.
	 * @param {Object} root
	 * @param {String} keyToSearch
	 * @returns {Array}
	 */
	static getDataFromObjectByField(root, keyToSearch) {
		const parents = new Set().add(root);
		const results = [];
		if (typeof root === "object" && root != null)
			_search(parents, root, results, keyToSearch);
		return results;
	}

	/**
	 * Trim a string, convert to lowercase then split using space as delimiter.
	 * @param {String} string
	 * @returns {Array}
	 */
	static splitString(string) {
		return [...string.trim().toLowerCase().split(" ")];
	}

	/**
	 * Load Json from full path, return onject.
	 * @param {String} path 
	 * @returns {Object||false}
	 */
	static loadJson(path) {
		try { return JSON.parse(fs.readFileSync(path, "utf8")); }
		catch (err) { return null; }
	}

	/**
	 * Resolve file path by __dirname
	 * @param string path parts
	 * @returns {String} resolved absolute path 
	 */
	static getFullPath(str) {
		return path.resolve(__dirname, str);
	}

	/**
	 * 
	 * @param {Object} obj 
	 * @param {String} path 
	 * @returns {Void|false}
	 */
	static saveJson(obj, path) {
		try { fs.writeFileSync(path, JSON.stringify(obj, null, "\t")); }
		catch (err) { return false; }
	}

	/**
	 * Save raw object in file 
	 * @param {Object} obj object to save
	 * @param {String} path absolute path for file
	 */
	static SaveDataInFile(obj, path) {
		fs.writeFileSync(path, obj);
	}

	/**
	 * 
	 * @param {Number} templateId Tera's templateId
	 * @returns {Number} game class id
	 */
	static getRaceFromTemplate(templateId) {
		return (templateId - 10101) / 100 | 0;
	}

	/**
	 * Convert templateId into class
	 * @param {Number} templateId
	 * @returns {Number}
	 */
	static getClassFromTemplate(templateId) {
		return (templateId - 10101) % 100 | 0;
	}


	/**
	 * Compare field in objects
	 * @param {Object} obj1
	 * @param {Object} obj2
	 * @param {String} field
	 * @returns {boolean}
	 */
	static compareFieldInObjects(obj1, obj2, field) {
		return obj1[field] === obj2[field];
	}

	/**
	 * Return the properties of obj2 that are different fom obj1.
	 * @param {Object} obj1
	 * @param {Object} obj2
	 * @returns {Array}
	 */
	static compareFieldsInObjects(obj1, obj2) {
		const diff = {};
		for (const [key, value] of Object.entries(obj2)) {
			if (Object.is(obj1[key], value)) continue;
			diff[key] = value;
		}
		return diff;
	}

	/**
	 * Simple file remove by absolute path
	 * @param {String} path 
	 */
	static removeFileSync(path) {
		fs.unlinkSync(path);
	}

	/**
	 * Simple file/folder delete by absolute path
	 * @param {String} path - full path to dir or file
	 */
	static removeByPath(path) {
		try {
			if (!fs.lstatSync(path).isDirectory()) {
				fs.unlinkSync(path);
				return;
			}
			for (const file of fs.readdirSync(path)) {
				fs.unlinkSync(file);
			}
			fs.rmdirSync(path);
		} catch (err) { /* empty */ }
	}

	/**
	 * Converts from radians to stringified degrees
	 * @param {Number} w - radians
	 */
	static degrees(w) {
		return Math.round(w / Math.PI * 180) + "\xb0";
	}

	/**
	 * Round number n to p decimal precision
	 * @param {Number} n
	 * @param {Number} p
	 * @returns {Number}
	 */
	static decimal(n, p) {
		p = 10 ** p;
		return Math.round(n * p) / p;
	}

	/* eslint-disable no-console */

	/**
	 * Write formatted log message in console
	 * @param {String} message
	 */
	static writeLogMessage(...message) {
		console.log(`[SkillPrediction]`, ...message);
	}

	/**
	 * Write formatted warning message in console
	 * @param {String} message
	 */
	static writeWarningMessage(...message) {
		console.log(`[SkillPrediction] WARNING!`, ...message);
	}

	/**
	 * Write formatted error message in console
	 * @param {String} message
	 */
	static writeErrorMessage(...message) {
		console.error(`[SkillPrediction] ERROR!`, ...message);
	}

	/**
	 * Write formatted debug message in console
	 * @param {String} message
	 */
	static writeDebugMessage(...message) {
		console.log(`[${String(Date.now() % 10000).padStart(4, 0)}]`, ...message);
	}

}

module.exports = Utilities;

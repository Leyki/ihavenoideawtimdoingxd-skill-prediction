/**
 * Useful methods for Tera development
 * and Skill Prediction
 * by SaltyMonkey 
 */
"use strict";

const fs = require("fs");
const path = require("path");
const { PI, round: mathRound } = Math;
const { is: objectIs, entries: objectEntries, keys: objectKeys } = Object;
const { stringify: jsonStringify, parse: jsonParse } = JSON;
const { push: arrayPush } = Array.prototype;

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
	for (const [k, v] of objectEntries(child)) {
		if (typeof v === "object") {
			if (v != null && !parents.has(v)) {
				parents.add(v);
				try {
					_search(parents, v, results, keyToSearch);
				} catch (err) { /* empty */ }
			}
			if (keyToSearch === k)
				results[results.length] = objectKeys(v);
		}
	}
}

class Utilities {

	/**
	 * Extract string contents of chat messages
	 * @param {string} raw
	 * @returns {Array<string>}
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
	 * Recursively look for properties whose name matches the second argument
	 * @param {Object} root
	 * @param {string} keyToSearch
	 * @returns {Array<Array<string>>}
	 */
	static getDataFromObjectByField(root, keyToSearch) {
		const parents = new Set().add(root);
		const results = [];
		if (typeof root === "object" && root != null)
			_search(parents, root, results, keyToSearch);
		return results;
	}

	/**
	 * Trim a string, convert to lowercase then split using space as delimiter
	 * @param {string} string
	 * @returns {Array<string>}
	 */
	static splitString(string) {
		return string.trim().toLowerCase().split(" ");
	}

	/**
	 * Load Json from full path, return onject
	 * @param {string} path 
	 * @returns {?Object}
	 */
	static loadJson(path) {
		try { return jsonParse(fs.readFileSync(path, "utf8")); }
		catch (err) { return null; }
	}

	/**
	 * Resolve file path by __dirname
	 * @param string path parts
	 * @returns {string} resolved absolute path 
	 */
	static getFullPath(str) {
		return path.resolve(__dirname, str);
	}

	/**
	 * Write the object as JSON to the specified path, if an error occurs, false is returned
	 * @param {Object} obj 
	 * @param {string} path absolute path for JSON file
	 * @returns {undefined|boolean}
	 */
	static saveJson(obj, path) {
		try { fs.writeFileSync(path, jsonStringify(obj, null, "\t")); }
		catch (err) { return false; }
	}

	/**
	 * Write the object to the specified path
	 * @param {Object} obj
	 * @param {string} path absolute path
	 */
	static saveDataInFile(obj, path) {
		fs.writeFileSync(path, obj);
	}

	/**
	 * Extract the race identifier from a template id
	 * @param {number} templateId
	 * @returns {number}
	 */
	static getRaceFromTemplate(templateId) {
		return (templateId - 10101) / 100 | 0;
	}

	/**
	 * Extract the class identifier from a template id
	 * @param {number} templateId
	 * @returns {number}
	 */
	static getClassFromTemplate(templateId) {
		return (templateId - 10101) % 100 | 0;
	}


	/**
	 * Compare field in objects
	 * @param {Object} obj1
	 * @param {Object} obj2
	 * @param {string} field
	 * @returns {boolean}
	 */
	static compareFieldInObjects(obj1, obj2, field) {
		return obj1[field] === obj2[field];
	}

	/**
	 * Return the properties of obj2 that are different fom obj1
	 * @param {Object} obj1
	 * @param {Object} obj2
	 * @returns {Object}
	 */
	static compareFieldsInObjects(obj1, obj2) {
		const diff = {};
		for (const [key, value] of objectEntries(obj2)) {
			if (objectIs(obj1[key], value)) continue;
			diff[key] = value;
		}
		return diff;
	}

	/**
	 * Delete the file at the path specified
	 * @param {string} path 
	 */
	static removeFileSync(path) {
		fs.unlinkSync(path);
	}

	/**
	 * Delete the file or folder at the path specified
	 * @param {string} _path full path to dir or file
	 */
	static removeByPath(_path) {
		try {
			if (!fs.lstatSync(_path).isDirectory()) {
				fs.unlinkSync(_path);
				return;
			}
			for (const file of fs.readdirSync(_path)) {
				Utilities.removeByPath(path.join(_path, file));
			}
			fs.rmdirSync(_path);
		} catch (err) { /* empty */ }
	}

	/**
	 * Converts from radians to stringified degrees
	 * @param {number} w radians
	 */
	static degrees(w) {
		return mathRound(w / PI * 180) + "\xb0";
	}

	/**
	 * Round number n to p decimal precision
	 * @param {number} n
	 * @param {number} p
	 * @returns {number}
	 */
	static decimal(n, p) {
		p = 10 ** p;
		return mathRound(n * p) / p;
	}

	/* eslint-disable no-console, no-unused-vars */

	/**
	 * Write formatted log message in console
	 * @param {...string} [messages]
	 */
	static writeLogMessage(messages) {
		const line = ["[SkillPrediction]"];
		arrayPush.apply(line, arguments);
		console.log.apply(undefined, line);
	}

	/**
	 * Write formatted warning message in console
	 * @param {...string} [messages]
	 */
	static writeWarningMessage(messages) {
		const line = ["[SkillPrediction] WARNING!"];
		arrayPush.apply(line, arguments);
		console.log.apply(undefined, line);
	}

	/**
	 * Write formatted error message in console
	 * @param {...string} [messages]
	 */
	static writeErrorMessage(messages) {
		const line = ["[SkillPrediction] ERROR!"];
		arrayPush.apply(line, arguments);
		console.log.apply(undefined, line);
	}

	/**
	 * Write formatted debug message in console
	 * @param {...string} [messages]
	 */
	static writeDebugMessage(messages) {
		const line = [`[${String(Date.now() % 10000).padStart(4, 0)}]`];
		arrayPush.apply(line, arguments);
		console.log.apply(undefined, line);
	}

}

module.exports = Utilities;

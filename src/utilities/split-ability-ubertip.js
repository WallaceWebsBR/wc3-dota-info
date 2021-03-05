/**
 * Splits ability ubertip which normally has multiple string arguments split by commas
 * Returns the values in an array form without the wrapping quotes
 * The regex is a bit of a modified one from this StackOverflow answer:
 * https://stackoverflow.com/a/11458596/6943553
 * @param {string} input The input ubertip
 * @returns {array} Array of strings without the wrapping quotes
 */

export default function splitAbilityUbertip(input) {
	const splitRegex = /("([^"]*)")|[^,]+/g;

	return input.match(splitRegex).map(text => text.slice(1, text.length - 1));
}
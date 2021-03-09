/**
 * Parses WC3 string values into an array of strings and JSX elements.
 * Turns `|n` into a <br> element and `|c ... |r` into a <span> element with the respective color
 * Also handles malformed color tags that have `|n` inside `|c` or `|c` that has no closing `|r`
 * @param {string} input WC3 string to parse
 * @return {array} Array of strings and JSX elements
 */

import { h } from 'preact';

export default function parseWC3String(input) {
	let i = 0, buffer = '', output = [];

	while (i < input.length) {
		if (input[i] === '|') {
			if (buffer) output.push(buffer);

			buffer = '';
			i++;
			
			if (input[i] === 'n') {
				output.push(<br />);
				i++;
			}

			else if (input[i] === 'c') {
				const colorTagContents = [], rgbHex = input.slice(i + 3, i += 9);
				let inlineText = '', insideAColorTag = true;

				while (insideAColorTag) {
					if (input[i] === '|' || i === input.length - 1) {
						if (inlineText) colorTagContents.push(inlineText);

						i++;
						
						if (input[i] === 'c' || input[i] === 'r' || i === input.length) {
							output.push(
								<span style={{ color: `#${rgbHex}` }}>
									{colorTagContents}
								</span>
							);

							insideAColorTag = false;
							i = input[i] === 'r' ? ++i : --i;
						}

						else if (input[i] === 'n') {
							colorTagContents.push(<br />);
							inlineText = '';
							i++;
						}
					} 
					
					else {
						inlineText += input[i++];
					}
				}
			}
			
			continue;
		}

		buffer += input[i++];
	}

	if (buffer.length) output.push(buffer)
	
	return output
}

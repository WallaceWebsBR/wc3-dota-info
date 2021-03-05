/**
 * Check if an element is out of the viewport
 * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param {Node} element The element to check
 * @return {Object} A set of booleans for each side of the element
 */
export default function isOutOfViewport (element) {
	// Get element's bounding rectangle
	const bounds = element.getBoundingClientRect();
	// Check if it's out of the viewport on each side
	const out = {};

	out.top = bounds.top < 0;
	out.left = bounds.left < 0;
	out.bottom = bounds.bottom > window.innerHeight;
	out.right = bounds.right > window.innerWidth;
	out.any = out.top || out.left || out.bottom || out.right;
	out.all = out.top && out.left && out.bottom && out.right;

	return out;
}
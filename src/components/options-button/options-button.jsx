import { h, options } from 'preact';

import './options-button.scss';

const OptionsButton = ({ children, hotkey, href = null, disabled = false, ...otherProps }) => {
	const hotkeyIndex = hotkey ? children.toLowerCase().indexOf(hotkey.toLowerCase()) : null;
	const contents = hotkey ? [
		children.slice(0, hotkeyIndex),
		<span class="options-button-hotkey">
			{children[hotkeyIndex]}
		</span>,
		children.slice(hotkeyIndex + 1)
	] : children;

	return href
		?	<a class={`options-button ${disabled && "disabled"}`} href={href} target="_blank" {...otherProps}>
				{contents}
			</a>
		: <button class={`options-button ${disabled && "disabled"}`} {...otherProps}>
				{contents}
			</button>
};

export default OptionsButton;
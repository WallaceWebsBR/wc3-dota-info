import { h } from 'preact';

import './esc-menu-backdrop.scss';

const EscMenuBackdrop = ({ children }) => (
	<div class="esc-menu-backdrop">
		{children}
	</div>
);

export default EscMenuBackdrop;
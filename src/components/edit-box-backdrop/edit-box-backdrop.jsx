import { h } from 'preact';

import './edit-box-backdrop.scss';

const EditBoxBackdrop = ({ children, ...otherProps }) => (
	<div class="editbox-backdrop" {...otherProps}>
		{children}
	</div>
);

export default EditBoxBackdrop;
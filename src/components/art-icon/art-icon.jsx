import { h } from 'preact';

import './art-icon.scss';

const ArtIcon = ({ art = '', fromMap = false, name = '', selected = false, mapVersion, requestWebp = true, ...otherProps }) => {
	const RESOURCE_SERVER = import.meta.env.SNOWPACK_PUBLIC_RESOURCE_SERVER
	const urlQueryString = `?map=${mapVersion}${requestWebp ? '&webp=true' : ""}`
	const artUrl = `${RESOURCE_SERVER}/${art.replace('\\', '/')}${urlQueryString}`

	return (
		<div class={`icon-container ${selected ? "selected" : ""}`} {...otherProps}>
			<img src={artUrl} alt={name} class="icon" />
		</div>
	);
};

export default ArtIcon;
import { h, Fragment } from 'preact'

import './hero-primary-attribute.scss'

const HeroPrimaryAttribute = ({ primary }) => {
	let iconSrc, attributeName

	switch (primary) {
		case "STR": 
			iconSrc = "/assets/textures/infocard-str.png"
			attributeName = "Strength"
		break;
		case "AGI":
			iconSrc = "/assets/textures/infocard-agi.png"
			attributeName = "Agility"
		break;
		case "INT":
			iconSrc = "/assets/textures/infocard-int.png"
			attributeName = "Intelligence"
		break;
		default:
			console.error("Invalid primary attribute value:", primary)
			return null
	}

	return <>
		<h2 class="data-label">Primary Atrribute</h2>
		<div class="hero-primary-attribute">
			<img src={iconSrc} alt={primary} />
			<span>{attributeName}</span>
		</div>
	</>
}

export default HeroPrimaryAttribute
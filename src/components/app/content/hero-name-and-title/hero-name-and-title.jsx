import { h, Fragment } from 'preact'

import './hero-name-and-title.scss'

const HeroNameAndTitle = ({ properName, name }) => (
	<>
		<h1 class="hero-name">
			{properName}
		</h1>
		<p class="hero-title">
			{name}
		</p>
	</>
)

export default HeroNameAndTitle
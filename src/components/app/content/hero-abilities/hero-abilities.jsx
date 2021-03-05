import { h, Fragment } from 'preact'
import ArtIcon from '../../../art-icon';

import './hero-abilities.scss'

const HeroAbilities = ({ abilities, mapVersion, setHoveredData }) => (
	<>
		<h2 class="data-label">Abilities</h2>
		<div class="hero-abilities">
		{
			Object.values(abilities).map(ability => {
				const { art, name } = ability
				return (
					<ArtIcon
						art={art}
						name={name}
						mapVersion={mapVersion}
						onmouseover={() => setHoveredData(ability)}
						onmouseleave={() => setHoveredData(null)}
					/>
				)
			})
		}
		</div>
	</>
)

export default HeroAbilities
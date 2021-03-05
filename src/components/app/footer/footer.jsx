import { h } from 'preact';

import Tooltip from '../../tooltip'
import FooterHeroes from './footer-heroes'

import parseWC3String from '../../../utilities/parse-wc3-string'

import './footer.scss';

const Footer = ({ view, id, setId, mapVersion, data, hoveredData, setHoveredData }) => {
	
	return (
		<div class="footer">
			<div class="container">
			{
				view === "heroes" && data?.heroes
				? <FooterHeroes 
						data={data} 
						mapVersion={mapVersion}
						selectedId={id}
						setId={setId} 
						setHoveredData={setHoveredData} 
					/>
				: null
			}
			{
				hoveredData !== null &&
				<Tooltip 
					name={hoveredData.name}
					hotkey={hoveredData.researchhotkey}
					resource={hoveredData.researchubertip ? null : { amount: 250, type: 'gold' }} 
					isVisible
				>
					{parseWC3String(hoveredData.researchubertip ? hoveredData.researchubertip : hoveredData.ubertip)}
				</Tooltip>
			}
			</div>
		</div>
	);
};

export default Footer;
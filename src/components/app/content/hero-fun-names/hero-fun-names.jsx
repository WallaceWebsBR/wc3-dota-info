import { h } from 'preact'

import parseWC3String from '../../../../utilities/parse-wc3-string'

import './hero-fun-names.scss'

const HeroFunNames = ({ funNames }) => (
	(funNames.length > 0) &&
	<div class="hero-fun-names">
		<h2 class="data-label">
			Alternate / Fun Name{funNames.length > 1 && 's'}
		</h2>
		<p>
		{
			funNames.map((funName, i) => (
				[i > 0 && ', ',	parseWC3String(funName)]
			))
		}
		</p>
	</div>
)

export default HeroFunNames
import { h } from 'preact';

import './header.scss';

import OptionsSelect from '../../options-select';

const Header = ({ themes, theme, setTheme, mapIndex, mapList, setMap, views, viewIndex, setViewIndex }) => {
	const mapVersions = mapList.length ? mapList : ['Loading...']
	return (
		<div class="header">
			<div class="container">
				<div class="group">
					<span class="title">DotA Wiki - RGC</span>
				</div>
				<div class="group">
					<OptionsSelect label="Version" options={mapVersions} valueIndex={mapIndex || 0} setValueIndex={setMap} disabled={!mapList.length} />
					<OptionsSelect label="View" options={views} valueIndex={viewIndex} setValueIndex={setViewIndex} />
					<OptionsSelect label="Theme" options={themes} valueIndex={theme} setValueIndex={setTheme} />
				</div>
			</div>
		</div>
	)
}

export default Header
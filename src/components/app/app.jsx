import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

import Header from './header';
import Footer from './footer';
import Content from './content';

import capitalizeFirstChar from '../../utilities/capitalize-first-char'

import './app.scss';

export default function App() {
	const RESOURCE_SERVER = import.meta.env.SNOWPACK_PUBLIC_RESOURCE_SERVER
	const SENTINELS_THEME = 0
	const HEROES_VIEW = 0

	const themes = [
		{ 
			name: "Sentinels (Night Elf)", 
			class: "sentinels-theme", 
			sceneColor: [5, 15, 5].map(c => c / 255) 
		}, 
		{ 
			name: "Scourge (Undead)", 
			class: "scourge-theme", 
			sceneColor: [15, 5, 15].map(c => c / 255)
		}
	]

	const views = [
		"heroes",
		// "items" // coming soon...
	]

	const [ mapList, setMapList ] = useState([])
	const [ mapIndex, setMapIndex ] = useState(null);
	const [ data, setData ] = useState({});
	const [ id, setId ] = useState('');
	const [ viewIndex, setViewIndex ] = useState(HEROES_VIEW);
	const [ theme, setTheme ] = useState(SENTINELS_THEME)
	const [ hoveredData, setHoveredData ] = useState(null)
	
	const mapVersion = mapIndex !== null ? mapList[mapIndex] : null
	const view = views[viewIndex]
	const sceneColor = themes[theme].sceneColor
	const themeClass = themes[theme].class
	const backdropClass = Object.keys(data).length ? "dark-backdrop" : ""

	const loadMapData = async () => {
		const mapDataResponse = await fetch(`${RESOURCE_SERVER}/data.json?map=${mapVersion}`)
		const mapData = await mapDataResponse.json()
		
		return setData(mapData)
	};

	const loadMapList = async () => {
		const mapListResponse = await fetch(RESOURCE_SERVER)
		const mapList = await mapListResponse.json()

		if (mapList.length && !mapIndex) {
			setMapIndex(0)
		}

		setMapList(mapList)
	}

	useEffect(() => {
		loadMapList()
	}, [])

	useEffect(() => {
		if (mapIndex !== null) {
			loadMapData()
		}
	}, [mapIndex])

	// Set to selected id to the first one every time the data or view changes
	useEffect(() => {
		if (Object.keys(data).length) {
			const [ firstHeroId ] = Object.keys(data[view])
			setId(firstHeroId)
		}
	}, [data, view])
	
	return (
		<div class={`app ${themeClass} ${backdropClass}`}>
			<Header 
				mapList={mapList}
				mapIndex={mapIndex}
				setMap={setMapIndex}
				themes={themes.map(({name}) => name)} 
				theme={theme} 
				setTheme={setTheme}
				viewIndex={viewIndex}
				views={views.map(view => capitalizeFirstChar(view))}
				setViewIndex={setViewIndex}
			/>
			<Content 
				selectedId={id} 
				mapVersion={mapVersion} 
				data={data} 
				view={view} 
				sceneColor={sceneColor} 
				setHoveredData={setHoveredData}
			/>
			<Footer 
				view={view}
				data={data}
				id={id}
				setId={setId} 
				mapVersion={mapVersion}
				hoveredData={hoveredData}
				setHoveredData={setHoveredData}
			/>
		</div>
	);
}
import { h } from 'preact'
import { useState, useMemo } from 'preact/hooks'

import OptionsSelect from '../../../options-select'

import HeroList from './hero-list'
import HeroSearch from './hero-search'

import './footer-heroes.scss'

const FooterHeroes = ({ data, mapVersion, selectedId, setId, setHoveredData }) => {
	const [ group, setGroup ] = useState(0)
	const [ sort, setSort ] = useState(0)
	const [ search, setSearch ] = useState("")
	const [ order, setOrder ] = useState(0)

	const groups = useMemo(() => {
		const none = {
			name: "(None)",
			values: {
				all: { name: "All Heroes", heroes: Object.keys(data.heroes)	}
			}
		}

		const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('')
		const alphabetNames = {
			name: "Alphabet (Title)",
			values: Object.keys(data.heroes).reduce((acc, id) => {
				const firstChar = data.heroes[id].name.charAt(0)
				
				acc[firstChar].heroes.push(id)

				return acc
			}, Object.fromEntries(alphabets.map(letter => (
				[letter, { name: letter, heroes: [] }]
			))))
		}
		const alphabetTitles = {
			name: "Alphabet (Name)",
			values: Object.keys(data.heroes).reduce((acc, id) => {
				const firstChar = data.heroes[id].propernames[0].charAt(0)
				
				acc[firstChar].heroes.push(id)

				return acc
			}, Object.fromEntries(alphabets.map(letter => (
				[letter, { name: letter, heroes: [] }]
			))))
		}

		const taverns = {
			name: "Tavern",
			values: Object.values(data.taverns).map(
				({ name, sellunits }) => ({ name, heroes: sellunits })
			)
		}

		const primaryAttributes = { 
			name: "Primary Attribute",
			values: { 
				STR: { name: "Strength", heroes: [] }, 
				AGI: { name: "Agility", heroes: [] },  
				INT: { name: "Intelligence", heroes: [] }
			} 
		}
		
		const weaponTypes = { 
			name: "Weapon Type",
			values: {
				normal: { name: "Melee (Normal)", heroes: [] },
				missile: { name: "Ranged (Missile)", heroes: [] }
			}
		}

		const factions = { 
			name: "Faction",
			values: {
				0: { name: "Sentinels", heroes: [] },
				1: { name: "Scourge", heroes: [] }
			}
		}

		for (const heroId in data.heroes) {
			const { Primary, weapTp1, faction } = data.heroes[heroId]
			
			primaryAttributes.values[Primary].heroes.push(heroId)
			weaponTypes.values[weapTp1].heroes.push(heroId)
			factions.values[faction].heroes.push(heroId)
		}

		return [
			none,
			taverns,
			alphabetNames,
			alphabetTitles,
			primaryAttributes,
			weaponTypes,
			factions
		]
	}, [data])

	const sortFields = [
		{ name: "(None)" },
		{ name: "Name", field: "propernames" },
		{ name: "Title", field: "name" },
		{ name: "Strength", field: "STR" },
		{ name: "Agility", field: "AGI" },
		{ name: "Intelligence", field: "INT" },
		{ name: "Strength Growth", field: "STRplus" },
		{ name: "Agility Growth", field: "AGIplus" },
		{ name: "Intelligence Growth", field: "INTplus" },
		{ name: "Damage", field: "dmgplus1" },
		{ name: "Armor", field: "def" },
		{ name: "HP Regen", field: "regenHP" },
		{ name: "Mana Regen", field: "regenMana" },
		{ name: "Turn Rate", field: "turnRate" },
		{ name: "Base Attack Time", field: "cool1" },
		{ name: "Attack Range", field: "rangeN1" },
		{ name: "Attack Point", field: "dmgpt1" },
		{ name: "Movement Speed", field: "spd" },
		{ name: "Day Vision", field: "sight" },
		{ name: "Night Vision", field: "nsight" },
	]

	const sortOrders = [
		"Descending",
		"Ascending"
	]

	return (
		<div class="footer-heroes">
			<div class="footer-heroes-controls">
				<OptionsSelect 
					label="Sort By" 
					options={sortFields.map(({ name }) => name)} 
					setValueIndex={setSort} 
					valueIndex={sort} 
				/>
				<OptionsSelect 
					label="Sort Order" 
					options={sortOrders} 
					setValueIndex={setOrder} 
					valueIndex={order}
					disabled={!sort}
				/>
				<OptionsSelect 
					label="Group By" 
					options={groups.map(({ name }) => name)} 
					setValueIndex={setGroup} 
					valueIndex={group} 
				/>
				<HeroSearch search={search} setSearch={setSearch} />
			</div>
			<HeroList 
				mapVersion={mapVersion} 
				data={data} 
				setHoveredData={setHoveredData} 
				selectedId={selectedId}
				setId={setId}
				groups={groups} 
				group={group} 
				sortFields={sortFields} 
				sort={sort} 
				order={order}
				search={search}
			/>
		</div>
	)
}

export default FooterHeroes
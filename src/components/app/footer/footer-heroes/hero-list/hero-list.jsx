import { h } from 'preact';
import { useRef, useEffect } from 'preact/hooks';

import ArtIcon from '../../../../art-icon';
import EditBoxBackdrop from '../../../../edit-box-backdrop';

import './hero-list.scss';

const HeroList = ({ data, selectedId, setId, mapVersion, setHoveredData, groups, group, sortFields, sort, order, search }) => {
	let scrollThrottleTimer
	
	const selectedGroups = Object.values(groups[group].values)
	const iconListRef = useRef(null)
	const onWheelScroll = event => {
		// Makes vertical scroll of mouse wheel / track pad work horizontally
		// Disables hover on scroll while having a simple scroll event throttling
		// implementation so that it mimics the behavior of horizontal scroll
		if (event.deltaY) {
			event.preventDefault();

			if (scrollThrottleTimer) clearTimeout(scrollThrottleTimer);
			
			iconListRef.current.style.pointerEvents = 'none';
			iconListRef.current.scrollLeft += event.deltaY;

			scrollThrottleTimer = setTimeout(() => {
				iconListRef.current.style.pointerEvents = 'auto';
			}, 100);
		}
	};	

	const centerHero = (icon) => {
		iconListRef.current.style.pointerEvents = 'none';

		icon.scrollIntoView({
			behavior: 'smooth',
			inline: 'center',
			block: 'nearest'
		})

		setTimeout(() => {
			iconListRef.current.style.pointerEvents = 'auto';
		}, 500)
	}

	const onHeroSelect = id => event => {
		setId(id)
		centerHero(event.target)
	}


	// 
	// useEffect(() => {
	// 	const handleKeyPress = (selectedId, selectedGroups) => event => {
	// 		const heroesFlattened = selectedGroups.flatMap(group => group.heroes)
	// 		const heroesIndexHash = heroesFlattened.reduce((acc, val, i) => ({ ...acc, [val]: i }), {})
	// 		const key = event.key
			
	// 		switch (key) {
	// 			case 'ArrowLeft':
	// 				if (heroesIndexHash[selectedId] !== 0)
	// 				setId(heroesFlattened[heroesIndexHash[selectedId] - 1])
	// 				break
	// 			case 'ArrowRight':
	// 				if (heroesIndexHash[selectedId] !== heroesFlattened.length - 1)
	// 				setId(heroesFlattened[heroesIndexHash[selectedId] + 1])
	// 				break
	// 			default:
	// 				break
	// 		}
	// 	}

	// 	document.addEventListener('keydown', handleKeyPress(selectedId, selectedGroups))

	// 	return () => document.removeEventListener('keydown', handleKeyPress(selectedId, selectedGroups))
	// }, [group])

	const sortField = sortFields[sort].field
	
	return (
		<EditBoxBackdrop onwheel={onWheelScroll}>
			<div class="icon-list-container" ref={iconListRef}>
				{
					selectedGroups.map(group => {
						const groupHeroes = [...group.heroes]
						const sorted = sort > 0
							? groupHeroes.sort((a, b) => {
									const negator = order ? 1 : -1
									return (
										sort === 1 
											? (data.heroes[a][sortField][0] > data.heroes[b][sortField][0] ? 1 : -1) 
											: sort === 2
												? (data.heroes[a][sortField] > data.heroes[b][sortField] ? 1 : -1)
												: (data.heroes[a][sortField] - data.heroes[b][sortField])
									) * negator
								}) 
							: groupHeroes
							
						const filtered = search ? sorted.filter(heroId => {
							const { name, propernames } = data.heroes[heroId]

							const nameHit = name.toLowerCase().includes(search)
							const propernamesHit = propernames.some(propername => propername.toLowerCase().includes(search))

							return nameHit || propernamesHit
						}) : sorted
						
						return filtered.length ? (
							<div class="icon-group">
								<div class="icon-group-title">{group.name}</div>
								<div class="icon-list">
								{
									filtered.map(id => {
										const { art, name } = data.heroes[id]
										return (
											<ArtIcon
												key={id}
												mapVersion={mapVersion}
												onclick={event => onHeroSelect(id)(event)}
												onmouseover={() => setHoveredData(data.heroes[id])}
												onmouseleave={() => setHoveredData(null)}
												art={art}
												name={name}
												selected={id === selectedId}
											/>
										);
									})
								}
								</div>
							</div>
						) : null
					})
				}
			</div>
		</EditBoxBackdrop>
	)
};

export default HeroList;
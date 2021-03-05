import { h } from 'preact'

import './hero-search.scss'

const HeroSearch = ({ search, setSearch }) => {
	const handleChange = e => setSearch(e.target.value)
	
	return <div class="hero-search">
		<label>Search Hero</label>
		<input type="search" value={search} oninput={handleChange} />
	</div>
}

export default HeroSearch
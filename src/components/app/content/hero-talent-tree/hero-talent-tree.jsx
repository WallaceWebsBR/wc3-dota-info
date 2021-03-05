import { h, Fragment } from 'preact';

import EditBoxBackdrop from "../../../edit-box-backdrop"

import './hero-talent-tree.scss';

const HeroTalentTree = ({ talentTree }) => {
	const talentTreeEntries = Object.values(talentTree)
	const leftBranch = talentTreeEntries.slice(0, 4)
	const rightBranch = talentTreeEntries.slice(4)
	
	return <>
		<h2 class="data-label">Talent Tree</h2>
		<EditBoxBackdrop>
			<div class="hero-talent-tree">
				{
					[...Array(4)].map((_dummy, i) => (
						<div class="talent-branches">
							<div class="talent-level">
								{10 + i * 5}
							</div>
							<div class="left-branch">
								{leftBranch[i]}
							</div>
							<div class="right-branch">
								{rightBranch[i]}
							</div>
						</div>
					))
				}
			</div>
		</EditBoxBackdrop>
	</>
}

export default HeroTalentTree
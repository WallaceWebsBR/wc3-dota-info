import { h } from 'preact';

import HeroStats from './hero-stats';
import HeroFunNames from './hero-fun-names';
import HeroAbilities from './hero-abilities';
import HeroTalentTree from './hero-talent-tree';
import HeroModelViewer from './hero-model-viewer';
import HeroNameAndTitle from './hero-name-and-title';
import HeroPrimaryAttribute from './hero-primary-attribute';

import EscMenuBackdrop from '../../esc-menu-backdrop';

import './content.scss';

const Content = ({ data, selectedId, view, mapVersion, sceneColor, setHoveredData }) => {
	if (selectedId) {
		if (view === "heroes") {
			const selectedHero = data[view][selectedId];
			const { name, model, talentTree, propernames, abilities, ...heroStats } = selectedHero;
			const [ properName, ...funNames ]	= propernames;

			return (
				<div class="content">
					<div class="container">
						<EscMenuBackdrop>
							<article class="content-grid">
								<section>
									<HeroNameAndTitle properName={properName} name={name} />
									<HeroPrimaryAttribute primary={heroStats.Primary} />
									<HeroAbilities abilities={abilities} mapVersion={mapVersion} heroId={selectedId} setHoveredData={setHoveredData} />
									<HeroTalentTree talentTree={talentTree} />
									<HeroFunNames funNames={funNames} />
								</section>
								<section>
									<HeroStats heroStats={heroStats} miscData={data.miscData} />
								</section>
								<section>
									<HeroModelViewer modelParams={model} mapVersion={mapVersion} sceneColor={sceneColor} />
								</section>
							</article>
						</EscMenuBackdrop>
					</div>
				</div>
			);
		}
	}

	return <div>{null}</div>;
};

export default Content;
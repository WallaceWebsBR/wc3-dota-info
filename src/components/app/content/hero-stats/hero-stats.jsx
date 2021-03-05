import { h, Fragment } from "preact";
import { useState } from "preact/hooks";

import EditBoxBackdrop from '../../../edit-box-backdrop'
import OptionsSelect from '../../../options-select'

import './hero-stats.scss'

const HeroStats = ({ heroStats, miscData }) => {
	const [ statsView, setStatsView ] = useState(0) 
	const [ levelIndex, setLevelIndex ] = useState(0) 

	const levels = [...Array(Number(miscData.MaxHeroLevel)).keys()].map(n => n + 1)
	const attributeMultiplier = statsView === 0 ? 0 : levelIndex
	const changedClass = statsView === 0 ? {} : { class: "changed" }
	const attributeClass = statsView === 0 || levelIndex === 0 ? {} : { class: "changed" }

	const attributes = {
		STR: heroStats.STR + Math.floor(heroStats.STRplus * attributeMultiplier),
		AGI: heroStats.AGI + Math.floor(heroStats.AGIplus * attributeMultiplier),
		INT: heroStats.INT + Math.floor(heroStats.INTplus * attributeMultiplier),
	}

	const baseArmor = heroStats.def + miscData.AgiDefenseBase
	const baseMinDmg = heroStats.dmgplus1 + heroStats.dice1
	const baseMaxDmg = baseMinDmg - heroStats.dice1 + heroStats.dice1 * heroStats.sides1

	const armorWithBonus = baseArmor + (1/7 * attributes.AGI)
	const minDmgWithBonus = baseMinDmg + attributes[heroStats.Primary]
	const maxDmgWithBonus = baseMaxDmg + attributes[heroStats.Primary]
	const hpRegenWithBonus = heroStats.regenHP + miscData.StrRegenBonus * attributes.STR
	const manaRegenWithBonus = heroStats.regenMana + miscData.IntRegenBonus * attributes.INT
	const hpWithBonus = heroStats.HP + miscData.StrHitPointBonus * attributes.STR
	const manaWithBonus = heroStats.manaN + miscData.IntManaBonus * attributes.INT
	
	const armor = statsView === 0 ? baseArmor : Math.round(armorWithBonus * 10) / 10
	const damage = statsView === 0 ? `${baseMinDmg}–${baseMaxDmg}` : `${minDmgWithBonus}–${maxDmgWithBonus}`
	const hpRegen = statsView === 0 ? heroStats.regenHP : +(Math.round(hpRegenWithBonus + "e+2") + "e-2")
	const manaRegen = statsView === 0 ? heroStats.regenMana : +(Math.round(manaRegenWithBonus + "e+2") + "e-2")
	const hp = statsView === 0 ? heroStats.HP : hpWithBonus
	const mana = statsView === 0 ? heroStats.manaN : manaWithBonus

	const statsViewOptions = ['Base Stats', 'Stats With Attribute Bonus']
	
	return (
		<>
			<h2 class="data-label">Hero Stats</h2>
			<div class="hero-stats-controls">
				<OptionsSelect label="Stats View" options={statsViewOptions} valueIndex={statsView} setValueIndex={setStatsView} />
				<OptionsSelect label="Hero Level" options={levels} valueIndex={levelIndex} setValueIndex={setLevelIndex} disabled={statsView === 0} />
			</div>
			<EditBoxBackdrop>
				<div class="hero-stats">
					<div class="hero-stat-entry">
						<label>Strength</label>
						<div><span {...attributeClass}>{attributes.STR}</span> (+{heroStats.STRplus} per level)</div>
					</div>
					<div class="hero-stat-entry">
						<label>Agility</label>
						<div><span {...attributeClass}>{attributes.AGI}</span> (+{heroStats.AGIplus} per level)</div>
					</div>
					<div class="hero-stat-entry">
						<label>Intelligence</label>
						<div><span {...attributeClass}>{attributes.INT}</span> (+{heroStats.INTplus} per level)</div>
					</div>
					<div class="hero-stat-entry">
						<label>Weapon Type</label>
						<div>
						{
							heroStats.weapTp1 === "normal" 
							? "Melee / Normal" 
							: "Ranged / Missile"
						}
						</div>
					</div>
					<div class="hero-stat-entry">
						<label>Attack Range</label>
						<div>{heroStats.rangeN1}</div>
					</div>
					{
						heroStats.weapTp1 === "missile" &&
						<div class="hero-stat-entry">
							<label>Missile Speed</label>
							<div>{heroStats.missilespeed}</div>
						</div>
					}
					<div class="hero-stat-entry">
						<label>Attack Damage</label>
						<div {...changedClass}>{damage}</div>
					</div>
					<div class="hero-stat-entry">
						<label>Base Attack Time</label>
						<div>{heroStats.cool1}</div>
					</div>
					<div class="hero-stat-entry">
						<label>Attack Point / Backswing</label>
						<div>{heroStats.dmgpt1} / {heroStats.backSw1}</div>
					</div>
					<div class="hero-stat-entry">
						<label>Cast Point / Backswing</label>
						<div>{heroStats.castpt} / {heroStats.castbsw}</div>
					</div>
					<div class="hero-stat-entry">
						<label>Sight (Day / Night)</label>
						<div>{heroStats.sight} / {heroStats.nsight}</div>
					</div>
					<div class="hero-stat-entry">
						<label>Movement Speed</label>
						<div>{heroStats.spd}</div>
					</div>
					<div class="hero-stat-entry">
						<label>Turn Rate</label>
						<div>{heroStats.turnRate}</div>
					</div>
					<div class="hero-stat-entry">
						<label>Armor</label>
						<div {...changedClass}>{armor}</div>
					</div>
					<div class="hero-stat-entry">
						<label>HP</label>
						<div {...changedClass}>{hp}</div>
					</div>
					<div class="hero-stat-entry">
						<label>HP Regen</label>
						<div {...changedClass}>{hpRegen} per second</div>
					</div>
					<div class="hero-stat-entry">
						<label>Mana</label>
						<div {...changedClass}>{mana}</div>
					</div>
					<div class="hero-stat-entry">
						<label>Mana Regen</label>
						<div {...changedClass}>{manaRegen} per second</div>
					</div>
				</div>
			</EditBoxBackdrop>
		</>
	)
}

export default HeroStats
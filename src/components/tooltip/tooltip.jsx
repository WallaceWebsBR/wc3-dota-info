import { h } from 'preact';

import './tooltip.scss';

const Tooltip = ({ children, name, hotkey, resource = null, isVisible = false }) => {
	const hotkeyIndex = hotkey ? name.toLowerCase().indexOf(hotkey.toLowerCase()) : null
	
	name = hotkey
		? hotkeyIndex > -1
			? [
					name.slice(0, hotkeyIndex),
					<span class="tooltip-hotkey">
						{name[hotkeyIndex]}
					</span>,
					name.slice(hotkeyIndex + 1)
				] 
			: name = [
				`${name} [`,
				<span class="tooltip-hotkey">
					{hotkey}
				</span>,
				']'
			]
		: name
	
	return (
		<div class={isVisible ? 'tooltip tooltip-visible' : 'tooltip'}>
			{name ? <div class="tooltip-title">{name}</div> : ''}
			{
				resource !== null &&
				<div class="tooltip-resource">
					<img src={`/assets/textures/tooltip-${resource.type}.png`} alt={resource.type} class="resource-icon" />
					{` ${resource.amount}`}
				</div>
			}
			<div>{children}</div>
		</div>
	);
};

export default Tooltip;
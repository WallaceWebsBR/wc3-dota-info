import { h } from 'preact';
import { useState } from 'preact/hooks';

import OptionsSelect from '../../../../options-select';

import "./viewer-controls.scss"

const ViewerControls = ({ sequences, sequence = 0, onSequenceChange, onCameraViewChange, cameraView = 0 }) => {
	const cameraViews = ["Side View", "Portrait", "Free"]
	const sequenceOptions = sequences ? sequences.map(({ name }) => name) : ['Loading...']

	return (
		<div class="viewer-controls">
			<OptionsSelect 
				options={sequenceOptions} 
				setValueIndex={onSequenceChange}
				valueIndex={sequence}
				label="Animation"
				disabled={!sequences?.length}
			/>
			<OptionsSelect 
				options={cameraViews} 
				setValueIndex={onCameraViewChange}
				valueIndex={cameraView} 
				label="Camera"
			/>
		</div>
	)
};

export default ViewerControls;
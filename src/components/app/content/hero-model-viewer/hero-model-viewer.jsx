import { h } from 'preact';
import { useRef, useEffect, useState } from 'preact/hooks';

import ModelViewer from 'mdx-m3-viewer/dist/viewer'

import EditBoxBackdrop from "../../../edit-box-backdrop"
import ViewerControls from './viewer-controls'

import setupCamera from '../../../../utilities/camera'

import './hero-model-viewer.scss';

const HeroModelViewer = ({ modelParams, mapVersion, sceneColor }) => {
	const { file, modelScale, rgb, scale, moveHeight } = modelParams
	const [ sequence, setSequence ] = useState(0)
	const [ cameraView, setCameraView ] = useState(0)

	const resourceServer = import.meta.env.SNOWPACK_PUBLIC_RESOURCE_SERVER
	const forceUpdate = useState()[1].bind(null, {}) // for forcing rerenders
	const canvasRef = useRef(null)
	// used a `useRef` hook to store these values to persist across rerenders
	const refrigerator = useRef({ // the name, well, it's not used as a DOM reference but instead used for "storing" values. haha.. ha
		viewer: null,
		scene: null,
		unitInstance: null,
		portraitInstance: null
	})

	function pathSolver (src) {
		const resource = src.includes(".") ? src : src + ".mdx"
		
		return `${resourceServer}/${resource}?map=${mapVersion}`
	}

	function resolvePortrait (src) {
		const resource = src.includes(".") 
			? src.replace(/\.mdx$/i, "_portrait.mdx") 
			: src + "_portrait.mdx"
		
		return `${resourceServer}/${resource}?map=${mapVersion}`
	}

	function resolveTeamColors (src) {
		return `/assets/wc3-resources/${src}` 
	}

	async function loadModels (file) {
		const scene = refrigerator.current.scene
		const viewer = refrigerator.current.viewer
		const unitModel = await viewer.load(file, pathSolver)
		const portraitModel = await viewer.load(file, resolvePortrait)

		scene.clear()
		refrigerator.current.unitInstance = unitModel.addInstance()
		
		const unitInstance = refrigerator.current.unitInstance
		
		unitInstance.setScene(scene);
		unitInstance.setTeamColor(1);
		unitInstance.setSequenceLoopMode(2);
		unitInstance.setVertexColor(rgb.map(c => c / 255))
		
		if (portraitModel) {
			refrigerator.current.portraitInstance = portraitModel.addInstance()
			const portraitInstance = refrigerator.current.portraitInstance
		
			portraitInstance.setScene(scene);
			portraitInstance.setTeamColor(1);
			portraitInstance.setSequenceLoopMode(2);
			portraitInstance.setVertexColor(rgb.map(c => c / 255))
		} else if (refrigerator.current.portraitInstance) {
			refrigerator.current.portraitInstance.detach()
			refrigerator.current.portraitInstance = null
		}
		
		onCameraViewChange(cameraView)
	}

	function onCameraViewChange (newCameraView) {
		const scene = refrigerator.current.scene
		const unitInstance = refrigerator.current.unitInstance
		const portraitInstance = refrigerator.current.portraitInstance
		
		if (unitInstance) {
			const unitModel = unitInstance.model
			const portraitModel = portraitInstance?.model
			const firstStandSequence = unitModel.name === "EX_HeroMountainKing"
				? 13
				: unitModel.sequences.findIndex(({ name }) => name.toLowerCase().includes("stand"))

			scene.camera.reset()
			
			switch (newCameraView) {
				case 0: // Close-up
				case 2: // Free	
					const xAxisRotationOnlyOptions = {
						horizontalAngle: Math.PI / 1.5,
						verticalAngle: Math.PI / 2,
						distance: 330,
						lockVerticalRotate: true
					}
	
					unitInstance.setScale(scale)
					unitInstance.setUniformScale(modelScale)
					unitInstance.setLocation([0, 0, -100 + (moveHeight ? moveHeight / 2 : 0)]);
					unitInstance.setSequence(firstStandSequence);
					unitInstance.show()

					if (portraitInstance) portraitInstance.hide()
					
					setupCamera(scene, newCameraView === 0 ? xAxisRotationOnlyOptions : {})
					setSequence(firstStandSequence)
					
					break
				case 1: // Portrait
					const instance = portraitInstance ? portraitInstance : unitInstance
					const model = portraitInstance ? portraitModel : unitModel
					const portraitSequence = portraitInstance && newCameraView === 1
						? model.name === "HeroMountainKing_Portrait" 
							? 5
							: model.sequences.findIndex(({name}) => name.toLowerCase().includes("portrait"))
						: model.sequences.findIndex(({name}) => name.toLowerCase().includes("portrait"))

					if (model.cameras.length) {
						const { farClippingPlane, fieldOfView, nearClippingPlane, position, targetPosition } = model.cameras[0]
						const aspectRatio = canvasRef.current.width / canvasRef.current.height
						
						// Custom fieldOfView value from d07RiV's WC3 Data model viewer component
						// I don't really understand much but this seems to scale pretty well when used instead of the one in the portrait camera
						const scalableFoV = Math.atan(Math.tan(fieldOfView / 2) / aspectRatio) * 2
						
						instance.resetTransformation()
						instance.setSequence(portraitSequence === -1 ? 0 : portraitSequence)
						instance.recalculateTransformation()

						scene.camera.perspective(scalableFoV, aspectRatio, nearClippingPlane, farClippingPlane)
						scene.camera.moveToAndFace(position, targetPosition, [0, 0, 1])
					}
					
					if (portraitInstance) {
						unitInstance.hide()
						portraitInstance.show()
					} else {
						unitInstance.show()
					}
					
					setSequence(portraitSequence === -1 ? 0 : portraitSequence)

					break
				default:
					console.error("Invalid camera view index of " + newCameraView)
			}
		}

		forceUpdate() // force rerender
		setCameraView(newCameraView)
	}

	function onSequenceChange (sequence) {
		const instance = cameraView === 1 && refrigerator.current.portraitInstance 
			? refrigerator.current.portraitInstance
			: refrigerator.current.unitInstance
		
		instance.setSequence(sequence)
		setSequence(sequence)
	}

	useEffect(() => {
		canvasRef.current.height = 275

		refrigerator.current.viewer = new ModelViewer.ModelViewer(canvasRef.current)
		const viewer = refrigerator.current.viewer

		refrigerator.current.scene = viewer.addScene()
		const scene = refrigerator.current.scene

		scene.color = sceneColor
		
		viewer.on('error', console.error);
		viewer.addHandler(ModelViewer.handlers.mdx, resolveTeamColors)
		viewer.addHandler(ModelViewer.handlers.blp)
		
		loadModels(file);

		(function step() {
			requestAnimationFrame(step);
			if (canvasRef.current?.parentNode) {
				const bounds = canvasRef.current.parentNode.getBoundingClientRect()

				if (canvasRef.current?.width !== bounds.width) {
					canvasRef.current.width = bounds.width
					// canvasRef.current.height = bounds.width
					
					scene.viewport = [0, 0, bounds.width, bounds.height]
				}
			}
			viewer.updateAndRender();
		})();

		return () => viewer.clear()
	}, [])

	useEffect(() => {
		if (refrigerator.current.viewer) {
			loadModels(file);
		}
	}, [modelParams, mapVersion])

	useEffect(() => {
		if (refrigerator.current.viewer) {
			refrigerator.current.scene.color = sceneColor
		}
	}, [sceneColor])
	
	const sequences = cameraView === 1 && refrigerator.current.portraitInstance
		? refrigerator.current.portraitInstance?.model.sequences
		: refrigerator.current.unitInstance?.model.sequences
		
	return (
		<div class="hero-model-viewer">
			<EditBoxBackdrop>
				<div class="canvas-container">
					<canvas ref={canvasRef} />
				</div>
			</EditBoxBackdrop>
			<ViewerControls
				cameraView={cameraView} 
				sequences={sequences} 
				sequence={sequence}
				onCameraViewChange={onCameraViewChange}
				onSequenceChange={onSequenceChange}
			/>
		</div>
	);
};

export default HeroModelViewer;
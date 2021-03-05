import { h, Fragment } from 'preact';
import { useState, useRef, useEffect } from 'preact/hooks'

import isOutOfViewport from '../../utilities/is-out-of-viewport'

import './options-select.scss';

const OptionsSelect = ({ options = [], label, valueIndex, setValueIndex, disabled = false }) => {
	const [ isOpen, setIsOpen ] = useState(false);

	const optionsListRef = useRef(null);

	const handleTriggerClick = () => {
		if (!disabled) setIsOpen(!isOpen)
	}
	
	const handleSelectOptionClick = (i) => {
		setValueIndex(i)
		setIsOpen(false)
	}

	const handleOutsideEvent = (event) => {
		if (optionsListRef.current) {
			const isEventInside = optionsListRef.current.contains(event.target);
			if (!isEventInside) {
				setIsOpen(false)
			}
		}
	}

	useEffect(() => {
		if (isOpen) {
			const wrapper = optionsListRef.current.parentNode
			const wrapperBounds = wrapper.getBoundingClientRect()
			
			optionsListRef.current.style.top = wrapperBounds.bottom + "px"

			const dropdownBounds = optionsListRef.current.getBoundingClientRect()

			if (isOutOfViewport(optionsListRef.current).bottom) {
				const heightInsideViewport = window.innerHeight - dropdownBounds.top
				
				if (wrapperBounds.top > window.innerHeight / 2) {
					optionsListRef.current.style.top = ""
					optionsListRef.current.style.bottom = (heightInsideViewport + wrapperBounds.height) + "px"

					if (isOutOfViewport(optionsListRef.current).top) {
						const newDropdownBounds = optionsListRef.current.getBoundingClientRect()
						const newHeightInsideViewport = newDropdownBounds.height + newDropdownBounds.top

						optionsListRef.current.style.height = newHeightInsideViewport + "px"
					}
				} else {
					optionsListRef.current.style.height = heightInsideViewport + "px"
				}	
			}
			
			optionsListRef.current.style.width = Math.max(wrapperBounds.width, dropdownBounds.width) + "px"
			optionsListRef.current.style.visibility = "";
			
			document.addEventListener("mousedown", handleOutsideEvent, { once: true })
			document.addEventListener("wheel", handleOutsideEvent, { once: true })
		} else {
			optionsListRef.current.style.bottom = "";
			optionsListRef.current.style.height = "";
			optionsListRef.current.style.width = "";
			optionsListRef.current.style.visibility = "hidden";
		}
		
		return () => {
			document.removeEventListener("mousedown", handleOutsideEvent)
			document.removeEventListener("wheel", handleOutsideEvent)
		}
	}, [isOpen])

	return (
		<div class={`options-select ${disabled && "disabled"}`}>
			{ !!label && <label>{label}</label> }
			<select class="options-select-native" value={valueIndex} onchange={(e) => setValueIndex(Number(e.target.value))} disabled={disabled}>
			{
				options.map((text, i) => (
					<option value={i}>
						{text}
					</option>
				))
			}
			</select>
			<div class="options-select-custom">
				<div class="options-select-trigger" onclick={handleTriggerClick}>
					<div>{options[valueIndex]}</div>
				</div>
				<div class="options-select-dropdown" ref={optionsListRef} style={{ visibility: "hidden" }}>
				{
					options.map((text, i) => (
						<div onclick={() => handleSelectOptionClick(i)}>
							{text}
						</div>
					))
				}
				</div>
			</div>
		</div>
	)
};

export default OptionsSelect;
import React from 'react'
import {
	// FormInline, 
	Button,
	// Input
} from 'mdbreact'
import { UpdateIco } from '../../assets/svg'
import './GenerateSeedStep.css'

const GenerateSeedStep = ({
	onGenerateSeed,
	onGeneratePrivateKey,
	isShowSeedGenerateStep,
	seed
}) => {
	if (!isShowSeedGenerateStep) {
		return null
	}


	return (
		<div className='t-c seed-step'>
			<div className='title-seed-step generate-wallet-text'>Seed</div>
			{/* <Input type="text" value={seed ? seed : ''} /> */}
			{/* <textarea className='seed-textarea' >{seed ? seed : ''}</textarea> */}
			<div className='seed-words'>

				{/* <textarea className='seed-textarea'  disabled={false}>{seedWords}</textarea> */}
				<textarea className='seed-textarea' id='textareaSeed' defaultValue={seed ? seed : ''} />

				<div className='btn-generate-seed' onClick={
					() => {
						onGenerateSeed()
						const seedWords = seed ? seed : ''
						let seedTextarea = document.getElementById('textareaSeed')
						seedTextarea.value = seedWords;
						const animation = document.querySelector('.btn-generate-seed svg')
						animation.style.animation = 'btnSpinner 1s'
						setTimeout(() => { animation.style.animation = 'none' }, 1000)
					}}>
					<UpdateIco />
				</div>
			</div>

			{/* <Button className='' onClick={onGenerateSeed}>
				Generate seed again
			</Button> */}

			<Button className='next-step-btn seed-step-btn' onClick={onGeneratePrivateKey}>
				Next step >
			</Button>
		</div>
	)
}

export default GenerateSeedStep
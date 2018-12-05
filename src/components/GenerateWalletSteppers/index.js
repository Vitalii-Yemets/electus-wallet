import React from 'react';
import './GenerateWalletSteppers.css';

const GenerateWalletSteppers = () => {
	return (
		<ol className='generate-wallet-steppers'>
			<li className='step completed'>Step 1</li>
			<li className='step active'>Step 2</li>
			<li className='step'>Step 3</li>
		</ol>
	);
}

export default GenerateWalletSteppers;
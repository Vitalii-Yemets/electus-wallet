import React from 'react'
import Coin from '../Coin'
import { Button } from 'mdbreact'
import './CoinSelector.css'

const CoinSelector = ({
	coins,
	selectedCoin,
	onShowCoinDetails,
	// onOpenGenerateWalletModal,
	isShowCoinSelector,
	onShowCoinSelectorOnMobile,
	onCloseCoinSelectorOnMobile,
	onOpenDefaultWalletViewModal
}) => {
	if (!isShowCoinSelector) {
		return null
	}

	return (
		<div className='coin-selector'>
			<div className="coin-selector-default">
				{coins.map((coin, key) => {
					const coinProps = {
						coinInfo: coin,
						selectedCoin,
						onShowCoinDetails,
						isShowCoinSelector,
						onShowCoinSelectorOnMobile,
						onCloseCoinSelectorOnMobile
					}

					return <Coin key={key} {...coinProps} />
				})}
				<div className="sticki-btn">
					{/* onOpenGenerateWalletModal */}
					<Button onClick={onOpenDefaultWalletViewModal} className='toolbar-btn' rounded>
						&#43;
   					</Button>
				</div>
			</div>

		</div>
	);
};



export default CoinSelector
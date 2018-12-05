import React from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'mdbreact'
import './BlockchainMenu.css'

const BlockchainMenu = ({
	onSelectBlokchain,
	selectedBlokchain,
	availableBlockchains,
}) => {
	const blockchains = availableBlockchains.map((blockchain, key) => <DropdownItem onClick={event => onSelectBlokchain(event.currentTarget.textContent)} key={key}>{blockchain}</DropdownItem>)

	return (
		<Dropdown size='medium'>
			<div className='blockchains-dropdown'>
				<DropdownToggle caret>
					{selectedBlokchain ? selectedBlokchain : 'Chose yor option'}
				</DropdownToggle>
				<DropdownMenu >
					{blockchains}
				</DropdownMenu>
			</div>
		</Dropdown>
	)
}

export default BlockchainMenu
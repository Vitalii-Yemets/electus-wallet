import React from 'react'
import { NavLink } from 'react-router-dom'

import { WalletsIcon, SettingsIcon } from '../../assets/svg'
import './Menu.css';

const Menu = ({
	dialogIsOpen,
	closeMenu,
	selectedCoin
}) => (
		<div>
			<div className={dialogIsOpen ? 'menu mobile-menu' : 'menu desktop-menu'}>
				<div className='menu-items' onClick={closeMenu}>
					<div className="logo"></div>
					<div className="wrapper-menu">
						<div className="content-menu">
							<NavLink className='menu-item' to='/wallets' >
								<div className='menu-item-content'>
									<WalletsIcon /> wallets
         						</div>
							</NavLink>
						</div>
						<div className="footer-menu">
							<NavLink className='menu-item' to='/settings'>
								<div className='menu-item-content'>
									<SettingsIcon /> settings
          						</div>
							</NavLink>
						</div>
					</div>
				</div>
			</div>
			<div className="eclipse" onClick={closeMenu}></div>
		</div>
	)

export default Menu
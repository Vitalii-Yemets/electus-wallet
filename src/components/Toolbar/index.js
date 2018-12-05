// Core
import React from 'react';

// mdbreact
import {
	Navbar,
	NavbarNav,
	NavItem,
	Button,
	// Dropdown,
	// DropdownToggle,
	// DropdownMenu,
	// DropdownItem
} from 'mdbreact';

// Assets
import {
	MenuIcon,
	// DotMenuIcon
} from '../../assets/svg';

// Styles
import './Toolbar.css';

const Toolbar = ({
	openMenu,
	// keysUploadEventEmitter$
}) => (
		<Navbar className='toolbar'>
			<NavbarNav className='toolbar-group' left>
				<NavItem className='toolbar-group-item'>
					<Button className='toolbar-btn' onClick={openMenu} rounded>
						<MenuIcon />
					</Button>
					<h2>electus</h2>
				</NavItem>
			</NavbarNav>

			{/* <NavbarNav className='toolbar-group' right>
				<NavItem className='toolbar-group-item'>
					<Dropdown>
						<DropdownToggle className='toolbar-btn toolbar-dropdown-menu-toggle'>
							<DotMenuIcon />
						</DropdownToggle>
						<DropdownMenu className='toolbar-dropdown-menu' right>
							<DropdownItem className='toolbar-dropdown-menu-item toolbar-label'
								onClick={() => keysUploadEventEmitter$.next()}>
								upload wallets
		 					</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				</NavItem>
			</NavbarNav> */}
		</Navbar>
	);

export default Toolbar;


export const isTab = (el) => {
	return el.type && el.type.tabsRole === 'Tab';
};

export const isTabPanel = (el) => {
	return el.type && el.type.tabsRole === 'TabPanel';
};

export const isTabList = (el) => {
	return el.type && el.type.tabsRole === 'TabList';
};
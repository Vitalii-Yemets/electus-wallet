import { deepForEach } from './childrenDeepMap';
import { isTab, isTabPanel } from './elementTypes';

export const getTabsCount = children => {
	let tabCount = 0;
	deepForEach(children, child => {
		if (isTab(child)) tabCount++;
	});

	return tabCount;
};

export const getPanelsCount = children => {
	let panelCount = 0;
	deepForEach(children, child => {
		if (isTabPanel(child)) panelCount++;
	});

	return panelCount;
};

// Core
import PropTypes from 'prop-types';
import React, { cloneElement, Component } from 'react';

// 3-erd party 
import cx from 'classnames';

// Helpers
import uuid from '../helpers/uuid';
import { childrenPropType } from '../helpers/propTypes';
import { getPanelsCount, getTabsCount } from '../helpers/count';
import { deepMap } from '../helpers/childrenDeepMap';
import { isTabList, isTabPanel, isTab } from '../helpers/elementTypes';

const isTabNode = node => 'getAttribute' in node && node.getAttribute('role') === 'tab';
const isTabDisabled = node => node.getAttribute('aria-disabled') === 'true';

let canUseActiveElement;
try {
	canUseActiveElement = !!(
		typeof window !== 'undefined' &&
		window.document &&
		window.document.activeElement
	);
} catch (e) {
	canUseActiveElement = false;
}

class UncontrolledTabs extends Component {
	static defaultProps = {
		className: 'tabs',
		focus: false,
	};

	static propTypes = {
		children: childrenPropType,
		className: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.array,
			PropTypes.object,
		]),
		disabledTabClassName: PropTypes.string,
		domRef: PropTypes.func,
		focus: PropTypes.bool,
		forceRenderTabPanel: PropTypes.bool,
		onSelect: PropTypes.func.isRequired,
		selectedIndex: PropTypes.number.isRequired,
		selectedTabClassName: PropTypes.string,
		selectedTabPanelClassName: PropTypes.string,
	};

	tabNodes = [];

	setSelected = (index, event) => {
		if (index < 0 || index >= this.getTabsCount()) return;

		const { onSelect, selectedIndex } = this.props;

		onSelect(index, selectedIndex, event);
	}

	getNextTab = (index) => {
		const count = this.getTabsCount();

		for (let i = index + 1; i < count; i++) {
			if (!isTabDisabled(this.getTab(i))) {
				return i;
			}
		}

		for (let i = 0; i < index; i++) {
			if (!isTabDisabled(this.getTab(i))) {
				return i;
			}
		}

		return index;
	}

	getPrevTab = (index) => {
		let i = index;

		while (i--) {
			if (!isTabDisabled(this.getTab(i))) {
				return i;
			}
		}

		i = this.getTabsCount();
		while (i-- > index) {
			if (!isTabDisabled(this.getTab(i))) {
				return i;
			}
		}

		return index;
	}

	getFirstTab = () => {
		const count = this.getTabsCount();

		for (let i = 0; i < count; i++) {
			if (!isTabDisabled(this.getTab(i))) {
				return i;
			}
		}

		return null;
	}

	getLastTab = () => {
		let i = this.getTabsCount();

		while (i--) {
			if (!isTabDisabled(this.getTab(i))) {
				return i;
			}
		}

		return null;
	}

	getTabsCount = () => {
		const { children } = this.props;
		return getTabsCount(children);
	}

	getPanelsCount = () => {
		const { children } = this.props;
		return getPanelsCount(children);
	}

	getTab = index => {
		return this.tabNodes[`tabs-${index}`];
	}

	getChildren = () => {
		let index = 0;
		const {
			children,
			disabledTabClassName,
			focus,
			forceRenderTabPanel,
			selectedIndex,
			selectedTabClassName,
			selectedTabPanelClassName,
		} = this.props;

		this.tabIds = this.tabIds || [];
		this.panelIds = this.panelIds || [];
		let diff = this.tabIds.length - this.getTabsCount();

		while (diff++ < 0) {
			this.tabIds.push(uuid());
			this.panelIds.push(uuid());
		}

		return deepMap(children, child => {
			let result = child;

			if (isTabList(child)) {
				let listIndex = 0;

				let wasTabFocused = false;

				if (canUseActiveElement) {
					wasTabFocused = React.Children.toArray(child.props.children)
						.filter(isTab)
						.some((tab, i) => document.activeElement === this.getTab(i));
				}

				result = cloneElement(child, {
					children: deepMap(child.props.children, tab => {
						const key = `tabs-${listIndex}`;
						const selected = selectedIndex === listIndex;

						const props = {
							tabRef: node => {
								this.tabNodes[key] = node;
							},
							id: this.tabIds[listIndex],
							panelId: this.panelIds[listIndex],
							selected,
							focus: selected ? (focus || wasTabFocused) : undefined,
						};

						if (selectedTabClassName)
							props.selectedClassName = selectedTabClassName;
						if (disabledTabClassName)
							props.disabledClassName = disabledTabClassName;

						listIndex++;

						return cloneElement(tab, props);
					}),
				});
			} else if (isTabPanel(child)) {
				const props = {
					id: this.panelIds[index],
					tabId: this.tabIds[index],
					selected: selectedIndex === index,
				};

				if (forceRenderTabPanel) props.forceRender = forceRenderTabPanel;
				if (selectedTabPanelClassName)
					props.selectedClassName = selectedTabPanelClassName;

				index++;

				result = cloneElement(child, props);
			}

			return result;
		});
	}

	handleKeyDown = e => {
		if (this.isTabFromContainer(e.target)) {
			let { selectedIndex: index } = this.props;
			let preventDefault = false;
			let useSelectedIndex = false;

			if (e.keyCode === 32 || e.keyCode === 13) {
				preventDefault = true;
				useSelectedIndex = false;
				this.handleClick(e);
			}

			if (e.keyCode === 37 || e.keyCode === 38) {
				index = this.getPrevTab(index);
				preventDefault = true;
				useSelectedIndex = true;
			} else if (e.keyCode === 39 || e.keyCode === 40) {
				index = this.getNextTab(index);
				preventDefault = true;
				useSelectedIndex = true;
			} else if (e.keyCode === 35) {
				index = this.getLastTab();
				preventDefault = true;
				useSelectedIndex = true;
			} else if (e.keyCode === 36) {
				index = this.getFirstTab();
				preventDefault = true;
				useSelectedIndex = true;
			}

			if (preventDefault) {
				e.preventDefault();
			}

			if (useSelectedIndex) {
				this.setSelected(index, e);
			}
		}
	};

	handleClick = e => {
		let node = e.target;

		do {
			if (this.isTabFromContainer(node)) {
				if (isTabDisabled(node)) {
					return;
				}

				const index = [].slice
					.call(node.parentNode.children)
					.filter(isTabNode)
					.indexOf(node);
				this.setSelected(index, e);
				return;
			}
		} while ((node = node.parentNode) !== null);
	};

	isTabFromContainer = node => {
		if (!isTabNode(node)) {
			return false;
		}

		let nodeAncestor = node.parentElement;
		do {
			if (nodeAncestor === this.node) return true;
			if (nodeAncestor.getAttribute('data-tabs')) break;

			nodeAncestor = nodeAncestor.parentElement;
		} while (nodeAncestor);

		return false;
	}

	render = () => {
		const {
			children,
			className,
			disabledTabClassName,
			domRef,
			focus,
			forceRenderTabPanel,
			onSelect,
			selectedIndex,
			selectedTabClassName,
			selectedTabPanelClassName,
			...attributes
		} = this.props;

		return (
			<div
				{...attributes}
				className={cx(className)}
				onClick={this.handleClick}
				onKeyDown={this.handleKeyDown}
				ref={node => {
					this.node = node;
					if (domRef) domRef(node);
				}}
				data-tabs
			>
				{this.getChildren()}
			</div>
		);
	}
}

export default UncontrolledTabs;

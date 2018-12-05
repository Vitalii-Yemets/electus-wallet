// Core
import PropTypes from 'prop-types';
import React, { Component } from 'react';

// 3-erd party
import cx from 'classnames';

class TabList extends Component {
	static defaultProps = {
		className: 'tabs__tab-list',
	};

	static propTypes = {
		children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
		className: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.array,
			PropTypes.object,
		]),
	};

	render = () => {
		const { children, className, ...attributes } = this.props;

		return (
			<ul {...attributes} className={cx(className)} role="tablist">
				{children}
			</ul>
		);
	}
}

TabList.tabsRole = 'TabList';

export default TabList;

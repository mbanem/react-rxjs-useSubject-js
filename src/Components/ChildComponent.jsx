import React from 'react';
import PropTypes from 'prop-types';

export const ChildComponent = (props) => {
	return (
		<div className='child-component-button'>
			<button className='send-button'
				onClick={() =>
					props.setter({value: `${props.prefix.toUpperCase()} state value ${Math.floor(Math.random() * 10 ** 8)}`})
				}
			>
        {
          props.prefix
        } to send value to parent
			</button>
		</div>
	);
};
ChildComponent.propTypes = {
  setter: PropTypes.func,
  prefix: PropTypes.string
}
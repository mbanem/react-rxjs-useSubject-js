import React from 'react';
import '../Styles/index.scss';

import { subscriber } from '../utils/messageService';

export class ConsumerB extends React.Component {
  constructor() {
    super()
    this.state =  {counter:0}
  }
	componentDidMount() {
		subscriber.subscribe((val) => {
      let { counter } = this.state;
      counter = counter + val
			this.setState({counter});
		})
  };

  render() {
    let {counter}=this.state
    return (
      <div>
        <p>ConsumerB subscribes to a Subject to get increment/decrement events to adjust and display state counter</p>
        <div>CounterB {counter}</div>
      </div>
    );
  }
};
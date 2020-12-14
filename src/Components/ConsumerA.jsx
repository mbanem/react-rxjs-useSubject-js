import React from 'react';
import '../Styles/index.scss';

import { subscriber } from '../utils/messageService';

export class ConsumerA extends React.Component {
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
    let { counter } = this.state
    // this.props.setter(counter)
    return (
      <div>
        <p>ConsumerA subscribes to a Subject to get increment/decrement events to adjust and display state counter</p>
        <div>CounterA: {counter}</div>
      </div>
    );
  }
};
import React from 'react'
import { messageService } from '../utils/messageService';
import { ConsumerA } from './ConsumerA'
import '../Styles/index.scss'
export class ProducerA extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {counter:0}
  //   var setter = this.setter.bind(this)
  // }
  // setter(val) {
  //   console.log('parent setter val', val);
  //   this.setState({counter: val})
  // }
  render() {
    // var	setter	=	this.setter
    return (
      <div className='producer-container'>
        <h3>ProducerA</h3>
        <p>calls messageService(1) = Subject.next(1) to increment counter</p>
        {/* <ConsumerA setter={setter.bind(this)}/> */}
        <ConsumerA/>
        <button onClick={(e) => messageService(1)}>Increment Counter</button>
      </div>
    )
  }
};
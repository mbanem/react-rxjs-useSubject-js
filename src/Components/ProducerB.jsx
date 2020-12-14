import React from 'react'
import { messageService } from '../utils/messageService';
import { ConsumerB } from './ConsumerB'
import '../Styles/index.scss'
export class ProducerB extends React.Component {
  render() {
    return (
      <div className='producer-container'>
        <h3>ProducerB</h3>
        <p>calls messageService(1) = Subject.next(-1) to decrement counter</p>
        <ConsumerB/>
        <button onClick={(e) => messageService(-1)}>Decrement Counter</button>
      </div>
    )
  }
};
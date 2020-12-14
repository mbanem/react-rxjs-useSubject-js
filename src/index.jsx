import React from 'react';
import { render } from 'react-dom'
// import { ConsumerA } from './ConsumerA'
// import { ConsumerB } from './ConsumerB'
import { ProducerA } from './Components/ProducerA'
import { ProducerB } from './Components/ProducerB'
// import { ChildComponent } from './Components/ChildComponent'
import { ParentComponent } from './Components/ParentComponent'
import { ParentSubject } from './Subjects/ParentSubject'
import { ChildSubject } from './Subjects/ChildSubject'
import './Styles/index.scss';

export class App extends React.Component {
  render() {
    return (
      <div className='app-container'>
        <div className='producers-container'>
        <div className='notification'>Works with classes but not with Functional Components with useEffect and subscribe</div>
        <ProducerA />
        <ProducerB />
        </div>
        <ParentComponent />
        <div className='subjects-container'>
        <ChildSubject />
        <ParentSubject />
        <ChildSubject />
        </div>
      </div>
    )
  }
}

render(<App />, document.getElementById('root'));
## Producer and Container

There is a MessageService, which ProducerA/B sending increments 1 or -1 for counter, as

```html:
  <button
    onClick={(e) => messageService(1)}
  >
    Increment Counter
  </button>
```

where messageService actually just call Subject.next(msg)

```js:
    import { Subject } from 'rxjs';
    export const subscriber = new Subject(0);
    export const messageService = (msg) => {
    subscriber.next(msg);
```

The messageService is involved in order to hide Subject, as app will work just with subscriber.next(msg) instead of messageService(msg)

The Producer A and B actually have buttons for increment and decrement and call messageService(1) or message Service(-1).

Consumer A and B are classes as FC and useEffect do not work (fire nothing or fire in infinite loops) subscribe directly to subscriber (so messageService is circumvent), set state and then display it

```js:
  constructor() {
    super()
    this.state = {counter:0}
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
```

## ParentComponent & ChildComponent

ParentComponent relay on useSubject

```js:
  const counter = useSubject(subj)
```

to get counter value from it

```js:
export const useSubject = (subject) => {
    // state is initialized as undefined (empty value)
    const [state, setState] = useState();

    useEffect(() => {
        const subscription = subject.subscribe(setState);
        return () => subscription.unsubscribe();
    }, [subject]);

    return state;
};
```

The useSubject gets a Subject object as an argument and handle an internal state by subscribing to the Subject giving it the setState callback while returning the state to the caller, as the ParentComponent did it to get the counter.
Some other sources (ChildComponents) actually increment or decrement the Subject value, while ParentComponent displays its value.

ChildComponent is a FC that manages it local state and has button for incrementing and decrementing state counter value in sendCounter function that receive delta = 1 or -1, where new state is set and new state value is emit to subj a Subject held by the ParentSubject.

```js:
import { subj } from './ParentSubject'

export const ChildSubject = (props) => {
  const [state, setState] = useState(0)
  const sendCounter = (delta) =>{
    const newCount = state + delta
    setState(newCount)
    subj.next(newCount)
  }
  return (
    <div className='subject-child-container'>
      <p>OnClick ChildSubject increments/decrements local state and calls Subject.next(state) to broadcast to ParentSubjects</p>
      <button onClick={e=>sendCounter(1)}>Increment Counter</button>
      <button onClick={e=>sendCounter(-1)}>Decrement Counter</button>
    </div>
  )
}
```

## ParentSubject & ChildSubject

ParentSubject

```js:
import { Subject } from 'rxjs';
import { useSubject } from '../utils/UseSubject'

export const subj = new Subject(0)

export const ParentSubject = (props) => {
  const state = useSubject(subj)
  return (
    <div className='subject-parent-container'>
      <div>ParentSubject Component counter=useSubscribe to get and display counter</div>
      <div>{state}</div>
    </div>
  )
}
```

calls useSubject sending the subj, a Subject initiated component held by Parent and gets back a state object maintained locally by useSubject.

```js:
import { useState, useEffect } from 'react';
// takes an observable<string[]>, defines and returns a state
// and defines useEffect to subscribe/unsubscribe to the observable
// in order to consume observable items via setState callback
export const useSubject = (subject) => {
    // state is initialized as undefined (empty value)
    const [state, setState] = useState();

    useEffect(() => {
        const subscription = subject.subscribe(setState);
        return () => subscription.unsubscribe();
    }, [subject]);

    return state;
};
```

Here is FC useEffect works, but in ChildComponent it does not.
The ParentSubject gets new state maintained by useSubject and displays it, but ChildSubject triggers changes

```js:
import { subj } from './ParentSubject'

export const ChildSubject = (props) => {
  const [state, setState] = useState(0)
  const sendCounter = (delta) =>{
    const newState = state + delta
    setState(newState)
    subj.next(newState)
  }
  return (
    <div className='subject-child-container'>
      <p>OnClick ChildSubject increments/decrements local state and calls Subject.next(state) to broadcast to ParentSubjects</p>
      <button onClick={e=>sendCounter(1)}>Increment Counter</button>
      <button onClick={e=>sendCounter(-1)}>Decrement Counter</button>
    </div>
  )
}
```

by maintaining its internal state and emitting its value to Subject that ParentSubject held via

```js:
  subj.next(newState)
```

Parent holds internal state and several children can manage the parent's state but still several children cannot use parent state as when one child triggers change the other children are not notified to refresh.

## Note

In order to layout elements there were too many scss styles involved with not enough studying of how to layout them.

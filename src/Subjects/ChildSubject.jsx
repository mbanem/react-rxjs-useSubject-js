import React, { useState, useEffect } from 'react';
import { subj } from './ParentSubject'
import { useSubject } from '../utils/UseSubject'
import { localState } from './ParentSubject'

export const ChildSubject = (props) => {
  const [refresh, setRefresh] = useState(false)
  const state = useSubject(subj)
  let tf=false
  useEffect(()=>{
    tf = !refresh
    setRefresh(tf)
  },[localState, state])
  // const [state, setState] = useState(0)
  const manageCounter = (delta) =>{
    const newCount = state + delta
    subj.next(newCount)
  }
  return (
    <div className='subject-child-container'>
      <p>OnClick ChildSubject increments/decrements local state and calls Subject.next(state) to broadcast to ParentSubjects</p>
  <p>state: {localState} {refresh.toString()}</p>
      <button onClick={e=>manageCounter(1)}>Increment Counter</button>
      <button onClick={e=>manageCounter(-1)}>Decrement Counter</button>
    </div>
  )
}
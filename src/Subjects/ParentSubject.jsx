import React from 'react';
import { Subject } from 'rxjs';
import { useSubject } from '../utils/UseSubject'

export const subj = new Subject(0)

export let localState = 0
export const getLocalState = () =>{
  return localState
}
export const ParentSubject = (props) => {
  localState = useSubject(subj)
  return (
    <div className='subject-parent-container'>
      <div>ParentSubject Component counter = useSubscribe to get and display counter</div>
      <div>{localState}</div>
    </div>
  )
}
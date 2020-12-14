import React, { useState } from 'react'
import { ChildComponent } from './ChildComponent'
import { useSubject } from '../utils/UseSubject'
import { subj } from '../Subjects/ParentSubject'
import '../Styles/index.scss'

export const ParentComponent = () => {

  const [state, setState]=useState({value:0})
  const counter = useSubject(subj)
  return (
    <>
      <div className='parent-component'>
        <ChildComponent className='child-component' setter={setState} prefix='First'/>
        <ChildComponent className='child-component' setter={setState} prefix='Second' />
        <div className='child-output'>{state.value}</div>
      </div>
      <div className='subject-parent-container'>
        <h3>ParentComponent</h3>
        <p>UseSubject from utils/UseSubject controlled by Components/ChildComponent</p>
        {counter}
      </div>
    </>
  )
}
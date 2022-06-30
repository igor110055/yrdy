import React from 'react'

import GR1 from '../images/gradiens/gradient1.inline.svg'
import GR2 from '../images/gradiens/gradient2.inline.svg'
import GR3 from '../images/gradiens/gradient3.inline.svg'


export const Gradient1 = () => {
  return (
    <GR1 style={{
      position: 'absolute',
      top: 0,
      right: 0,
      zIndex: -2,
      PointerEvents: 'none'
   }}/>
  )
}

export const Gradient2 = () => {
  return (
    <GR2 style={{
      position: 'absolute',
      left: 0,
      top: '-240%',
      with: '100vh',
      zIndex: -2,
      PointerEvents: 'none'
   }}/>
  )
}

export const Gradient3 = () => {
  return (
    <GR3 style={{
      position: 'absolute',
      right: 0,
      bottom: '0',
      with: '100vh',
      zIndex: -2,
      PointerEvents: 'none'
   }}/>
  )
}
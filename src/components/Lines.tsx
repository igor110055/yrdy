import React from 'react'
import { Box } from "@mui/material";
import wh from '../images/roadmap.svg'

export const Line1 = ({bottomLineWidth}:{bottomLineWidth:string}) => {
  return(
    <Box component="span" sx={{
      position: 'absolute',
      height:"calc(100% - 6px)",
      left: 15,
      top: 28,
      width: 0,
      borderLeft: '1px solid rgba(255, 255, 255, .5)',
      zIndex: -1,
      pointerEvents: 'none',
      display: {xs:'none', b1440:'block'},
      '&:before':{
        content:`url(${wh})`,
        position: 'absolute',
        left: -9,
        bottom: -21
      },
      '&:after':{
        content:'""',
        position: 'absolute',
        left: 8,
        bottom: -7,
        height: '1px',
        background: 'linear-gradient(90deg, rgba(255,255,255,.5) 50%, rgba(255,255,255,0) 100%)',
        width: bottomLineWidth
      }
    }}></Box>
  )
}


export const Line2 = ({topLineWidth, bottomLineWidth}:{topLineWidth:string, bottomLineWidth:string}) => {
  return(
    <Box component="span" sx={{
      position: 'absolute',
      height:"calc(100% - 8px)",
      left: 15,
      top: 32,
      width: 0,
      borderLeft: '1px solid rgba(255, 255, 255, .5)',
      zIndex: -1,
      pointerEvents: 'none',
      display: {xs:'none', b1440:'block'},
      '&:before':{
        content:'""',
        position: 'absolute',
        left: 8,
        top: -7,
        height: '1px',
        background: 'linear-gradient(90deg, rgba(255,255,255,.5) 50%, rgba(255,255,255,0) 100%)',
        width: topLineWidth
      },
      '&:after':{
        content:'""',
        position: 'absolute',
        left: 8,
        bottom: -7,
        height: '1px',
        background: 'linear-gradient(90deg, rgba(255,255,255,.5) 50%, rgba(255,255,255,0) 100%)',
        width: bottomLineWidth
      }
    }}>
      <Box component="img" src={wh} alt="" sx={{
         position: 'absolute',
         left: -8,
         bottom: -15
      }}></Box>
       <Box component="img" src={wh} alt="" sx={{
         position: 'absolute',
         left: -8,
         top: -15
      }}></Box>
    </Box>
  )
}

export const Line3 = ({lineHeight, topLineWidth }:{lineHeight:string;topLineWidth:string}) => {
  return(
    <Box component="span" sx={{
      position: 'absolute',
      height: lineHeight,
      left: 15,
      bottom: '60px',
      width: 0,
      borderLeft: '1px solid rgba(255, 255, 255, .5)',
      zIndex: -1,
      pointerEvents: 'none',
      display: {xs:'none', b1440:'block'},
      '&:before':{
        content:`url(${wh})`,
        position: 'absolute',
        left: -9,
        top: -17
      },
      '&:after':{
        content:'""',
        position: 'absolute',
        left: 8,
        top: -7,
        height: '1px',
        background: 'linear-gradient(90deg, rgba(255,255,255,.5) 50%, rgba(255,255,255,0) 100%)',
        width: topLineWidth
      }
    }}></Box>
  )
}

export const Line4 = () => {
  return(
    <Box component="span" sx={{
      position: 'absolute',
      height:"calc(100% - 14px)",
      left: 15,
      top: 110,
      width: 0,
      borderLeft: '1px solid rgba(255, 255, 255, .5)',
      zIndex: -1,
      pointerEvents: 'none',
      display: {xs:'none', b1440:'block'},
      '&:before':{
        content:'""',
        position: 'absolute',
        left: 8,
        top: -7,
        height: '1px',
        background: 'linear-gradient(90deg, rgba(255,255,255,.5) 50%, rgba(255,255,255,0) 100%)',
        width: 150
      },
      '&:after':{
        content:'""',
        position: 'absolute',
        left: 8,
        bottom: -7,
        height: '1px',
        background: 'linear-gradient(90deg, rgba(255,255,255,.5) 50%, rgba(255,255,255,0) 100%)',
        width: 150
      }
    }}>
      <Box component="img" src={wh} alt="" sx={{
         position: 'absolute',
         left: -8,
         bottom: -15
      }}></Box>
       <Box component="img" src={wh} alt="" sx={{
         position: 'absolute',
         left: -8,
         top: -15
      }}></Box>
    </Box>
  )
}

export const Line5 = () => {
  return(
    <Box component="span" sx={{
      position: 'absolute',
      height:"calc(100% + 68px)",
      left: 15,
      top: 28,
      width: 0,
      borderLeft: '1px solid rgba(255, 255, 255, .5)',
      zIndex: -1,
      pointerEvents: 'none',
      display: {xs:'none', b1440:'block'},
      '&:before':{
        content:`url(${wh})`,
        position: 'absolute',
        left: -9,
        bottom: -21
      },
      '&:after':{
        content:'""',
        position: 'absolute',
        left: 8,
        bottom: -7,
        height: '1px',
        background: 'linear-gradient(90deg, rgba(255,255,255,.5) 50%, rgba(255,255,255,0) 100%)',
        width: 150
      }
    }}></Box>
  )
}

export const Line6 = () => {
  return(
    <Box component="span" sx={{
      position: 'absolute',
      height:"calc(100% - 60px)",
      left: 15,
      top: 28,
      width: 0,
      borderLeft: '1px solid rgba(255, 255, 255, .5)',
      zIndex: -1,
      pointerEvents: 'none',
      display: {xs:'none', b1440:'block'},
      '&:before':{
        content:`url(${wh})`,
        position: 'absolute',
        left: -9,
        bottom: -21
      },
      '&:after':{
        content:'""',
        position: 'absolute',
        left: 8,
        bottom: -7,
        height: '1px',
        background: 'linear-gradient(90deg, rgba(255,255,255,.5) 50%, rgba(255,255,255,0) 100%)',
        width: '30vw'
      }
    }}></Box>
  )
}

export const Line7 = () => {
  return(
    <Box component="span" sx={{
      position: 'absolute',
      height:"calc(100% + 300px)",
      left: 15,
      top: 37,
      width: 0,
      borderLeft: '1px solid rgba(255, 255, 255, .5)',
      zIndex: -1,
      pointerEvents: 'none',
      display: {xs:'none', b1440:'block'},
      '&:before':{
        content:`url(${wh})`,
        position: 'absolute',
        left: -9,
        top: -16,
      },
      '&:after':{
        content:'""',
        position: 'absolute',
        left: 8,
        top: -7,
        height: '1px',
        background: 'linear-gradient(90deg, rgba(255,255,255,.5) 50%, rgba(255,255,255,0) 100%)',
        width: '150px'
      }
    }}></Box>
  )
}
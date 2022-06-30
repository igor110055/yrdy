import * as React from "react"
import { Box, Typography } from "@mui/material";
import Dots from '../../images/index/dots.inline.svg';
import Snipet from './Snipet';


const card ={
  background: 'rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, .5)',
  height: '100%'
}

const cartHeader = {
  px: 2.35,
  py: 1.75,
  display: 'flex',
  alignItems: 'center',
  borderBottom: '1px solid rgba(255, 255, 255, .2)',
  width: '100%',
}

const cartHeaderText ={
  letterSpacing:'-0.02em',
  color:'#F9F7F4', 
  fontSize: 12, 
  ml: 2.25, 
  opacity: .3, 
  lineHeight:'25px',
  transform: 'translateY(-1px)'
}




const Card = ({title, snipet, bg}:{
  title: string | undefined;
  snipet: string;
  bg: string | undefined;
}) => {

  return(
    <Box sx={{...card, backgroundColor: bg}} > 
      <Box  sx={cartHeader} >
        <Dots/>
        <Typography sx={cartHeaderText}>{title}</Typography>
      </Box>
      <Box  sx={{px: 3, py: 1}}>
        <Snipet  snipet={snipet} />
      </Box>
    </Box>
              
  )
}

export default Card;
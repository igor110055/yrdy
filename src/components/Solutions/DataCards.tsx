import React from 'react'
import { Box} from "@mui/material";

import queries from '../../images/solutions/queries.svg';
import subscriptions from '../../images/solutions/subscriptions.svg';

const card ={
  border: '1px solid #fff',
  background: 'gba(0, 0, 0, 0.15)',
  borderWidth: 1,
  borderColor: 'rgba(255, 255, 255, .3)',
  backdropFilter: 'blur(15px)',
  mb:{xs:3, md: 0},
  position: 'relative', 
}


const DataCards = () => {
  return (
    <Box sx={{maxWidth: '1192px',px: 2, mx:'auto', mt:9.5, mb:5.8, display: {xs:'block', sm:'flex'}, justifyContent:'space-between',textAlign:'center'}}>
      <Box sx={{
        ...card, 
        width: {xs:'100%', sm:'calc(41% - 10px)'}
      }}>
        <Box component="img" src={queries} sx={{maxWidth: '100%'}}/>
      </Box>
      
      <Box sx={{
        ...card, 
        width: {xs:'100%', sm:'calc(59% - 10px)'}
      }}>
        <Box component="img" src={subscriptions} sx={{maxWidth: '100%'}}/>
      </Box>
      
    </Box>
  )
}

export default DataCards;
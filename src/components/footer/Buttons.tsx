import React from "react";
import { Button  } from "@mui/material";
import { Link as RouterLink } from "gatsby";
import { OutboundLink } from "gatsby-plugin-google-gtag";


import ArrowRight from '../../images/arrow-right.inline.svg';
import { stats, network,  bug, jobs, explorer } from "../../utils/urls";

const btnStyle = {
  flex: {xs: 'initial', sm: 1},
  textAlign: "left",
  justifyContent:"flex-start",
  ml: {xs: 0, sm: .5}, 
  mb: {xs: .5, sm: 0},
  height: 48, 
  fontWeight: 300,
  width:{xs: 'calc(50% - 2px)', sm:'initial'},
  padding: {xs: "13px 18px", sm: "13px 23px"},
}



const Buttons = () => {
  return (
    <>
    
    <Button 
        variant="outlined"
        endIcon={<ArrowRight/>}
        component={RouterLink}
        sx={{...btnStyle, ml:0}}
        to={stats}
    >
      .Stats
    </Button>
    <Button 
        variant="outlined"
        endIcon={<ArrowRight/>}
        component={RouterLink}
        sx={{...btnStyle}}
        to={explorer}
    >
      .Explorer
    </Button>
    <Button 
      variant="outlined"
      endIcon={<ArrowRight/>}
      component={RouterLink}
      sx={btnStyle}
      to={network}
      >
        .Network
      </Button>
      <Button 
        variant="outlined"
        endIcon={<ArrowRight/>}
        sx={btnStyle}
        component={OutboundLink}
        href={bug}
        target='_blank'
      >
        .Bug Bounty
      </Button>
      <Button 
        variant="outlined"
        endIcon={<ArrowRight/>}
        component={OutboundLink}
        href={jobs}
        target='_blank'
        sx={btnStyle}
        >
          .Careers
      </Button>
    </>
  )
}

export default Buttons
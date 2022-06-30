import React from 'react'
import { Box, Button, Typography} from "@mui/material";
import { OutboundLink } from "gatsby-plugin-google-gtag";
import ArrowRight from '../images/arrow-right.inline.svg'
import { discord } from '../utils/urls';

const JoinDiscord = ({maxWidthContainer}:{
  maxWidthContainer: string 
}) => {

  const mw = maxWidthContainer || '1007px';

  return (
    <Box sx={{maxWidth: mw , mx:'auto', px:2, mb:{xs:15, md:37}}}>
        <Box sx={{maxWidth: '480px',mx:{ xs:'auto', md:0}, textAlign:{ xs:'center', md:'initial'}}}>
          <Typography variant="h2" sx={{mb:3}}>Start your xBuild. <Box component="span" sx={{display: 'block'}}>Talk to our devs.</Box></Typography>
          <Typography sx={{mb:5}}>Wormhole provides you with the tools and primitives to start building.</Typography>
          <Button
            variant="outlined"
            component={OutboundLink}
            href={discord}
            target="_blank"
            endIcon={<ArrowRight/>}
          >
          .Join Discord
          </Button>
      </Box>
   
  </Box>
  )
}

export default JoinDiscord
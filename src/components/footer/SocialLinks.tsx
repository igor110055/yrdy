import React from "react";
import { Box, Divider, Typography , Link } from "@mui/material";
import { OutboundLink } from "gatsby-plugin-google-gtag";

import {  blog, twitter, telegram, github, discord, docs, youtube } from "../../utils/urls";

import Discord from '../../images/footer/discord.inline.svg';
import Twitter from '../../images/footer/twitter.inline.svg';
import Telegram from '../../images/footer/telegram.inline.svg';
import Github from '../../images/footer/github.inline.svg';
import Docs from '../../images/footer/docs.inline.svg';
import Medium from '../../images/footer/medium.inline.svg';
// import Youtube from '../../images/footer/youtube.inline.svg';

const linkStyle = {
  display: 'inline-flex',
  padding: '0 12px', 
  transition: "250ms cubic-bezier(0.4, 0, 0.2, 1)",
  '&:hover':{
    transform: 'scale(1.2)',
  }
}


const SocialLinks = () => {
  return (
    <Box sx={{
      border: "1px solid rgba(255,255,255, .5)",
      display: "flex",
      flexDirection:{xs:'column', sm:'row'},
      alignItems:'center',
      flex: '0 0 auto',
      pl: {xs:2, md:3.75},
      pr: {xs:2, md:2.25},
      py:{xs:1, sm:0},
      height: {xs:'initial', sm:48},
      mt:{xs:0, sm:.5,  lg:0},
      width:{xs:'100%', lg:'initial'},
      ml:{lg:0.5}
    }}>
    
      <Box sx={{ display: 'flex', alignItems: 'center'}}>
        <Typography sx={{
          fontSize: 12,
        }}>
          .Talk to an Expert
        </Typography>
        
        <Link
          sx={linkStyle}
          component={OutboundLink}
          href={discord}
          target='_blank'
          >
            
          <Discord/>
        </Link>

        <Divider
          sx={{
            height: 26, 
            width: '1px',
            background: 'rgba(255, 255, 255, .5)',
            mx:  2.25, 
            display:{xs:'none', sm:'block'}
          }}
        />
      </Box>
      <Box sx={{ display: 'flex',flex: 1, alignItems: 'center', py:{xs: 2, sm: 0}}}>
        
        <Link
          sx={linkStyle}
          component={OutboundLink}
          href={twitter}
          target='_blank'
          >
          <Twitter/>
        </Link>
        
        <Link
          sx={linkStyle}
          component={OutboundLink}
          href={telegram} 
          target='_blank'
          >
          <Telegram/>
        </Link>
        
        <Link
          sx={linkStyle}
          component={OutboundLink}
          href={github} >
         <Github/>
        </Link>
        
        <Link
          sx={linkStyle}
          component={OutboundLink}
          href={docs} 
          target='_blank'
          >
          <Docs/>
        </Link>
        
        <Link
          sx={linkStyle}
          component={OutboundLink}
          href={blog} 
          target='_blank'
          >
          <Medium/>
        </Link>

        {/* <Link
          sx={linkStyle}
          component={OutboundLink}
          href={youtube} 
          target='_blank'
          >
          <Youtube/>
        </Link> */}

      </Box>
    </Box>
  )
}

export default SocialLinks
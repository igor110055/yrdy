import React, { useEffect, useRef } from "react";
import { Box, Typography  } from "@mui/material";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


import swirl from '../images/footer/swirl.png';
import SocialLinks from './footer/SocialLinks';
import Buttons from './footer/Buttons';



const Footer = () => {
  const swirlContainer = useRef(null);
  const swirlElem = useRef(null);

  useEffect(() => {

    gsap.registerPlugin(ScrollTrigger);

    var viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    if (viewportWidth > 992) {
      gsap.from(swirlElem.current, {
        y: 200,
        x: 200,
        rotation: 5,
        ease: "Power3.easeOut",
        scrollTrigger: {
          trigger: swirlContainer.current,
          start: "60% 100%",
          scrub: 1
        },
      })
    }

    
  }, [])  

  return (
    <footer ref={swirlContainer}  style={{position: 'relative'}}>
      <Box sx={{      
            px: {xs: 2, md: 3.7},
            zIndex: 1,
            position: 'relative'    
        }}>
          <Box sx={{ display: 'flex', flexWrap: {xs:'wrap', lg:'nowrap'}, justifyContent:  {xs: "space-between", sm: "flex-start"} }}>
              <Buttons/>
              <SocialLinks/>
          </Box>
          <Typography sx={{
            letterSpacing: '0.03em',
            fontSize: 10,
            opacity: .5,
            pt: 2.25,
            pb: 3.5
          }}>
            2022 Ⓒ Wormhole. All Rights Reserved.
          </Typography>
      </Box>

      <Box 
        sx={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          transform: 'translateY(20%)',
          zIndex: -1,
          pointerEvents: 'none'
        }}> 
        <Box  ref={swirlElem}  component='img' src={swirl} sx={{maxWidth: '100%'}} />
      </Box>


    </footer>
  )
}

export default Footer
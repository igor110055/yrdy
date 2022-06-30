import React, { useEffect, useRef } from "react"; 
import { Box,  Link, Typography } from "@mui/material";
import { Link as RouterLink } from "gatsby";
import { gsap } from "gsap";
import { home, solutions, developers, next } from "../utils/urls";

import SocialLinks from './footer/SocialLinks';
import Buttons from './footer/Buttons';


import bg from '../images/bg-image.jpg';

const linkStyle = { 
  color:"#fff", 
  textDecoration:"none", 
  fontSize: {xs:32,md:52},
  fontWeight: 300,
};

const mm ={
  position: 'fixed',
  right: '-100%',
  top: 0,
  width:'100%',
  height: '100%',
  backgroundColor: '#000',
  backgroundImage: `url(${bg})`, 
  backgroundSize:'cover',
  px: {xs:3,md:7.5}, 
  pb: 6,
  pt: 15,
  zIndex: 8,
  display: {xs: 'block', md:'flex'},
  overflow:'auto'
}


interface MenuProps {
  headerState: any;
  setHeaderState: Function;
}


const linksContainer = {
  display: {xs: 'block', md:'flex'},
  flexDirection: 'column',
  maxWidth: {xs: 520, md:300},
  '& a':{
    margin: '0 0 10px',
    width: '100%',
    padding: {xs: "17px 18px", sm: "17px 23px"},
    
  }
}
const col1 = {
  flex: 1,
  display: 'flex',
  justifyContent: {md:'center'},
  width:'100%',
  maxWidth: {xs: 520,md:'initial'}, 
  mb: {xs: 5,md:0}
}
const col2 = {
  px: {md:6},
  display: {xs: 'block', md:'flex'},
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: {xs: 'auto', md:'100%'},
}

const SocialLinksContainer = {
  maxWidth: 520,
  "& > div":{
    ml:"0", 
   
  }
}



const MobileMenu = ({ headerState, setHeaderState }:MenuProps) => {

  let burgerMenu = useRef(null);

  const closeMenu = () => {
    setHeaderState({
      ...headerState,
      opened: !headerState.opened,
    });
  };

  useEffect(() => {
      // close menu
    if (!headerState.opened) {
      gsap.to(burgerMenu.current, { duration: 0.3,ease: "power4.out",  css: { right: '-100%' } });
    } else {
      // show menu
      gsap.to(burgerMenu.current, { duration: 0.3,ease: "power4.out",  css: { right: '0' } });
    }
  }, [headerState]);


  return (
    <Box ref={burgerMenu} sx={mm}>

        <Box sx={col1}>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
            }}>
                <Link
                  component={RouterLink}
                  sx={linkStyle}
                  variant="body2"
                  to={home}
                >
                  .Home
                </Link>
                <Link
                  component={RouterLink}
                  sx={linkStyle}
                  variant="body2"
                  to={solutions}
                >
                  .Solutions
                </Link>
                <Link
                  component={RouterLink}
                  sx={linkStyle}
                  variant="body2"
                  to={developers}
                >
                  .Developers
                </Link>
                <Link
                  component={RouterLink}
                  sx={linkStyle}
                  variant="body2"
                  to="/ecosystem"
                >
                .Ecosystem
                </Link>
                <Link
                  component={RouterLink}
                  sx={linkStyle}
                  variant="body2"
                  to={next}
                >
                  .Next
                </Link>
              
            </Box>
        </Box>
      
        <Box sx={col2}>
          <Box sx={linksContainer} >
            <Buttons/>
          </Box>
          <Box sx={{...SocialLinksContainer , mt:5 }} >
            <SocialLinks/>
          </Box>
        </Box>
        <Typography sx={{
            letterSpacing: '0.03em',
            fontSize: 10,
            opacity: .5,
            position: {xs:'initial', md:'absolute'},
            left: {xs: '16px', md: '30px'},
            mt: {xs:5, md:0},
            bottom: '48px'
          }}>
            2022 Ⓒ Wormhole. All Rights Reserved.
          </Typography>
    </Box>
  )
}

export default MobileMenu;
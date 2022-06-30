import React, { useEffect, useState } from "react"; 
import { AppBar, Box, Button,  Link, useTheme, useMediaQuery } from "@mui/material";
import { Link as RouterLink } from "gatsby";
import { home, solutions, developers, next, portal, ecosystem } from "../utils/urls";
import MobileMenu from './MobileMenu'
import Symbol from '../images/wormhole-symbol.inline.svg';
import { Player } from '@lottiefiles/react-lottie-player';
import logoAnim from '../images/animations/HeaderLogo-v3.json';

const linkStyle = { 
  color:"#fff", 
  textDecoration:"none", 
  mx: 2.5, 
  fontSize: 14,
  transition: '.3s ease-in-out',
  "&:hover":{
    textShadow: '0 0  #fff',
  }
};
const linkActive={
  textShadow: '0 0  #fff',
  fontWeight: 600
}
 export interface BurgerState {
  initial: boolean | null;
  opened: boolean | null;
 }

const Header = () => {

  const [ isSticky, setIsStiky ] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  
  const [headerState, setHeaderState] = useState<BurgerState>({
    initial: false,
    opened: null,
  });

  // Toggle menu
  const handleToggleMenu = () => {
    if (headerState.initial === false) {
      setHeaderState({
        initial: null,
        opened: true,
      });
    } else {
      setHeaderState({
        ...headerState,
        opened: !headerState.opened,
      });
    }
  };




  useEffect(() => {
    window.addEventListener('scroll', ifSticky);
    return () => {
        window.removeEventListener('scroll', ifSticky);
    };
  });
  
  const ifSticky = () => {
      const scrollTop = window.scrollY;
      if(!headerState.opened){
        scrollTop >= 250 ? setIsStiky(true):setIsStiky(false);
      }
  };

  const appbar =  {
    px: {xs: 2, md: 3.7},
    pt: {xs: 2, md: 3.5},
    '&.mui-fixed':{
      padding: 0
    }
  }

  return (
    <>
    <AppBar 
      position={ (isSticky || headerState.opened) ? 'fixed':'absolute'}
      elevation={0}
      sx={appbar}
      >
    {!isSticky && !isMobile && !headerState.opened ? (
      <>
       <Link 
       component={RouterLink} to={home}  
       sx={{
         border: "1px solid rgba(255, 255, 255, .5)",
         px: 3.75,
         alignItems: 'center',
         height: 48,
         display:{xs:'none', md:'flex'}
       }}>
         <Player loop autoplay  src={logoAnim} style={{width:130, height:23}} > </Player>
        </Link>
         <Box
         sx={{
             border: "1px solid rgba(255, 255, 255, .5)",
             flex: 1,
             height: 48,
             mx: .5,
             alignItems: 'center',
             textAlign: 'center',
             justifyContent: 'center',
             pr: {md: 0, lg: 8.75}, 
             display:{xs:'none', md:'flex'}
           }}
       >
         <Link
           component={RouterLink}
           sx={linkStyle}
           to={solutions}
           activeStyle={linkActive}
           variant="body1"
         >
           .Solutions
         </Link>
         <Link
           component={RouterLink}
           sx={linkStyle}
           activeStyle={linkActive}
           to={developers}
           variant="body1"
         >
           .Developers
         </Link>
         <Link
           component={RouterLink}
           sx={linkStyle}
           activeStyle={linkActive}
           to={ecosystem}
           variant="body1"
         >
         .Ecosystem
         </Link>
         <Link
           component={RouterLink}
           sx={linkStyle}
           activeStyle={linkActive}
           to={next}
           variant="body1"
         >
           .Next
         </Link>
        </Box>
        <Button
         variant="outlined"
         onClick={handleToggleMenu}
         sx={{
           px: 2,
           fontSize: 14,
           textTransform:'none', 
           fontWeight: 400,
           height: 48,
           display:{xs:'none', md:'inline-flex'},
           '& svg':{stroke:'currentColor', transition:'none'},
         }}>
         <svg width="26" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M0 1h26M0 7h26M0 13h26" /></svg>
       </Button>
       </>
    ):(
     <>
        <Link component={RouterLink} to={home}  sx={{
          position:'absolute',
          left:{xs: 16, md: 28},
          top: {xs: 16, md: 14}
        }} >
          <Symbol/>
        </Link>
        <Button variant="text" disableRipple={true} sx={{
          borderRadius:0,
          position:'absolute',
          right:{xs: 16, md: 28},
          top: {xs: 28, md:28}
          }} 
          onClick={handleToggleMenu}>
            {!headerState.opened ? (
              <svg width="26" height="14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 1h26M0 7h26M0 13h26" stroke="#fff"/></svg>
            ):(
              <svg width="24" height="15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m.742.5 22.517 13M.742 14 23.26 1" stroke="#fff"/></svg>
            )}
        </Button>
      </>
    )}
    
   
   

    </AppBar>
    <MobileMenu headerState={headerState} setHeaderState={setHeaderState} />
    </>
  )
}

export default Header
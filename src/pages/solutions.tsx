import * as React from "react"
import { Box, Button, Typography} from "@mui/material";
import { PageProps } from "gatsby";
import { Player } from '@lottiefiles/react-lottie-player';
import { SEO } from "../components/SEO";

import Layout from "../components/Layout"
import JoinDiscord from '../components/JoinDiscord';
import {Line1, Line3} from '../components/Lines';

import ArrowRight from '../images/arrow-right.inline.svg';

import daps from '../images/animations/xChainxDapps-v3.json';
import xmore from '../images/animations/xMoreCodeLess.json';
import xassets from '../images/animations/xAssets-v2.json';
import wh from '../images/roadmap.svg'

import { discord } from "../utils/urls";
import { OutboundLink } from "gatsby-plugin-google-gtag";

const solutions = ({ location }: PageProps) => {
  return (
    <Layout>
      <SEO
        title="Solutions"
        pathname={location.pathname}
      />
      <Box sx={{ position: 'relative',}}> 
        <Line1 bottomLineWidth="50vw"/>
        <Box sx={{
          maxWidth: '1256px',
          mx: 'auto',
          display: 'flex', 
          flexWrap: 'wrap',
          flexDirection: {xs:'column-reverse', md:'row'},
          alignItems: 'center',
          justifyContent: {xs:'center',lg:'flex-end'}, 
          padding: {xs:'90px 16px 45px', md:'230px 16px 115px'},
        
        }}>
          <Box sx={{width: {xs:'100%', md:'40%'}, maxWidth: {xs: 485, md:340 },mt:{xs:6, md:0}, mr:{xs:0, lg:5},  textAlign:{ xs:'center', md:'initial'}}}>
            <Typography variant="h2" sx={{mb: 2.5}}>X more. <Box component="span" sx={{display: 'block'}}>Code less.</Box> </Typography>
            <Typography sx={{mb: 4.25}}>Our powerful SDK makes going xChain simpler. Or, if you need a more custom solution, Wormhole devs are happy to help.</Typography>
            <Button
            variant="outlined"
            endIcon={<ArrowRight/>}
            component={OutboundLink}
            target="_blank"
            href={discord}
            >
            .Talk to an expert
            </Button>
          </Box>
          <Box sx={{width: {xs:'100%', md:'60%', maxWidth:'660px'}, textAlign: 'center'}}>
            <Player
              loop
              autoplay
              src={xmore}
            >
          </Player>
          </Box>
        </Box>
      </Box>
      <Box sx={{
        maxWidth: '1256px',
        mx: 'auto',
        display: 'flex', 
        flexWrap: 'wrap',
        flexDirection: {xs:'column', sm:'row'},
        alignItems: 'center', 
        justifyContent: {xs:'center',lg:'space-between'}, 
        padding: {xs:'45px 16px 100px', md:'115px 16px 160px'}
      }}>
        <Box sx={{width: {xs: '100%', md:'55%', lg:'60%', maxWidth:'660px'},  textAlign: 'center'}}>
          <Player
              loop
              autoplay
              src={daps}
            >
          </Player>
        </Box>
        <Box sx={{width: {xs: '100%', md:'40%'}, maxWidth:'485px', pl: {xs:0,md:5}, textAlign:{ xs:'center', md:'initial'}}}>
          <Typography variant="h2" sx={{mb: 2.5}}>Apps go xChain to more users with xApps. </Typography>
          <Typography sx={{mb: 2}}>More apps. More assets.  More data. More users.</Typography>
        </Box>
    
      </Box>

    

      <Box sx={{
        maxWidth: '1192px', 
        mx:'auto',
        px:2, 
        mb:{xs:12, md:16.25}, 
        mt:{xs:18, md:0}, 
        display: 'flex',
        flexWrap:'wrap',  
        justifyContent:{xs:'center',lg:'space-between'},
        position:'relative',
        '&:before, &:after':{
          display:{xs: 'block', md:'none'}
        },
        '&:after':{
          content:'""',
          position: 'absolute',
          left: '50%',
          top: '-150px',
          height: 150,
          width: '1px',
          background: 'linear-gradient(to bottom, rgba(255,255,255,.5) 50%, rgba(255,255,255,0) 100%)',
        },
        '&:before':{
          content:`url(${wh})`,
          position: 'absolute',
          left: '50%',
          marginLeft: -1,
          top: -165
        }
        }}>
        <Box sx={{ width: {xs:'100%', md:'45%'}, maxWidth:{xs:'485px', lg:'initial'},  textAlign:{ xs:'center', md:'initial'} }}>
          <Typography variant="h2" sx={{mb: 3.12}}>Take assets further with xAssets.</Typography>
          <Typography sx={{maxWidth:'453px'}}>xAssets are path-independent and cross-chain fungible. Wormhole assets are never double-wrapped. Transform your assets to multichain assets with a single step.</Typography>
        </Box>
        <Box sx={{width: {xs:'100%', md:'55%', maxWidth:'640px'}, textAlign:'center', mt:{xs: 7, md: 5}}}>
        <Player
              loop
              autoplay
              src={xassets}
            >
          </Player>
          <Typography variant="subtitle1" sx={{fontSize: 12, fontWeight: 400,textAlign:'center',mx:'auto',maxWidth: '440px',mt: 1.5 }}>Transform your assets into multichain xAssets.</Typography>
        </Box>
      </Box>

     
      <JoinDiscord maxWidthContainer="" />

      <Line3 lineHeight='550px' topLineWidth="150px" />

    </Layout>
  )
}

export default solutions
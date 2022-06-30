import React from "react";
import { Box,Link,  Button, Typography, Grid } from "@mui/material";
import { PageProps} from "gatsby";
import { OutboundLink } from "gatsby-plugin-google-gtag";
import Layout from "../components/Layout"
import { SEO } from "../components/SEO";
import { Player } from '@lottiefiles/react-lottie-player';


import ArrowRight from '../images/arrow-right.inline.svg';
import Arrow from '../images/arrow.inline.svg';
import dev1 from '../images/developers/dev1.svg';
import dev2 from '../images/animations/AllChainsAtOnce.json'

import uc1 from '../images/developers/usecase-1.svg';
import uc2 from '../images/developers/usecase-2.svg';
import uc3 from '../images/developers/usecase-3.svg';


import JoinDiscord from '../components/JoinDiscord';
import Contracts from '../components/Developers/Contracts'

import {Line1, Line2, Line3} from '../components/Lines';
import {useCasesCta} from '../utils/urls';
import { discord, book, bookWormhole } from "../utils/urls";

const integrationLink ={
  textDecoration:'none',
  background: 'rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, .5)',
  backdropFilter: 'blur(15px)', 
  display: 'block', 
  py: 3.5,
  px: 5.1,
  maxWidth: 334, 
  mb: 3,
  mx: {xs: 'auto', md:0},
  transition: "250ms cubic-bezier(0.4, 0, 0.2, 1)",
  '& svg':{
    transition: "250ms cubic-bezier(0.4, 0, 0.2, 1)",
  },
  '&:hover':{
    boxShadow: '0 0 30px 0 rgba(255, 255, 255, .15)',
    '& svg ':{
      transition: "250ms cubic-bezier(0.4, 0, 0.2, 1)",
      transform: 'translateX(5px)'
    }
  },
}

const cardImage ={
  mb: 4, 
  height: 95,  
  width: 95, 
  objectFit:'contain', 
  objectPosition:'center bottom', 
  animation: 'float 5s ease-in-out infinite',
  '@keyframes float':{
    '0%':{
      transform: 'translatey(0px)'
    },
    '50%':{
      transform: 'translatey(-15px)'
    },
    '100%':{
      transform: 'translatey(0px)'
    },
  }
}

const useCases =[
  {
    icon: uc1,
    title: 'xAssets',
    info: 'xChain Tokens and NFTs are path-independent and fungible.'
  },
  {
    icon: uc2,
    title: 'xApps',
    info: 'Developers from multiple ecosystems can build apps that access more users and liquidity from other chains.'
  },
  {
    icon: uc3,
    title: 'xData',
    info: 'Break data silos to offer high performance, low-cost access to data from other chains and applications.'
  }
  
]

const developers = ({ location }: PageProps) => {

  return (
    <Layout>
       <SEO
        title="Developers"
        pathname={location.pathname}
      />
      <Box sx={{position:'relative'}}>
        <Line1 bottomLineWidth="15vw"/>
        <Box sx={{
          maxWidth: 1232,
          mx: 'auto',
          display: 'flex', 
          flexWrap: 'wrap',
          flexDirection: {xs:'column-reverse', md:'row'},
          alignItems: 'center', 
          justifyContent: {xs:'center',lg:'space-between'}, 
          padding: {xs:'90px 16px 60px', md:'230px 16px 137px'}
        }}>
          <Box sx={{width: {xs:'100%', md:'50%'}, maxWidth:550, mx: {xs:'auto',md:0}, textAlign:{ xs:'center', md:'initial'}}}>
            <Typography variant="h2" sx={{mb: 2.5}}>xDev easier.</Typography>
            <Typography sx={{mb: 4.25,  maxWidth:460, mx: {xs:'auto',md:0}}}>Wormhole provides you with the tools and primitives for xChain use cases ranging from simple messaging to xApps .</Typography>
            <Box sx={{ml: -2}}>
              <Button
              variant="outlined"
              endIcon={<ArrowRight/>}
              component={OutboundLink}
              href={book}
              target="_blank"
              sx={{ml: 2, mt: 2, minWidth: 205}}
              >
              .Check the Docs
              </Button>
              <Button
              variant="outlined"
              endIcon={<ArrowRight/>}
              component={OutboundLink}
              href={discord}
              target="_blank"
              sx={{ml:2, mt: 2, minWidth: 205}}
              >
              .Speak to an Expert
              </Button>
            </Box>
          </Box>
          <Box sx={{width: {xs:'100%', md:'50%'}, textAlign:'center', mb:{xs: 7, md: 0}}}>
             <Box component="img" src={dev1} sx={{maxWidth:'100%'}}></Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{maxWidth: 1240, px:2, mx:'auto', pb: {xs:10, md:21}}}>
          
          <Typography variant="h2" sx={{textAlign: 'center'}}>Common use cases.</Typography>

          <Grid container spacing={3.75} sx={{pt: 14.6, pb: 9}} >
            
            {useCases.map((data)=>(

              <Grid key={data.title} item xs={12} md={4} sx={{textAlign:'center'}}>
                <Box  sx={cardImage} component="img" src={data.icon}/>
                <Typography variant="body2" sx={{fontSize: 32, mb: 1.75}}>{data.title}</Typography>
                <Typography sx={{maxWidth: 350,mx:'auto'}}>{data.info}</Typography>
              </Grid>

            ))}
         
          </Grid>

          <Box sx={{textAlign: 'center'}}>
            <Button
            variant="outlined"
            endIcon={<ArrowRight/>}
            component={OutboundLink}
            href={useCasesCta}
            target="_blank"
            sx={{minWidth: 197}}
            >
            .Explore
            </Button>
          </Box>
      </Box>

      <Box sx={{position:'relative'}}>
          <Line2 topLineWidth="150px" bottomLineWidth="150px"/>
          <Box sx={{maxWidth: 1137,px:2, mx:'auto', textAlign:{ xs:'center', md:'initial'} }}>
            <Typography variant="h2"  sx={{maxWidth: 751, mb: 1.2, mx:{ xs:'auto', md:'initial'} }}>One integration for a heterogeneous set of chains.</Typography>
            <Typography>Leading protocols are building on Wormhole.</Typography>
          </Box>
          <Box sx={{maxWidth: 992,px:2, mx:'auto', display: 'flex',flexDirection: {xs:'column', md:'row'}, alignItems: {xs:'center',md:'initial'}, justifyContent: {xs:'center',md:'space-between'}, pt:10, pb: {xs:10, md:21}}}>
              <Box sx={{width: {xs:'100%', md:'35%'}}}>
                <Link
                  component={OutboundLink}
                  href={bookWormhole}
                  target="_blank"
                  sx={integrationLink}
                >
                  <Typography variant="body2" sx={{fontSize:32, mb: 1.3, lineHeight: 1}}>Wormhole Core</Typography>
                  <Typography sx={{ mb: 2.3, minHeight: 44}}>Explore integration scenarios.</Typography>
                  <Arrow/>
                </Link>

                <Link
                  component={OutboundLink}
                  href={bookWormhole}
                  target="_blank"
                  sx={integrationLink}
                >
                  <Typography variant="body2" sx={{fontSize:32, mb: 1.3, lineHeight: 1}}>Token Bridge</Typography>
                  <Typography sx={{ mb: 2.3}}>Leverage xChain fungible assets, powered by Wormhole.</Typography>
                  <Arrow/>
                </Link>
              </Box>
              <Box sx={{width: {xs:'100%', md:'60%'},maxWidth: 630,  pt: {xs:5, md:12}, textAlign: 'center'}}>
                  <Player
                    loop
                    autoplay
                    src={dev2}
                  >
                </Player>
              </Box>
          </Box>
      </Box>


     
      <Contracts/>
      <JoinDiscord maxWidthContainer=""/>

      <Line3 lineHeight='550px' topLineWidth="150px" />

    </Layout>
  )
}

export default developers;
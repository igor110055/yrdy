import * as React from "react"
import { Box, Button, Typography} from "@mui/material";
import { PageProps } from "gatsby";
import Layout from "../components/Layout"
import { SEO } from "../components/SEO";
import { Player } from '@lottiefiles/react-lottie-player';

import JoinDiscord from "../components/JoinDiscord";
import ProjectSection from "../components/Ecosystem/ProjectSection";

import {Line5, Line4, Line3} from '../components/Lines';
import discoverProjects from '../images/animations/DiscoverProjects.json'
import wh from '../images/roadmap.svg'


import pyth from '../images/ecosystem/pyth.svg';
import pangolin from '../images/ecosystem/Pangolin.svg';
import swim from '../images/ecosystem/Swim.png';
import xdefi from '../images/ecosystem/xdefi.svg';
import brave from '../images/ecosystem/brave.svg';
import atlas from '../images/ecosystem/Atlas.svg';
import sentre from '../images/ecosystem/sentre.svg';
import zero1 from '../images/ecosystem/01.svg';
import slope from '../images/ecosystem/slope.png';
import lido from '../images/ecosystem/lido.svg';
import solend from '../images/ecosystem/solend.svg';
import aave from '../images/ecosystem/aave.svg';
import orca from '../images/ecosystem/orca.svg';
import raydium from '../images/ecosystem/raydium.svg';
import rango from '../images/ecosystem/rango.svg';
import lifi from '../images/ecosystem/lifi.svg';
import socket from '../images/ecosystem/socket.png';
import curve from '../images/ecosystem/curve.svg';
import uniswap from '../images/ecosystem/uniswap.svg';
import pancakeswap from '../images/ecosystem/pancakeswap.svg';
import metamask from '../images/ecosystem/metamask.svg';
import saber from '../images/ecosystem/saber.svg';
import portal from '../images/ecosystem/portal.svg';
import ftx from '../images/ecosystem/ftx.svg';
import tinyman from '../images/ecosystem/tinyman.png';
import c3 from '../images/ecosystem/c3.png';

import mobland from '../images/ecosystem/mobland.svg';
import everdragons from '../images/ecosystem/everdragons.svg';
import opensea from '../images/ecosystem/opensea.svg';
import metaplex from '../images/ecosystem/metaplex.svg';
import bridgesplit from '../images/ecosystem/bridgesplit.svg';
import liqnft from '../images/ecosystem/liqnft.svg';

import aurory from '../images/ecosystem/aurory.svg';
import audius from '../images/ecosystem/audius.svg';
import frax from '../images/ecosystem/frax.svg';


const core = [
      {
        logo: portal,
        title: 'Portal',
        url: 'https://www.portalbridge.com/',
      },
      {
        logo: ftx,
        title: 'FTX',
        url: 'https://ftx.com/',
      },
      {
        logo: pyth,
        title: 'Pyth',
        url: 'https://pyth.network/',
      },
      {
        logo: pangolin,
        title: 'Pangolin',
        url: 'https://pangolin.exchange/',
      },
      {
        logo: swim,
        title: 'Swim',
        url: 'https://swim.io/',
      },
      {
        logo: atlas,
        title: 'Atlas',
        url: 'https://atlasdex.finance/',
      },
      {
        logo: xdefi,
        title: 'xDefi',
        url: 'https://www.xdefi.io/',
      },
      {
        logo: brave,
        title: 'Brave',
        url: 'https://brave.com/',
      },
]
const tokenBridge = [
  {
    logo: portal,
    title: 'Portal',
    url: 'https://www.portalbridge.com/',
  },
  {
    logo: ftx,
    title: 'FTX',
    url: 'https://ftx.com/',
  },
  {
    logo: swim,
    title: 'Swim',
    url: 'https://swim.io/',
  },
  {
    logo: atlas,
    title: 'Atlas',
    url: 'https://atlasdex.finance/',
  },
  {
    logo: pangolin,
    title: 'Pangolin',
    url: 'https://pangolin.exchange/',
  },
  {
    logo: sentre,
    title: 'Sentre',
    url: 'https://sentre.io/',
  },
  {
    logo: zero1,
    title: 'O1 Exchange',
    url: 'https://01.xyz/',
  },
  {
    logo: slope,
    title: 'Slope',
    url: 'https://slope.finance/',
  },
  {
    logo: xdefi,
    title: 'xDefi',
    url: 'https://www.xdefi.io/',
  },
  {
    logo: lido,
    title: 'Lido',
    url: 'https://lido.fi/',
  },
  {
    logo: c3,
    title: 'c3',
    url: 'https://www.c3.app/',
  },
  {
    logo: tinyman,
    title: 'Tinyman',
    url: 'https://tinyman.org/',
  },
  
]
const supporting = [
  {
    logo: solend,
    title: 'Solend',
    url: 'https://solend.fi/',
  },
  {
    logo: aave,
    title: 'AAVE',
    url: 'https://aave.com/',
  },
  {
    logo: orca,
    title: 'Orca',
    url: 'https://www.orca.so/',
  },
  {
    logo: raydium,
    title: 'Raydium',
    url: 'https://raydium.io/',
  },
  {
    logo: rango,
    title: 'Rango',
    url: 'https://rango.exchange/',
  },
  {
    logo: lifi,
    title: 'Li.Fi',
    url: 'https://li.fi/',
  },
  {
    logo: socket,
    title: 'Socket',
    url: 'https://www.socket.tech/',
  },
  {
    logo: curve,
    title: 'Curve',
    url: 'https://curve.fi/',
  },
  {
    logo: uniswap,
    title: 'Uniswap',
    url: 'https://uniswap.org/',
  },
  {
    logo: pancakeswap,
    title: 'PancakeSwap',
    url: 'https://pancakeswap.finance/',
  },
  {
    logo: metamask,
    title: 'Metamask',
    url: 'https://metamask.io/',
  },
  {
    logo: zero1,
    title: 'O1 Exchange',
    url: 'https://01.xyz/',
  },
  {
    logo: pangolin,
    title: 'Pangolin',
    url: 'https://pangolin.exchange/',
  },
  {
    logo: atlas,
    title: 'Atlas',
    url: 'https://atlasdex.finance/',
  },
  {
    logo: swim,
    title: 'Swim',
    url: 'https://swim.io/',
  },
  {
    logo: saber,
    title: 'Saber',
    url: 'https://saber.so/',
  },

]
const nft = [
  {
    logo: mobland,
    title: 'Mobland',
    url: 'https://mob.land/',
  },
  {
    logo: everdragons,
    title: 'Everdragons',
    url: 'https://everdragons.com/',
  },
  {
    logo: opensea,
    title: 'OpenSea',
    url: 'https://opensea.io/',
  },
  {
    logo: metaplex,
    title: 'MetaPlex',
    url: 'https://www.metaplex.com/',
  },
  {
    logo: bridgesplit,
    title: 'Bridgesplit',
    url: 'https://bridgesplit.com/',
  },
  {
    logo: liqnft,
    title: 'LiqNFT',
    url: 'https://www.liqnft.com/',
  },
  
]
const xassets = [
  {
    logo: brave,
    title: 'Brave',
    url: 'https://brave.com/',
  },
  {
    logo: aurory,
    title: 'Aurory',
    url: 'https://aurory.io/',
  },
  {
    logo: audius,
    title: 'Audius',
    url: 'https://audius.co/',
  },
  {
    logo: frax,
    title: 'Frax / FXS',
    url: 'https://frax.finance/',
  },
]

const ecosystem = ({ location }: PageProps) => {
  return (
    <Layout>
      <SEO
        title="Ecosystem"
        pathname={location.pathname}
      />
      <Box sx={{position:'relative'}}>
        <Line5 />
        <Box sx={{
          maxWidth: 1092,
          mx: 'auto',
          display: 'flex', 
          flexWrap: 'wrap',
          flexDirection: {xs:'column-reverse', md:'row'},
          alignItems: 'center', 
          justifyContent: {xs:'center',lg:'space-between'}, 
          padding: {xs:'90px 16px 60px', md:'230px 16px 67px'}
        }}>
          <Box sx={{width: {xs:'100%', md:'40%'}, maxWidth:420, mx:{ xs:'auto', md:'initial'}, textAlign:{ xs:'center', md:'initial'}}}>
            <Typography variant="h2" >Discover the hottest projects on Wormhole.</Typography>
          </Box>
          <Box sx={{width:  {xs:'100%', md:'60%'}, maxWidth:{xs: 630, md: 'initial'}, textAlign:'center', mb:{xs: 7, md: 0}, transform: {xs: 'none' , lg:'translateX(80px)'}}}>
                <Player
                    loop
                    autoplay
                    src={discoverProjects}
                  >
                </Player>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          position:'relative',
          mb:8,
          display:{xs: 'block',md:'none'},
          '&:after':{
            content:'""',
            position: 'absolute',
            left: '50%',
            top: '0',
            height: 150,
            width: '1px',
            background: 'linear-gradient(to bottom, rgba(255,255,255,.5) 50%, rgba(255,255,255,0) 100%)',
          },
          '&:before':{
            content:`url(${wh})`,
            position: 'absolute',
            left: '50%',
            marginLeft: -1,
            top: -13
          }
        }}
      ></Box>
      <ProjectSection  title=".with Wormhole's core layer" projectsList={core} />
      <Box sx={{position:'relative'}}>
        <Line4 />
        <ProjectSection  title=".Token bridge" projectsList={tokenBridge} />
      </Box>

      <ProjectSection  title=".supporting xAssets" projectsList={supporting} />
      
      <Box sx={{position:'relative'}}>
        <Line4 />
        <ProjectSection  title=".wormhole NFTs" projectsList={nft} />
      </Box>
      <ProjectSection  title=".creating xAssets" projectsList={xassets} />
    
        
      <Box sx={{pt: {xs: 7, md: 17}}}>
        <JoinDiscord maxWidthContainer="1082px"/>
      </Box>
      
      <Line3 lineHeight='550px' topLineWidth="150px" />

    </Layout>
  )
}

export default ecosystem

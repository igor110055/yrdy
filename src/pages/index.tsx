import React, {useRef, useEffect  } from "react";
import { Box, Button, Typography, Grid, Modal} from "@mui/material";
import {
  Link as RouterLink,
  PageProps,
  graphql,
  useStaticQuery
} from "gatsby";

import Layout from "../components/Layout"
import { SEO } from "../components/SEO";
import { Player } from '@lottiefiles/react-lottie-player';

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


import ArrowRight from '../images/arrow-right.inline.svg';
import CloseIcon from '../images/x.inline.svg';

import Integrations from "../components/Index/Integrations";

import heroJson from '../images/animations/X-chainEverything-v2.json';
import wwCenter from '../images/animations/WhatWhy-CenterCicleAnim-v2.json';
import wwLeft from '../images/animations/WhatWhy-LeftCicleAnim-v2.json';
import wwRight from '../images/animations/WhatWhy-RightCicleAnim-v2.json';

import { solutions } from "../utils/urls";
import {Line1} from '../components/Lines';
import wh from '../images/roadmap.svg'


const integrationCard ={
  display:'block',
  backgroundColor:'rgba(0, 0, 0, 0.1)',
  border:'1px solid rgba(255, 255, 255, 0.3)',
  backdropFilter: 'blur(15px)',
  px: 3.75,
  pt: 7.4,
  pb: 4,
  mb: {xs: 2, md: 0},
  transition: "250ms cubic-bezier(0.4, 0, 0.2, 1)",
  textDecoration: 'none',
  '&:hover':{
    boxShadow: '0 0 30px 0 rgba(255, 255, 255, .15)',
    '& span svg ':{
      transition: "250ms cubic-bezier(0.4, 0, 0.2, 1)",
      transform: 'translateX(5px)'
    }
  },
  
}
const integrationCardLink ={
  fontSize: 12,
  lineHeight: 1,
  fontWeight: 600,
  color: "#fff",
}
const xData = [
  {
    title: 'xAssets',
    info:'xChain your assets to work on any supported chain with ease',
    circle: wwLeft
  },
  {
    title: 'xApps',
    info:'xChain your apps to multiple chains with minimal effort',
    circle: wwCenter
  },
  {
    title: 'xData',
    info:'xChain access to data that previously lived on one chain',
    circle: wwRight
  }
]

const modalStyle={
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  p:'20px',
}
const videoStyle={
 backgroundColor: 'rgba(0,0,0,1)',
 width: '100%',
 maxWidth: 1000,
 maxheight: '90%',
 position: 'relative', 
 boxShadow: "0 0 30px 0 rgba(0,0,0,2)"
}

const video = '<iframe src="https://player.vimeo.com/video/725060552?h=773c1a597b&autoplay=1&loop=1&color=ffffff&title=0&muted=1 frameborder=" 0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />';

const IndexPage = ({ location }: PageProps) => {
  const { site } = useStaticQuery<IndexQueryType>(IndexStaticQuery)
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const logo = {
    "@type": "ImageObject",
    "url": `${site.siteMetadata.siteUrl}/logo-and-name-stacked.png`,
    "height": "146",
    "width": "146"
  }
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://wormholenetwork.com#organization",
    mainEntityOfPage: "https://wormholenetwork.com#organization",
    url: "https://wormholenetwork.com",
    name: "Wormhole",
    sameAs: [
      "https://github.com/certusone/wormhole",
      "https://t.me/wormholecrypto",
      "https://twitter.com/wormholecrypto",
      "https://wormholebridge.com",
      "https://wormholecrypto.medium.com",
      "https://discord.gg/wormholecrypto",
    ],
    alternateName: [
      "wormhole network",
      "wormhole protocol",
      "wormhole bridge",
      "wormhole crypto",
      "certus one wormhole",
      "solana wormhole",
      "SOL wormhole",
      "terra wormhole",
      "LUNA wormhole",
      "ethereum wormhole",
      "ETH wormhole",
      "binance wormhole",
      "BSC wormhole",
      "oasis wormhole",
      "ROSE wormhole",
      "avalanche wormhole",
      "AVAX wormhole"
    ],
    description: "A cross-chain messaging protocol.",
    image: logo,
    logo: logo
  }

  const iCard = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, [])

  useEffect(() => {

    gsap.from(iCard.current,{
      y: 150, 
      opacity: 0, 
      duration: 1,
      ease: 'power4.easeIn',
      scrollTrigger:{
        trigger: iCard.current,
      }
    })

  }, [])
 

  return (
    <Layout>
       <SEO
        description="The best of blockchains. Move information and value anywhere."
        pathname={location.pathname}
      >
        <script type="application/ld+json">
          {JSON.stringify(structuredData, undefined, 4)}
        </script>
      </SEO>

      <Box
        sx={{
          textAlign: 'center',
          position: 'relative',
          pt: {xs: 15, md:21.7},
          pb: {xs: 15, md:20},
          px: 2
        }}
      > 
        <Line1 bottomLineWidth="15vw"/>
          
        <Typography variant="h1">xChain everything.</Typography>
        <Box sx={{
           maxWidth: '1000px',
           mx: 'auto',
           mt: 7.5
        }}>
          <Player loop autoplay  src={heroJson} style={{aspectRatio:'16/9'}} > </Player>
        </Box>
        <Box
          sx={{
            maxWidth: '715px',
            mx: 'auto',
            mt: '-8.7%'
          }}
        >
          <Typography component="p" variant="h3" sx={{mb: 2}}>
            More apps. More assets. More data. More users.
          </Typography>
          <Typography>
            Harnessing the power of generic messaging and a single SDK, the Wormhole interoperability protocol makes xChain movement more feature-rich than ever. Explore more about how to grow your userbase by going xChain. 
          </Typography>
          <Button
            sx={{mt: 5}}
            variant="outlined"
            endIcon={<ArrowRight/>}
            component={RouterLink}
            to={solutions}
            >
            .Explore solutions 
          </Button>
        </Box>
      </Box>

      <Box sx={{textAlign: 'center', px:2 , position: 'relative'}} >

        <Typography  variant="h2">What X. Why X.</Typography>
        
        <Box sx={{  maxWidth: '420px', mx: 'auto',  mt: 3.75 }} >
            <Typography component="p" variant="h3" sx={{mb: 2}}>
              The next wave of web3 will be powered by xChain.
            </Typography>
            <Typography >
              Since October 2020, Wormhole has been a leader in xChain and continues to evolve to meet the changing needs of web3. 
            </Typography>
            <Button
            sx={{mt: 5, mb:{xs: 5, md:0}}}
            variant="outlined"
            endIcon={<ArrowRight/>}
            onClick={handleOpen}
            >
            .View video
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={modalStyle}
          
          >
          <Box sx={videoStyle}>
          <Button
            onClick={handleClose}
            sx={{
              width: 30,
              height: 30,
              border: '1px solid #fff',
              borderRadius: '50%',
              position: 'absolute',
              right: -15,
              top: -15,
              display: 'block',
              zIndex: 2,
              backgroundColor:'#fff',
              'svg':{
                fill: '#000',
                transition: "250ms cubic-bezier(0.4, 0, 0.2, 1)",
              },
              '&:hover':{
                backgroundColor:'#fff',
                'svg':{
                  transform:'scale(1.25)', 
                  fill:'red'
                },
              }
            }}
            >
            <CloseIcon />
          </Button>
            <div style={{padding: '56.25% 0 0 0', position: 'relative'}}><iframe src="https://player.vimeo.com/video/725060552?h=773c1a597b&autoplay=1&loop=1&color=ffffff&title=0&byline=0&portrait=0" style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}} frameBorder={0} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen /></div>
          </Box>
        </Modal>

        </Box>

        <Box sx={{maxWidth:"830px", mx:'auto', mt:{xs:7.5, md:15.25}, mb: 21}}>
          <Grid container spacing={2} >
            
            {xData.map((data)=>(

              <Grid key={data.title} item xs={12} md={4} sx={{position: 'relative',   minHeight: {xs:250, md:320}, display: 'flex', alignItems:'center', justifyContent:'center', flexDirection:'column'}}>
                <Box sx={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} >
                  <Player loop  autoplay  src={data.circle} style={{width:320, height:320}}></Player>
                </Box>
                <Typography variant="h2">{data.title}</Typography>
                <Typography variant="body1" sx={{maxWidth:"220px", mx:'auto', mt: 1.6}}>{data.info}</Typography>
              </Grid>

              ))}

          </Grid>  
        </Box>  



      </Box>  

      <Box ref={iCard} sx={{ textAlign:"center", px:2,pt:8, pb: {xs: 10, md:24} }}>
              <Box
                sx={{
                  background: 'rgba(0, 0, 0, 0.1)',
                  border: '0.3px solid #FFFFFF',
                  backdropFilter: 'blur(15px)',
                  maxWidth: 926,
                  mx:'auto',
                  py: 14,
                  position:'relative',
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
                  },
                }}
              >
                <Typography variant="h2" sx={{maxWidth:'520px',mx:'auto', mb: 2.75}}>One integration to rule them all.</Typography>
                <Typography sx={{maxWidth:'350px',mx:'auto',}}>Wormhole provides a low lift, low code solution for multiple xChain use cases. </Typography>
          </Box>

      </Box>

      
      <Integrations />      

          
    </Layout>
  )
}

type IndexQueryType = {
  site: {
    siteMetadata: {
      siteUrl: string
    }
  }
}
const IndexStaticQuery = graphql`
  query Index {
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`

export default IndexPage
 
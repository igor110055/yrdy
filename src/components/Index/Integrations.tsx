
import React, {useRef, useEffect  } from "react";
import { Box, Typography,  Divider } from "@mui/material";
import Card from './Card';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {Line7} from '../Lines';

const snipet1=`struct WormholeMsg {
  uint8 version;
  uint32 timestamp;
  uint32 nonce;
  uint16 emitterChainId;
  bytes32 emitterAddress;
  uint64 sequence;
  uint8 consistencyLevel;
  bytes payload;

  uint32 guardianSetIndex;
  Signature[] signatures;

  bytes32 hash;
}`;

const Integrations = () => {

  const snipets = useRef(null);
  const snipetsText = useRef(null);


  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, [])

  useEffect(() => {
    function stopTrigger() {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: snipets.current,
          start: "top 40%",
          end: "+=720",
          scrub: true,
          pin: true,
        },
      });

      return tl;
    }
    const master = gsap.timeline();
    master.add(stopTrigger()); 
  }, []);


  return (
    <Box sx={{position: 'relative',}}>
      <Line7/> 
      <Box sx={{ maxWidth:'1092px',px:2, mx:'auto', mb: {xs: 10, md:36}}}>
          
          <Typography variant="h2" sx={{maxWidth:'540px',textAlign:{ xs:'center', md:'initial'}, mx:{ xs:'auto', md:0}, mb: 2.75}}>xChain easier with configurable integrations.</Typography>
          <Typography sx={{maxWidth:'510px',textAlign:{ xs:'center', md:'initial'}, mx:{ xs:'auto', md:0}}}>The Wormhole SDK covers a wide range of use cases to make xChain simpler for tokens, NFTs, apps, and other generic messaging applications. </Typography>

          <Box
            
            sx={{
              display: {sx: 'block',md:'flex'},
              justifyContent: "space-between",
            }}
          >
            
            <Box ref={snipetsText}  sx={{maxWidth: {xs:'100%', md:536} , flex: '0 0 auto',  mt: {xs:6, md:11.25}}}>

              <Box sx={{
                px: 4.35,
                py: 6.25,
                background: 'rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                backdropFilter: 'blur(15px)',
              }}>
              <Typography variant="h4" sx={{mb: 2.5 }}>.easier composability</Typography>
              <Typography >With Wormhole, applications on different chains work better together. So your lending protocols on Solana can leverage an insurance protocol on Ethereum, with ease. </Typography>
              </Box>
                <Divider sx={{
                  my: {xs:5, md:10},
                  width: 95,
                  background: '#fff',
                  height: '1px'
                }} />

                <Box sx={{
                  px: 4.35,
                  py: 6.25,
                  background: 'rgba(0, 0, 0, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  backdropFilter: 'blur(15px)',
                }}>
                  <Typography variant="h4" sx={{mb: 2.5 }}>.support for multiple runtimes</Typography>
                  <Typography>Including EVM, EVM+, Solana, CosmWASM and Algorand.</Typography>
                </Box>

                <Divider sx={{
                  my: {xs:5, md:10},
                  width: 95,
                  background: '#fff',
                  height: '1px'
                }} />

                <Box sx={{
                  px: 4.35,
                  py: 6.25,
                  background: 'rgba(0, 0, 0, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  backdropFilter: 'blur(15px)',
                }}>
                  <Typography variant="h4" sx={{mb: 2.5 }}>.modular architecture</Typography>
                  <Typography>Build protocols on top of Wormhole that can use data, assets, and messages from other chains.</Typography>
                </Box>
            </Box>
            
              <Box ref={snipets} sx={{
                maxWidth: '405px',
                width: '100%',
                transform: {lg:'translateX(20px)'},
                position: 'relative', 
                display:{xs:'none', md:'block'}
              }}>
                <Box sx={{position:'absolute',top:0, right:0, zIndex:3, width:'100%'}}><Card title="Create a super xAsset"  snipet={snipet1} bg="#0B1025" /></Box>
                <Box sx={{position:'absolute',top:-20, right:-20, zIndex:2, width:'100%', opacity:.7}}><Card title=""  snipet={snipet1} bg="#0B1025" /></Box>
                <Box sx={{position:'absolute',top:-40, right:-40, zIndex:1, width:'100%', opacity:.5}}><Card title=""  snipet={snipet1} bg="#0B1025" /></Box>
                
              </Box>
            
          </Box>   
              
        
      </Box>
    </Box>
  )
}

export default Integrations
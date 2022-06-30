import React from 'react'
import { Box,  Button, Typography } from "@mui/material";
import ArrowRight from '../../images/arrow-right.inline.svg';
import SwipeableViews from 'react-swipeable-views';
import Card from '../Index/Card';

const send =`//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Wormhole/IWormhole.sol";

contract Messenger {
    address private wormhole_core_bridge_address = address(0xC89Ce4735882C9F0f0FE26686c53074E09B0D550);
    IWormhole core_bridge = IWormhole(wormhole_core_bridge_address);

    function sendMsg(bytes memory str) public returns (uint64 sequence) {
    //Publish Msg takes uint32 nonce, bytes payload, uint8 consistency level
    sequence = core_bridge.publishMessage(nonce, str, 1);
    nonce = nonce+1;
  }
}`

const format = `struct WormholeMsg {
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
}`

const receive =`
function receiveWormholeMsg(bytes memory encodedMsg) public {
  (IWormhole.VM memory vm, bool valid, string memory reason) = core_bridge.parseAndVerifyVM(encodedMsg);
  
  //1. Check Wormhole Guardian Signatures
  require(valid, reason);

  //2. Check if the Emitter Chain contract is registered
  require(_applicationContracts[vm.emitterChainId] == vm.emitterAddress, "Invalid Emitter Address!");

  //3. Check that the message hasn't already been processed
  require(!_completedMessages[vm.hash], "Message already processed");
  _completedMessages[vm.hash] = true;

  //Do the thing
  mymsg = string(vm.payload);
}
`

const btn ={
  height: 60, 
  justifyContent: 'flex-start', 
  fontWeight: 600, 
  fontSize: 15, 
  '&.active':{
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    backdropFilter: 'blur(15px)',
    pointerEvents:'none',
    '& svg':{
      transform: 'rotate(90deg)'
    }
    
  }
  
}

const Contracts = () => {

  const [index, setIndex] = React.useState(0);

  return (
    <Box sx={{maxWidth: 992,px:2, mx:'auto', pb: {xs:10, md:25}}}>
        
        <Box sx={{maxWidth: 692, mx:'auto', textAlign: 'center', mb:7.8}}>
          <Typography variant="h2" sx={{mb:2.5}}>xChain messages as easily as calling a contract.</Typography>
          <Typography>Explore our messaging docs:</Typography>
        </Box>
        
        <Box sx={{display: 'grid', gridTemplateColumns:{xs:'repeat(1, 1fr)', sm:'repeat(3, 1fr)'}, gap:2.1, mb:2}}>
          <Button  className={index == 0 ? 'active':''} variant="outlined" component="button"  endIcon={<ArrowRight/>}  sx={btn}  onClick={()=>setIndex(0)} >.Sending</Button>
          <Button  className={index == 1 ? 'active':''} variant="outlined" endIcon={<ArrowRight/>} sx={btn}  onClick={()=>setIndex(1)}>.Relaying</Button>
          <Button  className={index == 2 ? 'active':''} variant="outlined" endIcon={<ArrowRight/>} sx={btn}  onClick={()=>setIndex(2)}>.Recieving</Button>
        </Box>
        <SwipeableViews
         index={index}
         style={{paddingBottom: '20px'}}
        >
          <Card title="" bg="" snipet={send} />  
          <Card title="" bg="" snipet={format} />
          <Card title="" bg="" snipet={receive} /> 
        </SwipeableViews>
        
      </Box>
  )
}

export default Contracts
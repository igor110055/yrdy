import React, { useEffect } from "react";
import { Box, Typography} from "@mui/material";
import { PageProps } from "gatsby";
import { SEO } from "../components/SEO";
import Layout from "../components/Layout";
import ExplorerSearch from "../components/ExplorerSearch/ExplorerSearch"
import ExplorerStats from "../components/ExplorerStats/ExplorerStats"
import NetworkSelect from "../components/NetworkSelect";


interface ExplorerQueryValues {
  emitterChain: number;
  emitterAddress: string;
  sequence: string;
  txId: string;
}


const explorer = ({ location }: PageProps) => {
  const [emitterChain, setEmitterChain] =
  React.useState<ExplorerQueryValues["emitterChain"]>();
const [emitterAddress, setEmitterAddress] =
  React.useState<ExplorerQueryValues["emitterAddress"]>();
const [sequence, setSequence] =
  React.useState<ExplorerQueryValues["sequence"]>();
const [txId, setTxId] = React.useState<ExplorerQueryValues["txId"]>();
const [doneReadingQueryParams, setDoneReadingQueryParams] =
  React.useState<boolean>(false);

React.useEffect(() => {
  if (location.search) {
    // take searchparams from the URL and set the values in the form
    const searchParams = new URLSearchParams(location.search);

    const chain = searchParams.get("emitterChain");
    const address = searchParams.get("emitterAddress");
    const seq = searchParams.get("sequence");
    const tx = searchParams.get("txId");

    // if the search params are different form values, update state
    if (Number(chain) !== emitterChain) {
      setEmitterChain(Number(chain) || undefined);
    }
    if (address !== emitterAddress) {
      setEmitterAddress(address || undefined);
    }
    if (seq !== sequence) {
      setSequence(seq || undefined);
    }
    if (tx !== txId) {
      setTxId(tx || undefined);
    }
  } else {
    // clear state
    setEmitterChain(undefined);
    setEmitterAddress(undefined);
    setSequence(undefined);
    setTxId(undefined);
  }
  // be explicit about when it is ok to render
  setDoneReadingQueryParams(true);
}, [location.search]);
  return (
    <Layout>
       <SEO
        title="Explorer"
        pathname={location.pathname}
      />
      <Box sx={{pt: {xs:12, md:26}, px:2, textAlign: 'center'}} >
        <Typography variant="h2" component="h1">Explorer</Typography>
      </Box>
      
      <Box sx={{maxWidth: 1192, mx:'auto', pt:{xs:0, md:7.5},pb: {xs:12, md:33.75} , px:2}} >
        <Box sx={{pt: 7.5}}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <Box sx={{ flexGrow: 1 }} />
            <NetworkSelect />
          </Box>
        </Box>

        <Box >

       
            {doneReadingQueryParams && <>

            <ExplorerSearch location={location} />

            {!(emitterChain && emitterAddress && sequence) && // if there is no messageId query &&
              !txId && (                                      // if there is no transactionId query
                <ExplorerStats
                  emitterChain={emitterChain}
                  emitterAddress={emitterAddress}
                />
              )}

            </>}
        </Box>
      </Box>

 
    </Layout>
  )
}

export default explorer
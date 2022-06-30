import {
  Box,
  CircularProgress,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { PageProps } from "gatsby";
import { SEO } from "../components/SEO";
import Layout from "../components/Layout";
import { Heartbeat } from "@certusone/wormhole-sdk/lib/esm/proto/gossip/v1/gossip";
import {
  GrpcWebImpl,
  PublicRPCServiceClientImpl,
} from "@certusone/wormhole-sdk/lib/esm/proto/publicrpc/v1/publicrpc";
import ReactTimeAgo from "react-time-ago";
import NetworkSelect from "../components/NetworkSelect";
import { useNetworkContext } from "../contexts/NetworkContext";
import ChainIcon from "../components/ChainIcon";
import { ChainId } from "@certusone/wormhole-sdk";
import { ChainID } from "../utils/consts";

import OpenIcon from '../images/open.inline.svg'
import CloseIcon from '../images/close.inline.svg'

const GuardianRow = ({ hb }: { hb: Heartbeat }) => {
  const [open, setOpen] = React.useState(false);

    // const hbNetworks = hb.networks.filter(function(element) {
    //   return element.id !== 3; //remote Terra from networks
    // });

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <OpenIcon /> : <CloseIcon />}
          </IconButton>
        </TableCell>
        <TableCell sx={{pl:0}}>
          <strong>{hb.nodeName}</strong>
          <br />
          {hb.guardianAddr}
        </TableCell>
        <TableCell sx={{ whiteSpace: "nowrap" }}>{hb.version}</TableCell>
        <TableCell sx={{ whiteSpace: "nowrap" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {hb.networks.map((network) => (
                <ChainIcon key={network.id} chainId={network.id as ChainId} />
            ))}
          </Box>
        </TableCell>
        <TableCell align="right">{hb.counter}</TableCell>
        <TableCell align="right" sx={{ "& > time": { whiteSpace: "nowrap" } }}>
          <ReactTimeAgo
            date={new Date(Number(hb.timestamp.slice(0, -6)))}
            timeStyle="round"
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={{pl: 10,pr:0,  py: 0, borderBottom: open ? '"1px solid rgba(255, 255, 255, .3)"' : 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell  sx={{fontSize: 14, pl: 0}}><strong>Network</strong></TableCell>
                    <TableCell  sx={{fontSize: 14}}><strong>Contract Address</strong></TableCell>
                    <TableCell  sx={{fontSize: 14}} align="right"><strong>Block Height</strong></TableCell>
                    <TableCell  sx={{fontSize: 14}} align="right"><strong>Error Count</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody sx={{'& tr:last-of-type td':{border:0}}}>
                  {hb.networks.map((n) => (
                    <TableRow key={n.id}>
                      <TableCell sx={{pl: 0}}>
                      <Box sx={{ display: "flex", alignItems: "center" }}><Box component="span" sx={{mr:2}}><ChainIcon chainId={n.id as ChainId} /></Box> {ChainID[n.id]}</Box>
                      </TableCell>
                      <TableCell>{n.contractAddress}</TableCell>
                      <TableCell align="right">{n.height}</TableCell>
                      <TableCell align="right">{n.errorCount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const GuardiansList = () => {
  const { activeNetwork } = useNetworkContext();
  const [heartbeats, setHeartbeats] = React.useState<{
    [networkName: string]: { [nodeName: string]: Heartbeat };
  }>({ devnet: {}, testnet: {}, mainnet: {} });

  // TODO: add all heartbeats at once
  const addHeartbeat = React.useCallback(
    (networkName: string, hbObj: Heartbeat) => {
      hbObj.networks.sort((a: any, b: any) => a.id - b.id);
      const { nodeName } = hbObj;
      setHeartbeats((heartbeats) => ({
        ...heartbeats,
        [networkName]: { ...heartbeats[networkName], [nodeName]: hbObj },
      }));
    },
    []
  );

  React.useEffect(() => {
    let cancelled = false;
    const rpc = new GrpcWebImpl(
      String(activeNetwork.endpoints.guardianRpcBase),
      {}
    );
    const publicRpc = new PublicRPCServiceClientImpl(rpc);
    const interval = setInterval(() => {
      (async () => {
        try {
          const response = await publicRpc.GetLastHeartbeats({});
          if (!cancelled) {
            response.entries.map((entry) =>
              entry.rawHeartbeat
                ? addHeartbeat(activeNetwork.name, entry.rawHeartbeat)
                : null
            );
          }
        } catch (e) {
          console.error("GetLastHeartbeats error:", e);
        }
      })();
    }, 3000);
    return () => {
      clearInterval(interval);
      cancelled = true;
    };
  });
  const activeHeartbeats = heartbeats[activeNetwork.name];
  const guardianCount = Object.keys(activeHeartbeats).length;
  const foundHeartbeats = guardianCount > 0;
  const sortedHeartbeats = React.useMemo(() => {
    const arr = [...Object.values(activeHeartbeats)];
    arr.sort((a, b) => a.nodeName.localeCompare(b.nodeName));
    return arr;
  }, [activeHeartbeats]);
  return (
    <>
      <Box
        sx={{ 
          mb: 2.5, 
          display: {xs:'block', md:'flex'},
          textAlign: {xs:'center', md:'initial'},
          flexWrap: "wrap",
          alignItems: "center"
         
        }}
      >
        <Typography variant="subtitle1">
          {foundHeartbeats
            ? `${guardianCount} Guardian${
                guardianCount > 1 ? "s" : ""
              } currently broadcasting`
            : `Listening for Guardian heartbeats...`}
        </Typography>
        <Box sx={{  flexGrow: 1, mt:{xs:2, md:0}  }} />
          <NetworkSelect />
        </Box>
      <Box
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.25)",
          border: '1px solid rgba(255, 255, 255, .3)',
          backdropFilter: 'blur(15px)',
        }}
      >
        {foundHeartbeats ? (
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell ></TableCell>
                  <TableCell variant="head" sx={{pl:0,pr: 2.5}}>Guardian</TableCell>
                  <TableCell variant="head" sx={{py: 2.5}}>Version</TableCell>
                  <TableCell variant="head" sx={{py: 2.5}}>Networks</TableCell>
                  <TableCell variant="head" sx={{py: 2.5}} align="right">Heartbeat</TableCell>
                  <TableCell variant="head" align="right" sx={{py: 2.5}}>Last Heartbeat</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedHeartbeats.map((hb) => (
                  <GuardianRow key={hb.nodeName} hb={hb} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Box sx={{ textAlign: "center", p: 10 }}>
            <CircularProgress />
          </Box>
        )}
      </Box>
    </>
  );
};



const network = ({ location }: PageProps) => {


  return (
    <Layout>
       <SEO
        title="Stats"
        pathname={location.pathname}
      />
      <Box sx={{pt: {xs:12, md:26}, px:2, textAlign: 'center'}} >
        <Typography variant="h2" component="h1">Meet the Guardians</Typography>
        <Typography sx={{mt:3.75, maxWidth: 444, mx:'auto'}}>The 19 guardians in Wormhole's guardian network each hold equal weight in governance consensus.</Typography>
      </Box>
      
      <Box sx={{maxWidth: 1192,minHeight: 600, mx:'auto', pt: {xs:7, md:15.5},pb: {xs:12, md:33.75}, px:2}} >
        <GuardiansList />
      </Box>
     
    </Layout>
  )
}

export default network
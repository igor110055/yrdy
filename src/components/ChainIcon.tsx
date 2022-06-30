import * as React from "react";
import acalaIcon from "../images/icons/acala.svg";
import binanceChainIcon from "../images/icons/bsc.svg";
import ethereumIcon from "../images/icons/eth.svg";
import solanaIcon from "../images/icons/solana.svg";
import terraIcon from "../images/icons/terra.svg";
import polygonIcon from "../images/icons/polygon.svg";
import avalancheIcon from "../images/icons/avalanche.svg";
import oasisIcon from "../images/icons/oasis.svg";
import fantomIcon from "../images/icons/fantom.svg";
import auroraIcon from "../images/icons/aurora.svg";
import karuraIcon from "../images/icons/karura.svg"
import {
  ChainId,
  CHAIN_ID_ACALA,
  CHAIN_ID_AVAX,
  CHAIN_ID_BSC,
  CHAIN_ID_ETH,
  CHAIN_ID_OASIS,
  CHAIN_ID_POLYGON,
  CHAIN_ID_SOLANA,
  CHAIN_ID_TERRA,
  CHAIN_ID_FANTOM,
  CHAIN_ID_AURORA,
  CHAIN_ID_KARURA,
} from "@certusone/wormhole-sdk";
import { chainEnums } from "../utils/consts";
import { Box } from "@mui/material";

const chainIdToSrc = {
  [CHAIN_ID_ACALA]: acalaIcon,
  [CHAIN_ID_SOLANA]: solanaIcon,
  [CHAIN_ID_ETH]: ethereumIcon,
  [CHAIN_ID_TERRA]: terraIcon,
  [CHAIN_ID_BSC]: binanceChainIcon,
  [CHAIN_ID_POLYGON]: polygonIcon,
  [CHAIN_ID_AVAX]: avalancheIcon,
  [CHAIN_ID_OASIS]: oasisIcon,
  [CHAIN_ID_FANTOM]: fantomIcon,
  [CHAIN_ID_AURORA]: auroraIcon,
  [CHAIN_ID_KARURA]: karuraIcon,
};

const ChainIcon = ({ chainId }: { chainId: ChainId }) =>
  chainIdToSrc[chainId] ? (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        px: chainId === CHAIN_ID_ETH ? 0 : 0.25,
        "&:first-of-type": { pl: 0 },
        "&:last-of-type": { pr: 0 },
      }}
    >
      <img
        src={chainIdToSrc[chainId]}
        alt={chainEnums[chainId] || ""}
        style={{ width: 16 }}
      />
    </Box>
  ) : null;

export default ChainIcon;

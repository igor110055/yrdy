import {
  ChainId,
  CHAIN_ID_ACALA,
  CHAIN_ID_ALGORAND,
  CHAIN_ID_AURORA,
  CHAIN_ID_AVAX,
  CHAIN_ID_BSC,
  CHAIN_ID_CELO,
  CHAIN_ID_ETH,
  CHAIN_ID_ETHEREUM_ROPSTEN,
  CHAIN_ID_FANTOM,
  CHAIN_ID_KARURA,
  CHAIN_ID_KLAYTN,
  CHAIN_ID_OASIS,
  CHAIN_ID_POLYGON,
  CHAIN_ID_SOLANA,
  CHAIN_ID_TERRA,
  isEVMChain,
} from "@certusone/wormhole-sdk";


import fantomIcon from "../images/icons/fantom.svg";
import oasisIcon from "../images/icons/oasis.svg";
import polygonIcon from "../images/icons/polygon.svg";
import terraIcon from "../images/icons/terra.svg";
import solanaIcon from "../images/icons/solana.svg";
import ethIcon from "../images/icons/eth.svg";
import bscIcon from "../images/icons/bsc.svg";
import acalaIcon from "../images/icons/acala.svg";
import algorandIcon from "../images/icons/algorand.svg";
import auroraIcon from "../images/icons/aurora.svg";
import avaxIcon from "../images/icons/avax.svg";
import celoIcon from "../images/icons/celo.svg";
import karuraIcon from "../images/icons/karura.svg";
import klaytnIcon from "../images/icons/klaytn.svg";





export interface ChainInfo {
  id: ChainId;
  name: string;
  logo: string;
}

export type Cluster = "devnet" | "testnet" | "mainnet";
export const CLUSTER: Cluster =
  process.env.GATSBY_DEFAULT_NETWORK === "mainnet"
    ? "mainnet"
    : process.env.GATSBY_DEFAULT_NETWORK === "testnet"
    ? "testnet"
    : "devnet";



export const CHAINS: ChainInfo[] =
  CLUSTER === "mainnet"
    ? [
        {
          id: CHAIN_ID_AURORA,
          name: "Aurora",
          logo: auroraIcon,
        },
        {
          id: CHAIN_ID_AVAX,
          name: "Avalanche",
          logo: avaxIcon,
        },
        {
          id: CHAIN_ID_BSC,
          name: "Binance Smart Chain",
          logo: bscIcon,
        },
        {
          id: CHAIN_ID_CELO,
          name: "Celo",
          logo: celoIcon,
        },
        {
          id: CHAIN_ID_ETH,
          name: "Ethereum",
          logo: ethIcon,
        },
        {
          id: CHAIN_ID_FANTOM,
          name: "Fantom",
          logo: fantomIcon,
        },
        {
          id: CHAIN_ID_KARURA,
          name: "Karura",
          logo: karuraIcon,
        },
        {
          id: CHAIN_ID_OASIS,
          name: "Oasis",
          logo: oasisIcon,
        },
        {
          id: CHAIN_ID_POLYGON,
          name: "Polygon",
          logo: polygonIcon,
        },
        {
          id: CHAIN_ID_SOLANA,
          name: "Solana",
          logo: solanaIcon,
        },
        {
          id: CHAIN_ID_TERRA,
          name: "Terra",
          logo: terraIcon,
        },
      ]
    : CLUSTER === "testnet"
    ? [
        {
          id: CHAIN_ID_ACALA,
          name: "Acala",
          logo: acalaIcon,
        },
        {
          id: CHAIN_ID_ALGORAND,
          name: "Algorand",
          logo: algorandIcon,
        },
        {
          id: CHAIN_ID_AURORA,
          name: "Aurora",
          logo: auroraIcon,
        },
        {
          id: CHAIN_ID_AVAX,
          name: "Avalanche",
          logo: avaxIcon,
        },
        {
          id: CHAIN_ID_BSC,
          name: "Binance Smart Chain",
          logo: bscIcon,
        },
        {
          id: CHAIN_ID_CELO,
          name: "Celo",
          logo: celoIcon,
        },
        {
          id: CHAIN_ID_ETH,
          name: "Ethereum (Goerli)",
          logo: ethIcon,
        },
        {
          id: CHAIN_ID_ETHEREUM_ROPSTEN,
          name: "Ethereum (Ropsten)",
          logo: ethIcon,
        },
        {
          id: CHAIN_ID_FANTOM,
          name: "Fantom",
          logo: fantomIcon,
        },
        {
          id: CHAIN_ID_KARURA,
          name: "Karura",
          logo: karuraIcon,
        },
        {
          id: CHAIN_ID_KLAYTN,
          name: "Klaytn",
          logo: klaytnIcon,
        },
        {
          id: CHAIN_ID_OASIS,
          name: "Oasis",
          logo: oasisIcon,
        },
        {
          id: CHAIN_ID_POLYGON,
          name: "Polygon",
          logo: polygonIcon,
        },
        {
          id: CHAIN_ID_SOLANA,
          name: "Solana",
          logo: solanaIcon,
        },
        {
          id: CHAIN_ID_TERRA,
          name: "Terra",
          logo: terraIcon,
        },
      ]
    : [
        {
          id: CHAIN_ID_ALGORAND,
          name: "Algorand",
          logo: algorandIcon,
        },
        {
          id: CHAIN_ID_BSC,
          name: "Binance Smart Chain",
          logo: bscIcon,
        },
        {
          id: CHAIN_ID_ETH,
          name: "Ethereum",
          logo: ethIcon,
        },
        {
          id: CHAIN_ID_SOLANA,
          name: "Solana",
          logo: solanaIcon,
        },
        {
          id: CHAIN_ID_TERRA,
          name: "Terra",
          logo: terraIcon,
        },
      ];




export type ChainsById = { [key in ChainId]: ChainInfo };
export const CHAINS_BY_ID: ChainsById = CHAINS.reduce((obj, chain) => {
  obj[chain.id] = chain;
  return obj;
}, {} as ChainsById);



export const TVL_URL =
  "https://europe-west3-wormhole-315720.cloudfunctions.net/mainnet-notionaltvl";
export const TVL_CUMULATIVE_URL =
  "https://europe-west3-wormhole-315720.cloudfunctions.net/mainnet-notionaltvlcumulative?totalsOnly=true";

export const NOTIONAL_TRANSFERRED_URL =
  "https://europe-west3-wormhole-315720.cloudfunctions.net/mainnet-notionaltransferredfrom";


export const TOTAL_TRANSACTIONS_WORMHOLE = `https://europe-west3-wormhole-315720.cloudfunctions.net/mainnet-totals?groupBy=address`;



export const VAA_EMITTER_ADDRESSES = [
  `${CHAIN_ID_SOLANA}:ec7372995d5cc8732397fb0ad35c0121e0eaa90d26f828a534cab54391b3a4f5`, //SOLANA TOKEN
  `${CHAIN_ID_SOLANA}:0def15a24423e1edd1a5ab16f557b9060303ddbab8c803d2ee48f4b78a1cfd6b`, //SOLAN NFT
  `${CHAIN_ID_ETH}:0000000000000000000000003ee18b2214aff97000d974cf647e7c347e8fa585`, //ETH token
  `${CHAIN_ID_ETH}:0000000000000000000000006ffd7ede62328b3af38fcd61461bbfc52f5651fe`, //ETH NFT
  `${CHAIN_ID_TERRA}:0000000000000000000000007cf7b764e38a0a5e967972c1df77d432510564e2`, //terra
  `${CHAIN_ID_BSC}:000000000000000000000000b6f6d86a8f9879a9c87f643768d9efc38c1da6e7`, //bsc
  `${CHAIN_ID_BSC}:0000000000000000000000005a58505a96d1dbf8df91cb21b54419fc36e93fde`, //bsc nft
  `${CHAIN_ID_POLYGON}:0000000000000000000000005a58505a96d1dbf8df91cb21b54419fc36e93fde`, //Polygon
  `${CHAIN_ID_POLYGON}:00000000000000000000000090bbd86a6fe93d3bc3ed6335935447e75fab7fcf`, //Polygon nft
  `${CHAIN_ID_AVAX}:0000000000000000000000000e082f06ff657d94310cb8ce8b0d9a04541d8052`, //AVAX
  `${CHAIN_ID_AVAX}:000000000000000000000000f7b6737ca9c4e08ae573f75a97b73d7a813f5de5`, //AVAX nft
  `${CHAIN_ID_OASIS}:0000000000000000000000005848c791e09901b40a9ef749f2a6735b418d7564`, //Oasis
  `${CHAIN_ID_OASIS}:00000000000000000000000004952D522Ff217f40B5Ef3cbF659EcA7b952a6c1`, //Oasis nft
  `${CHAIN_ID_AURORA}:00000000000000000000000051b5123a7b0F9b2bA265f9c4C8de7D78D52f510F`, //Aurora
  `${CHAIN_ID_AURORA}:0000000000000000000000006dcC0484472523ed9Cdc017F711Bcbf909789284`, //Aurora nft
  `${CHAIN_ID_FANTOM}:0000000000000000000000007C9Fc5741288cDFdD83CeB07f3ea7e22618D79D2`, //Fantom
  `${CHAIN_ID_FANTOM}:000000000000000000000000A9c7119aBDa80d4a4E0C06C8F4d8cF5893234535`, //Fantom nft
  `${CHAIN_ID_KARURA}:000000000000000000000000ae9d7fe007b3327AA64A32824Aaac52C42a6E624`, //Karura
  `${CHAIN_ID_KARURA}:000000000000000000000000b91e3638F82A1fACb28690b37e3aAE45d2c33808`, //Karura nft
];

export const getChainShortName = (chainId: ChainId) => {
  return chainId === CHAIN_ID_BSC ? "BSC" : CHAINS_BY_ID[chainId]?.name;
};

export const COLOR_BY_CHAIN_ID: { [key in ChainId]?: string } = {
  [CHAIN_ID_SOLANA]: "#31D7BB",
  [CHAIN_ID_ETH]: "#8A92B2",
  [CHAIN_ID_TERRA]: "#5493F7",
  [CHAIN_ID_BSC]: "#F0B90B",
  [CHAIN_ID_POLYGON]: "#8247E5",
  [CHAIN_ID_AVAX]: "#E84142",
  [CHAIN_ID_OASIS]: "#0092F6",
  [CHAIN_ID_AURORA]: "#23685A",
  [CHAIN_ID_FANTOM]: "#1969FF",
  [CHAIN_ID_KARURA]: "#FF4B3B",
  [CHAIN_ID_ACALA]: "#E00F51",
};
import React, {useState, useCallback} from "react";
import {ChainInfo, CHAINS_BY_ID, getChainShortName} from "../../../utils/statsConsts";
import {ChainId, CHAIN_ID_ETH} from "@certusone/wormhole-sdk";
import {getSorted, yAxisCurrencyFormatter} from "../../../utils/helpers";
import { Box, Button, Typography,  useTheme, useMediaQuery, Fade} from "@mui/material";
import ArrowRight from '../../../images/arrow-right.inline.svg';



export interface HorizontalBarChartData {
  id: number;
  name: string;
  value: number;
  
}

export interface HorizontalBarChartProps {
  data: HorizontalBarChartData[];
  onAssetClick: (chain: ChainInfo) => void;
  totalTVL: number;
}

const HorizontalBarChart: React.FC<HorizontalBarChartProps> = (props: HorizontalBarChartProps) => {
  const {data, onAssetClick} = props;
  const sortedData = getSorted(data, 'value');
  const totalTVL = props.totalTVL
  const [mouseOverChainId, setMouseOverChainId] = useState<ChainId>(CHAIN_ID_ETH);

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const onClick = (id:number) => {
    const chain = CHAINS_BY_ID[id as ChainId];
    onAssetClick(chain);
  };

  const handleMouseOver = useCallback((chainId: ChainId) => {
    setMouseOverChainId(chainId);
  }, []);




  return (
    <>
    <table style={{minWidth: '600px'}}>
      <tbody>
      {sortedData.map((row:any) => (
        <tr
          key={row.id}
          onMouseOver={() => handleMouseOver(row.id)}
         
        >
          <td style={{padding: '8px 0'}}>
            <Box sx={{display:'flex',alignItems:'center', width:'100%', justifyContent:'flex-end'}} >
              <Typography noWrap display="inline">{getChainShortName(row.id)}</Typography>
              <Box component="img" src={CHAINS_BY_ID[row.id as ChainId].logo} sx={{width: 24, height:24, mx: '20px'}} />
            </Box>
          </td>
          <td  width="100%" height={45} >
            <Box sx={{display:'flex',alignItems:'center', width:'100%'}}  >
            <Box 
                sx={{
                  height: 30,
                  width: `calc(${(row.value/totalTVL )*100}%)`,
                  minWidth: '1%',
                  mr: '20px',
                  background: 'linear-gradient(90deg, rgba(255,255,255,0.6), rgba(255,255,255,0.1) 40%);',
                }}
                onClick={() => onClick(row.id)}
              ></Box>
            <Typography noWrap display="inline">
              {yAxisCurrencyFormatter(row.value)}
            </Typography>
              {!isSmall && (
                <>
                  { mouseOverChainId === row.id ? (
                      <Fade in>
                        <Button
                          sx={{ ml:'20px',width: 160, whiteSpace:"nowrap", flex: '0 0 auto'}}
                          variant="outlined"
                            endIcon={<ArrowRight/>}
                            onClick={() => onClick(row.id)}
                            >
                          .view assets
                        </Button>
                      </Fade>
                    ) : (
                      <Box sx={{ ml:'20px',width: 160}} />
                    )}
                </> 
              )}
            </Box>
            
          </td>
        
      
        </tr>

      ))}
      </tbody>
    </table>

    </>
  )

}

export default HorizontalBarChart;

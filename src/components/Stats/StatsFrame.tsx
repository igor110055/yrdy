import React from "react";
import {
  Box,
  Checkbox,
  FormControl,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from "@mui/material";
import {CHAINS_BY_ID} from "../../utils/statsConsts";
import {TIME_FRAMES} from "../../utils/consts";
import {ChainId} from "@certusone/wormhole-sdk";
import StatsHeader from "./StatsHeader";

interface StatsFrameProps {
  chartName: string;
  chartTotal: string;
  timeFrameText: string;
  showTimeFrame: boolean;
  displayByText: { [key: string]: string };
  displayByDefaultText: string;
  onDisplayByChange: any;
  selectedChains: ChainId[];
  onSelectedChainsChange: any;
  availableChains: ChainId[];
  allChainsSelected: any;
  onTimeFrameChange: any;
  children?: React.ReactNode;
  showTotalLabel: boolean;

}

const StatsFrame: React.FC<StatsFrameProps> = (props: StatsFrameProps) => {
  const {
    chartName,
    chartTotal,
    timeFrameText,
    showTimeFrame,
    displayByText,
    displayByDefaultText,
    onDisplayByChange,
    selectedChains,
    onSelectedChainsChange,
    availableChains,
    allChainsSelected,
    onTimeFrameChange,
    children,
    showTotalLabel
  } = props;

  return (
    <>
      <Box sx={{ mt: {xs: 10, md: 15.5}}}>
        <StatsHeader
          title={chartName}
          valueInfo={showTotalLabel && `over ${timeFrameText}` || undefined}
          value={chartTotal}
        />
        <Box sx={{
          display: {xs:'block', md:'flex'},
          textAlign: {xs:'center', md:'initial'},
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2
        }}>
          <Box sx={{mb:{xs:2, mb:0}}}>
            <Typography display="inline" variant="subtitle1" sx={{mr:2.5,fontSize:12}}>
              Display by
            </Typography>
            <ToggleButtonGroup
              value={displayByDefaultText}
              exclusive
              onChange={onDisplayByChange}
            >
              {Object.values(displayByText).map((value) => (
                <ToggleButton
                  key={value}
                  value={value}
                >
                  {value}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>
          {
            showTimeFrame && <Box>
              <FormControl>
                <Select
                  multiple
                  value={selectedChains}
                  onChange={onSelectedChainsChange}
                  renderValue={(selected: any) =>
                    selected.length === availableChains.length
                      ? "All chains"
                      : selected.length > 1
                        ? `${selected.length} chains`
                        : //@ts-ignore
                        CHAINS_BY_ID[selected[0]]?.name
                  }
                >
                  <MenuItem value="all">
                    <Checkbox
                      checked={(availableChains.length > 0 && allChainsSelected)}
                      indeterminate={
                        selectedChains.length > 0 &&
                        selectedChains.length < availableChains.length
                      }
                    />
                    <ListItemText primary="All chains"/>
                  </MenuItem>
                  {availableChains.map((option) => (
                    <MenuItem key={option} value={option}>
                      <Checkbox checked={selectedChains.indexOf(option) > -1}/>
                      <ListItemText primary={CHAINS_BY_ID[option]?.name}/>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                select
                variant="outlined"
                value={timeFrameText}
                onChange={onTimeFrameChange}
                style={{marginLeft: 8}}
              >
                {Object.keys(TIME_FRAMES).map((timeFrame) => (
                  <MenuItem key={timeFrame} value={timeFrame}>
                    {timeFrame}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          }
        </Box>
        <Box
          sx={{
            flexBasis: {xs: "100%", md: "50%"},
            textAlign: "center",
            flexGrow: 1,
            backgroundColor: "rgba(255, 255, 255, 0.05);",
            backdropFilter: 'blur(15px)',
            py: {xs: 3},
            px: {xs: 2},
            overflow: 'auto'
          }}
        >
          {children}
        </Box>
      </Box>
    </>
  )
}

export default StatsFrame;

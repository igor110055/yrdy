import React from "react";
import {Box, Button, Typography} from "@mui/material";
import {ArrowBack} from "@mui/icons-material";

interface StatsHeaderProps {
  title: string;
  valueInfo?: string;
  value?: string;
  backText?: string;
  onBackClick?: () => void;
}

const StatsHeader: React.FC<StatsHeaderProps> = (props: StatsHeaderProps) => {
  const {title, valueInfo, value, backText, onBackClick} = props;
  return (
    <>
      <Box sx={{mt: {xs: 10, md: 15.5}}}>
        {backText && (
          <Box sx={{
            display: {xs: 'block'},
            textAlign: {xs: 'left'},
            mb: 2,
          }}>
            <Button
              size="small"
              startIcon={<ArrowBack />}
              onClick={onBackClick}
            >
              {backText}
            </Button>
          </Box>
        )}
        <Box sx={{
          display: {xs: 'block', md: 'flex'},
          textAlign: {xs: 'center', md: 'initial'},
          flexWrap: "nowrap",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}>
          <Typography variant="h4">
            {title}
          </Typography>

          <Box sx={{
            display: "flex",
            flexWrap: "nowrap",
            justifyContent: {xs: 'center', md: 'flex-end'},
          }}>
            {valueInfo && (
              <Typography variant="caption" sx={{alignSelf: "flex-end", mb: 1, mr: 2, textTransform: 'lowercase'}}>
                {valueInfo}
              </Typography>
            )}
            {value && (
              <Typography variant="body2" sx={{fontSize: 32}}>
                {value}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default StatsHeader;

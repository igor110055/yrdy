import React from "react";
import {Box, Typography} from "@mui/material";
import { formatDate } from "../../../utils/time";


const  container ={
    padding: "16px",
    minWidth: "214px",
    background: "rgba(255, 255, 255, 0.95)",
    borderRadius: "4px",
    textAlign:'left'
  }
  const titleText ={
    color: "#21227E",
    fontSize: "24px",
    fontWeight: 500,
  }

  const ruler =  {
    height: "3px",
    background: 'linear-gradient(90deg, #9A52BC  4.14%, #262769 99.91%)'
  }
  const valueText = {
    color: "#000",
    fontSize: "12px",
    fontWeight: 600,
  }


const CustomTooltip = ({ active, payload, title, valueFormatter }: any) => {
  if (active && payload && payload.length) {
    return (
      <Box sx={container}>
        <Typography sx={titleText}>{title}</Typography>
        <hr style={ruler}></hr>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignitems: 'center'
        }}>
          <Typography variant="caption" sx={valueText}>
            {valueFormatter(payload[0].value)}
          </Typography>
          <Typography variant="caption" sx={valueText}>
            {formatDate(payload[0].payload.date)}
          </Typography>
        </Box>
      </Box>
    );
  }
  return null;
};

export default CustomTooltip;

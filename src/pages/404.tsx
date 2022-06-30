import * as React from "react"
import { Box, Button, Typography} from "@mui/material";
import { Link as RouterLink } from "gatsby";
import ArrowRight from '../images/arrow-right.inline.svg';
import {home} from '../utils/urls'
import Layout from "../components/Layout";



const NotFoundPage = () => {
  return (
    <Layout>
      <Box sx={{py: 30, px:2, textAlign: 'center'}} >
        <Typography variant="h1" component="h2" sx={{mb: 3.75}}>404 <Box component="span" sx={{display:'block'}}>Lightyears Away</Box></Typography>
        <Typography  sx={{mb: 3.75}}>Looks like you found your way to a black hole rather than Wormhole. Hit the reverse thrusters.</Typography>
        <Button variant="outlined" component={RouterLink} to={home} target="_blank" startIcon={<ArrowRight/>}>.back</Button>
      </Box>
    </Layout>
  )
}

export default NotFoundPage
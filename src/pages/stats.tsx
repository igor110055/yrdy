import * as React from "react"
import { Box, Typography} from "@mui/material";
import { PageProps } from "gatsby";
import { SEO } from "../components/SEO";

import Layout from "../components/Layout";

import MessageStats from "../components/Stats/MessageStats";
import TVLStats from "../components/Stats/TVLStats";

const stats = ({ location }: PageProps) => {
  return (
    <Layout>
       <SEO
        title="Stats"
        pathname={location.pathname}
      />
      <Box sx={{pt:{xs:12, md:26}, px:2, textAlign: 'center'}} >
        <Typography variant="h2" component="h1">Stats</Typography>
      </Box>
      
      <Box sx={{maxWidth: 1192, mx:'auto', pt:{xs:0, md:7.5}, pb: {xs:12, md:33.75}, px:2}} >
        <TVLStats/>
        <MessageStats/>
      </Box>

 
    </Layout>
  )
}

export default stats
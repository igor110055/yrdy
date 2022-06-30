import * as React from "react"
import { Box, Typography} from "@mui/material";
import { PageProps } from "gatsby";
import Layout from "../components/Layout"
import { SEO } from "../components/SEO";
import { Player } from '@lottiefiles/react-lottie-player';

import JoinDiscord from '../components/JoinDiscord';
import {Line3} from '../components/Lines';import dev from '../images/development.svg'
import roadmap from '../images/animations/RoadMap.json'

const next = ({ location }: PageProps) => {
  return (
    <Layout>
      <SEO
      title="Next"
      pathname={location.pathname}
    />

    <Box sx={{pt: {xs:12, md:26}, px:2, textAlign: 'center'}} >
      <Typography variant="h2" component="h1">In development.</Typography>
    </Box>
     

      <Box sx={{
            textAlign:"center", px:2,pt:8, pb: {xs: 10, md:20} }}>
              <Box
                sx={{
                  maxWidth: 1000,
                  mx:'auto',
                  px: 2,
                  py: {xs:5,md:10},
                }}
              >
                 <Player
                    loop
                    autoplay
                    src={roadmap}
                  >
                </Player>
          </Box>

      </Box>

      <JoinDiscord maxWidthContainer="" />
      <Line3 lineHeight='550px' topLineWidth="150px" />

    </Layout>
  )
}

export default next
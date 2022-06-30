import React from 'react'
import { Box, Link, Typography} from "@mui/material";
import { OutboundLink } from "gatsby-plugin-google-gtag";


 interface ProjectItem  {
  url: string;
  logo: string;
  title: string;
}

const project = {
  textDecoration:'none',
  background: 'rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, .5)',
  backdropFilter: 'blur(15px)', 
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center', 
  padding:{xs:'0 20px', sm:'0 32px'},
  height: {xs:90, sm:108},
  transition: "250ms cubic-bezier(0.4, 0, 0.2, 1)",
  '&:hover':{
    boxShadow: '0 0 30px 0 rgba(255, 255, 255, .1)',
  },
}

const ProjectSection = ({title, projectsList}:{
  title: string;
  projectsList: Array<ProjectItem>;
}) => {

  return (
    <Box sx={{
       maxWidth: 1082,
       px:2, 
       mx:'auto',
       pt:9, 
       textAlign: 'center',
      
       }}>

      <Typography component="h3" variant="h2">{title}</Typography>

    <Box sx={{display: 'grid', gridTemplateColumns: {xs:'repeat(2, 1fr)', sm:'repeat(3, 1fr)', lg:'repeat(4, 1fr)'}, gap: {xs:1.25, sm:2.5}, mt: 7.7 }}>
      {projectsList.map((item)=>(
         <Box key={item.title}>
              <Link
                component={OutboundLink}
                href={item.url}
                target="_blank"
                sx={project}
                >
                  <Box component='img' src={item.logo} alt={item.title} sx={{maxHeight:{xs: 40, sm: 60},maxWidth: '100%', objectFit: 'contain'}}/>
              </Link>
              <Typography sx={{textAlign: 'left', mt: 1, fontSize: 12}}>{item.title}</Typography>
          </Box>
        ))}
    </Box>
    
  </Box>
  )
}

export default ProjectSection;


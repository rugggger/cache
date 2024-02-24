import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Container, Typography } from "@mui/material";


interface Props {
  title: string;  
  children: any;
}

const Page = (props: Props) => {
    const { title } = props;
  return (
    <Container >
    <Box sx={{ flexGrow: 1, marginTop:'2rem' }}>
        <Typography variant="h1" style={{fontSize:'3rem', marginBottom:'3rem'}}>{title}</Typography>
      <Grid container spacing={2}>
        {props.children}
      </Grid>
    </Box>
    </Container>
  );
};

export default Page
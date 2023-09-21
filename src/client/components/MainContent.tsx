import React from 'react'
import FetchProducts from './FetchProducts'
import Grid from "@mui/system/Unstable_Grid";
export default function MainContent() {
  return (
    <>       
    <Grid>
     <h2
     style={{
       textAlign: "center",
       paddingTop: "10px",
     }}
     >Våra produkter</h2>
      <Grid 
      container spacing={2}
      alignItems="center"
      justifyContent="center"
      >
        <FetchProducts />
      </Grid>
    </Grid>
    </>
  )
}

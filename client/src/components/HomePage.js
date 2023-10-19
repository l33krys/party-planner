import React from 'react'
import { Grid, Image, Segment, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';


function HomePage() {

  return (
    <Segment>
    <Grid columns={2} relaxed='very'>
      <Grid.Column style={{marginTop: "50px"}}>
        <div style={{ background: "#146C94", borderColor: "#19A7CE", border: "solid", margin: "50px", textAlign: "center" }}>
            <h1 style={{ color:"#F6F1F1", margin: "30px" }}>Welcome to PartyPro</h1>
            <h3 style={{ color:"#F6F1F1", margin: "30px" }}>The Party Planning App</h3>
            <div>
                <Link to="/party" style={{ textDecoration: "none" }}>
                    <Button style={{ background: "#AFD3E2", size:'large', margin:"30px" }}>Get Started</Button>
                </Link>
            </div>
        </div>
        
      </Grid.Column>
      <Grid.Column>
        <div style={{paddingLeft:"60px"}}>
            <Image src='..\PartyImage.PNG' size='large' alt="PartyPlanningImage" fluid />
        </div>
      </Grid.Column>
    </Grid>
  </Segment>
  )
}

export default HomePage;
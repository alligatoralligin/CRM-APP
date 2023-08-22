import React from "react";
import Button from "@mui/material/Button";
import { Grid, Typography, Box, Hidden } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { palette } from "@mui/system";
import ActionAreaCard from "../HelperComps/ActionAreaCard";

export default function HomePage() {
  return (
    <Grid
      sx={{
        overflowX: "hidden",
        background: "linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)",
      }}
    >
      <Grid
        container
        spacing={0}
        sx={{
          marginTop: 50,
          height: "100vh",
          maxWidth: "100vw",
          marginLeft: 20,
        }}
      >
        <Grid
          container
          sm={12}
          xs={12}
          md={6}
          sx={{
            display: { sm: "flex", xs: "flex", md: "grid" },
          }}
        >
          <Typography sx={{ typography: { sm: "h4", md: "h2" } }}>
            Effortlessly tracking and building
            <br></br>
            the relationships that you want with your clients
            <br></br>
            <Typography variant="h4">
              Use CRM-MERN to track customer data to leave a good impression
              <br></br>
              that will get you that sale.
            </Typography>
            <Button
              variant="outlined"
              sx={{
                height: 100,
                width: 350,
                fontSize: 20,
                mr: 5,
                mt: 5,
              }}
            >
              Register for free
            </Button>
            <Button
              variant="outlined"
              sx={{
                height: 100,
                width: 350,
                fontSize: 20,
                mt: 5,
              }}
            >
              FAQ
            </Button>
          </Typography>
        </Grid>

        <Grid container sm={12} xs={12} md={6}>
          <Box
            component="img"
            sx={{
              border: 3,
              borderColor: "secondary.main",
              borderRadius: "16px",
              maxHeight: 500,
            }}
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
          ></Box>
        </Grid>
      </Grid>
      <Grid container direction="column" alignItems="center">
        <Typography variant="h2" gutterBottom>
          Customer Testimonies
        </Typography>
      </Grid>
      <Grid
        container
        direction="column"
        alignItems="center"
        sx={{ height: "100vh", width: "100vw" }}
      >
        <Grid container spacing={2} width={3 / 5} md={6}>
          <Grid item xs={12} sm={12} md={4}>
            <ActionAreaCard
              title="Bon Ton"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat mauris nunc congue nisi vitae suscipit tellus. Ullamcorper a lacus vestibulum sed arcu non odio euismod lacinia. Pharetra massa massa ultricies mi quis hendrerit dolor magna. Vel elit scelerisque mauris pellentesque pulvinar pellentesque. Rhoncus urna neque viverra justo nec. Urna duis convallis convallis tellus id. Quisque egestas diam in arcu cursus euismod quis viverra. Nisl vel pretium lectus quam id leo in vitae. Arcu ac tortor dignissim convallis aenean et tortor at. Aliquet nibh praesent tristique magna sit amet purus gravida. Interdum posuere lorem ipsum dolor."
              picture="https://images.unsplash.com/photo-1602934445884-da0fa1c9d3b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1316&q=80"
            ></ActionAreaCard>
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <ActionAreaCard
              title="Fendi"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat mauris nunc congue nisi vitae suscipit tellus. Ullamcorper a lacus vestibulum sed arcu non odio euismod lacinia. Pharetra massa massa ultricies mi quis hendrerit dolor magna. Vel elit scelerisque mauris pellentesque pulvinar pellentesque. Rhoncus urna neque viverra justo nec. Urna duis convallis convallis tellus id. Quisque egestas diam in arcu cursus euismod quis viverra. Nisl vel pretium lectus quam id leo in vitae. Arcu ac tortor dignissim convallis aenean et tortor at. Aliquet nibh praesent tristique magna sit amet purus gravida. Interdum posuere lorem ipsum dolor."
              picture="https://images.unsplash.com/photo-1590874315261-788881621f7a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1548&q=80"
            ></ActionAreaCard>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <ActionAreaCard
              title="Chanel"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat mauris nunc congue nisi vitae suscipit tellus. Ullamcorper a lacus vestibulum sed arcu non odio euismod lacinia. Pharetra massa massa ultricies mi quis hendrerit dolor magna. Vel elit scelerisque mauris pellentesque pulvinar pellentesque. Rhoncus urna neque viverra justo nec. Urna duis convallis convallis tellus id. Quisque egestas diam in arcu cursus euismod quis viverra. Nisl vel pretium lectus quam id leo in vitae. Arcu ac tortor dignissim convallis aenean et tortor at. Aliquet nibh praesent tristique magna sit amet purus gravida. Interdum posuere lorem ipsum dolor."
              picture="https://images.unsplash.com/photo-1593418631527-ef599fba72df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
            ></ActionAreaCard>
          </Grid>
        </Grid>
      </Grid>

      {/* FAQ SECTION */}
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100vh" }}
      >
        <Typography gutterBottom variant="h2">
          Frequently Asked Questions
        </Typography>
        <Box
          component="img"
          sx={{
            border: 3,
            borderColor: "secondary.main",
            borderRadius: "16px",
            maxHeight: 300,
            maxWidth: 2 / 4,
            mb: 5,
            mt: 5,
          }}
          src="https://images.unsplash.com/photo-1665789318391-6057c533005e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80"
        ></Box>
        <Accordion sx={{ width: 1 / 2, mb: 3.5 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography sx={{ fontWeight: "bold" }}>
              How does CRM-MERN track customer progress?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              CRM-MERN tracks customer progress by using the different contact
              status that are usually used in the sales pipeline such as
              "Opportunity","Qualified","Contacting","Engaging","Success","Failure",and
              "Closing" to indicate the stage the customer is in.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ width: 1 / 2, mb: 3.5 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography sx={{ fontWeight: "bold" }}>
              What is shown in the CRM-MERN dashboard?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Information on the total customers that sale group has is shown as
              well as new members and the amount of each customer in each
              pipeline stage.The goal of the dashboard is to show a snapshot of
              both the salegroup and the customers.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ width: 1 / 2, mb: 3.5 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography sx={{ fontWeight: "bold" }}>
              Question Number 3
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ width: 1 / 2, mb: 3.5 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography sx={{ fontWeight: "bold" }}>
              Question Number 4
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ width: 1 / 2, mb: 3.5 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography sx={{ fontWeight: "bold" }}>
              Question Number 5
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  );
}

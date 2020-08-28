import React from 'react';
import {
  Typography,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {},
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor: theme.palette.primary.main,
  },
}));

export default function StickyFooter() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <footer className={classes.footer}>
        <Container maxWidth="md">
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            spacing={2}
          >
            <Grid item xs={6} md={4} lg={3}>
              <Typography variant="h6">Field Data Capture</Typography>
              <List dense>
                <ListItem>
                  <ListItemText>Home</ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>Dashboard</ListItemText>
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={6} md={4} lg={3}>
              <Typography variant="h6">Forms</Typography>
              <List dense>
                <ListItem>
                  <ListItemText>Request For Information</ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>Daily Report</ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>Hazard Assessment</ListItemText>
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Container>
      </footer>
    </div>
  );
}

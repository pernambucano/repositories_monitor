import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { ThemeProvider } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Link as RouterLink } from 'react-router-dom';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Repositories Monitor
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#ffffff' },
    secondary: { main: '#205C89' }
  }
});

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  appBar: {
    backgroundColor: "black",
  },
  logout: {
    float: "right",
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(2),
  },
}));

const CustomLayout = (props) => {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative" className={classes.appBar}>
        <Toolbar>
          <Grid
            justify="space-between" // Add it here :)
            container
          >
            <Grid item>
              <RouterLink to="/">< Typography variant="h6" color="primary" noWrap>Home  </Typography></RouterLink>
            </Grid>
            <Grid item>
              <RouterLink to="/logout">  <Typography variant="h6" color="primary" noWrap>Logout   </Typography></RouterLink>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        {/* <div className={classes.heroContent}> */}
        <Container>
          <div className={classes.root}>
            <Grid container>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  {props.children}
                </Paper>
              </Grid>
            </Grid>
          </div>
        </Container>
        {/* </div> */}
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Made with &#60;3 in Recife!
        </Typography>
      </footer>
      {/* End footer */}
    </ThemeProvider>
  );
};

export default CustomLayout;

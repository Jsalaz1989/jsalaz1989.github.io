import React from 'react';

import Grid from '@material-ui/core/Grid';

import { theme } from '../theme' 

import Button from '@material-ui/core/Button'

import CircularProgress from '@material-ui/core/CircularProgress'

import Paper from '@material-ui/core/Paper'


const Home = ({ history }) => {

   
    // const NavButton = ({ to, text }) => {
    //     return <Button style={styles.headerButton} component={NavLink} to={to}>{text}</Button>;
    // }

	
    const styles = {
        div: {
            backgroundColor: theme.palette.primary.main,
            // backgroundSize: 'cover',
            // position:'relative',
            // width: '100%',
            // height: '100%',
            // flex:'1',
            minHeight: '100vh',
        },
        header: {
            backgroundColor: theme.palette.primary.main,
            // minHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'top',
            color: theme.palette.primary.contrastText,
        },
        headerTitle: {
            fontSize: 'calc(14px + 2vmin)',
            textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
            // position: 'absolute',
            // width: '100%',
            // height: '100%',
            // top: '0',
            // left: '0'
            // top: '150',
            // left: '50%',
        },
        circle: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            width: '100%',
            textAlign: 'center',
            // margin: '10% 0',
            // minHeight: '200px',
            backgroundColor: theme.palette.primary.main,
            position: 'relative',
            fontSize: 'calc(14px + 2vmin)',
            textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
            marginTop: '20px',
            marginBottom: '65px',
        },
        headerSubtitle: {
            fontSize: 'calc(6px + 2vmin)',
        },
        headerButton: {
            color: theme.palette.primary.light,
        },
        levels: {
            // borderStyle: 'solid',
            // borderColor: theme.palette.primary.light,
            // borderWidth: '1px',
            // borderRadius: '1%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '30px',
            width: '600px',
            height: '300px',
            marginBottom: '30px',
            flexGrow: '1',
        },
        paper: {
            padding: theme.spacing(1),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    }

        
    // const logoStyle = {
    //     ...styles.logo, 
    //     animationPlayState: window.location.pathname === '/' ? 'running' : 'paused'
	// } 

    let level = 2
    let totalLevels = 3
    let percent = (level / totalLevels) * 100

    function FormRow(props) {



        return (
          <React.Fragment>
            <Grid item xs={4}>
              <Paper style={styles.paper}>item</Paper>
            </Grid>
            <Grid item xs={4}>
                <Paper style={styles.paper}>item</Paper>
            </Grid>
            <Grid item xs={4}>
                <Paper style={styles.paper}>item</Paper>
            </Grid>
          </React.Fragment>
        );
      }

    return (
        <div style={styles.header}>
            <div style={styles.circle} >
                <CircularProgress style={{ position: 'absolute' }} size={140} variant='static' value={percent} thickness={1} color='secondary' />
                Level <br />{level}
            </div>
            <Paper style={styles.levels}>
                <Grid container spacing={6}>
                    <Grid container item xs={12} spacing={6}>
                        <FormRow />
                    </Grid>
                    <Grid container item xs={12} spacing={6}>
                        <FormRow />
                    </Grid>
                    <Grid container item xs={12} spacing={6}>
                        <FormRow />
                    </Grid>
                </Grid>
            </Paper>


            <p style={styles.headerSubtitle}>
                <Button style={styles.headerButton} onClick={(evt) => history.push('/build')}>Build</Button> to advance to the next level
            </p>
        </div>
    )
}

export default Home
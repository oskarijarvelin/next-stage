import { AppBar, Toolbar, Container, Typography, Box, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Link from '../src/Link'

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
    },
    buttonContainer: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
    },
    button: {
        margin: '0 12px',
    },
    buttonTop: {
        color: '#FFF',
    }
  }));

export default function Index() {
    const classes = useStyles();
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Viestintäpäivä Plussa
                    </Typography>
                    <Link href="/show" passHref>
                        <Button className={classes.buttonTop}>Aikataulu</Button>
                    </Link>
                </Toolbar>
            </AppBar>
            <Container maxWidth="md">
                <Box my={16}>                    
                    <div className={classes.buttonContainer}>
                        <Link href="https://plussa.vercel.app/" passHref>
                            <Button variant="outlined" color="primary" size="large" className={classes.button}>
                                Katso lähetystä
                            </Button>
                        </Link>
                        <Link href="/show" passHref>
                            <Button variant="outlined" color="primary" size="large" className={classes.button}>Avaa aikataulu</Button>
                        </Link>
                    </div>

                </Box>
            </Container>
        </>
    )
}
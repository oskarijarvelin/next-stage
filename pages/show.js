import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Container, Typography, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Link from '../src/Link'
import Moment from 'react-moment'
import moment from 'moment'

const useStyles = makeStyles({
    title: {
        flexGrow: 1,
    },
    table: {
        minWidth: 650,
    },
    buttonTop: {
        color: '#FFF',
    },
    live: {
        fontSize: '7vw',
        lineHeight: 1,
        textAlign: 'center',
    },
    countdown: {
        fontSize: '24vw',
        lineHeight: 1.2,
        textAlign: 'center',
    },
    next: {
        fontSize: '3vw',
        lineHeight: 1,
        textAlign: 'center',
    }
})

function createData(mita, kuka, milloin, kesto) {
    return { mita, kuka, milloin, kesto }
}

const rows = [
    createData('Lähetys alkaa', '', '16:45', '-'),
    createData('Avaus', 'Erja Sankari', '17:00', 5),
    createData('Alkujuonto', 'Jari Tuovinen', '17:05', 1),
    createData('Keynote 1', 'Juha Sipilä', '17:06', 19),
    createData('Keynote 2', 'Jari Kähkönen', '17:25', 20),
    createData('Yrityspuheenvuoro', 'Jouni Lukkarinen', '17:45', 15),
    createData('Paneeli', 'Sanna Keskinen', '18:00', 45),
    createData('OTH:n esittely', 'Marja Nousiainen', '18:45', 10),
    createData('Palkinnot', 'Tiina Koskela', '18:55', 10),
    createData('Kiitokset', 'Jari Tuovinen', '19:05', 1),
    createData('Lähetys loppuu', '', '19:06', '-'),
]

export default function Index() {
    const classes = useStyles()
    const [time, setTime] = useState( new Date() )
    const [live, setLive] = useState( 0 )
    const [next, setNext] = useState( 0 )
    const [showText, setShowText] = useState( true )
    const [lastMinute, setLastMinute] = useState( false )

    const today = moment().format('YYYY-MM-DD')
    //const today = '2021-05-19'

    
    setInterval(() => {
        let date = new Date()
        setTime( date )
        setCurrent( date )
        blink( date )
    }, 1000);
    

    function setCurrent( date ) {
        for ( let i = 0; i < rows.length; i++) {
            if ( moment(today + 'T' + rows[i].milloin + '+0300') > moment(date) ) {
                if ( i > 0) {
                    setLive(i - 1)
                    setNext(i)
                } else {
                    setNext(1)
                }
                break
            }
        }
    }

    function blink( date ) {
        if ( lastMinute ) {
            setShowText( !showText )
        }
    }

    const cdFilter = (d) => {
        if ( d.charAt(0) == '-' && d.length < 10 ) {
            return d.toUpperCase().substring(1);
        } else {
            return '';
        }
        
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Kevätforum 2021
                    </Typography>
                    <Link href="/" passHref>
                        <Button className={classes.buttonTop}>Takaisin</Button>
                    </Link>
                </Toolbar>
            </AppBar>
            <Container maxWidth={false}>
                <Box mt={8} mb={16}>
                    <Typography className={classes.live}>
                        {rows[live].mita}
                    </Typography>
                    <Typography className={classes.countdown} style={{ color: showText ? 'inherit' : '#F00' }}>
                        <Moment date={today + 'T' + rows[next].milloin + '+0300'}  filter={cdFilter} format="HH:mm:ss" durationFromNow />
                    </Typography>
                    <Typography className={classes.next}>
                        SEURAAVAKSI: {rows[next].mita}
                    </Typography>
                </Box>
            </Container>
            <Container maxWidth="lg">
                <Box mb={8}>
                    <TableContainer>
                        <Table className={classes.table} size="small" aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Mitä</TableCell>
                                    <TableCell>Kuka</TableCell>
                                    <TableCell align="right">Milloin</TableCell>
                                    <TableCell align="right">Kesto</TableCell>
                                    <TableCell align="right">Countdown</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row, i) => (
                                    <TableRow key={i}>
                                        <TableCell component="th" scope="row">
                                            {row.mita}
                                        </TableCell>
                                        <TableCell>{row.kuka}</TableCell>
                                        <TableCell align="right">{row.milloin}</TableCell>
                                        <TableCell align="right">{row.kesto} min</TableCell>
                                        <TableCell align="right"><Moment date={today + 'T' + row.milloin + '+0300'} filter={cdFilter} durationFromNow /></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Container>
        </>
    )
}
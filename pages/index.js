import { useState, useEffect } from 'react';
import { Container, Typography, Box } from '@material-ui/core'
import Link from '../src/Link'
import Moment from 'react-moment'
import moment from 'moment'

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
})

function createData(mita, kuka, milloin, kesto) {
    return { mita, kuka, milloin, kesto }
}

const rows = [
    createData('Testi', '', '00:01', '-'),
    createData('Testi2', '', '00:06', '-'),
    createData('Loadin', '', '01:11', '-'),
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
    createData('Vuorokausi loppuu', '', '23:59', '-'),
]

export default function Index() {
    const classes = useStyles()
    const [time, setTime] = useState( new Date() )
    const [live, setLive] = useState( 0 )

    let today = moment().format('YYYY-MM-DD')

    useEffect(() => {
        setInterval(() => {
            let date = new Date()
            setTime( date )
            setCurrent( date )
        }, 1000);
    }, [])

    function setCurrent( date ) {
        for ( let i = 0; i < rows.length; i++) {
            if ( moment(today + 'T' + rows[i].milloin + '+0300') > moment(date) && i > 0) {
                setLive(i - 1)
                break
            }
        }
    }

  

    const cdFilter = (d) => {
        if ( d.charAt(0) == '-' && d.length < 10 ) {
            return d.toUpperCase();
        } else {
            return '';
        }
        
    };

    return (
        <Container maxWidth="lg">
            <Box my={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Kevätforum 2021
                </Typography>

                <Typography gutterBottom>
                    <Link href="https://global.gotowebinar.com/join/3246089693121433612/935358543?clientType=html5" target="_blank" rel="nofollow">Katso lähetystä</Link>{' - '} 
                    <Link href="/kenraali">Aikataulu (kenraali)</Link>{' - '}
                    <Link href="/show">Aikataulu (show)</Link>
                </Typography>

                <Typography gutterBottom>
                    LIVE: {rows[live].mita}
                </Typography>

                <TableContainer component={Paper}>
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
    )
}
import { useState, useEffect } from 'react';
import { Container, Typography, Box } from '@material-ui/core'
import Kello from '../components/kello'
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
]

export default function Index() {
    const classes = useStyles()
    const [time, setTime] = useState( new Date() )
    let today = moment().format('YYYY-MM-DD')
    useEffect(() => {
        setInterval(() => {
            setTime( new Date() )
        }, 1000);
    }, [])

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
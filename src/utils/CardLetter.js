import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange } from '@material-ui/core/colors';


const styleLarge = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
        marginTop: theme.spacing(1) + 3
    },
    avatar: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
        width: '5em',
        height: '5em',
    },
    letter: {
        fontSize: '2em'
    }
}));

const styleSmall = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    avatar: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
        width: '2.5em',
        height: '2.5em',
    },
    letter: {
        fontSize: '1em'
    }
}));

export default function CardLetter({ letter, size = "large" }) {

    const classes = size === "large" ? styleLarge() : styleSmall()
    return (
        <div className={classes.root}>
            <Avatar className={classes.avatar}><p className={classes.letter}>{letter?.substr(0, 1).toUpperCase()}</p></Avatar>
        </div>
    );
}

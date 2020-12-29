import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import StepConnector from '@material-ui/core/StepConnector';
//import Button from '@material-ui/core/Button';
//import Typography from '@material-ui/core/Typography';
//import { StepButton } from '@material-ui/core';
import { Link, useHistory } from "react-router-dom";

const defColor = '#2c5282' // '#784af4',

const QontoConnector = withStyles({
    alternativeLabel: {
        top: 10,
        left: 'calc(-50% + 16px)',
        right: 'calc(50% + 16px)',
    },
    active: {
        '& $line': {
            borderColor: defColor
        },
    },
    completed: {
        '& $line': {
            borderColor: defColor
        },
    },
    line: {
        borderColor: '#eaeaf0',
        borderTopWidth: 3,
        borderRadius: 1,
    },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
    root: {
        color: '#eaeaf0',
        display: 'flex',
        height: 22,
        alignItems: 'center',
    },
    active: {
        color: defColor,
    },
    circle: {
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: 'currentColor',
    },
    completed: {
        color: defColor,
        zIndex: 1,
        fontSize: 18,
    },
});

function QontoStepIcon(props) {
    const classes = useQontoStepIconStyles();
    const { active, completed } = props;

    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
            })}
        >
            {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
        </div>
    );
}

QontoStepIcon.propTypes = {
    /**
     * Whether this step is active.
     */
    active: PropTypes.bool,
    /**
     * Mark the step as completed. Is passed to child components.
     */
    completed: PropTypes.bool,
};

//const ColorlibConnector = withStyles({
//    alternativeLabel: {
//        top: 22,
//    },
//    active: {
//        '& $line': {
//            backgroundImage:
//                'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
//        },
//    },
//    completed: {
//        '& $line': {
//            backgroundImage:
//                'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
//        },
//    },
//    line: {
//        height: 3,
//        border: 0,
//        backgroundColor: '#eaeaf0',
//        borderRadius: 1,
//    },
//})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
    root: {
        backgroundColor: '#ccc',
        zIndex: 1,
        color: '#fff',
        width: 50,
        height: 50,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    active: {
        backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    },
    completed: {
        backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    },
});

function ColorlibStepIcon(props) {
    const classes = useColorlibStepIconStyles();
    const { active, completed } = props;

    const icons = {
        1: <SettingsIcon />,
        2: <GroupAddIcon />,
        3: <VideoLabelIcon />,
    };

    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
                [classes.completed]: completed,
            })}
        >
            {icons[String(props.icon)]}
        </div>
    );
}

ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     */
    active: PropTypes.bool,
    /**
     * Mark the step as completed. Is passed to child components.
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

function getSteps() {
    return [
        //the step number is get in defaulStepNUm e not stepNUm field
        { stepNum: 0, label: 'Topic', rediectTo: 'topic' },
        { stepNum: 1, label: 'Category', rediectTo: 'category' },
        { stepNum: 2, label: 'Item', rediectTo: 'item' },
    ];
}


export default function StepMenu({ defaultStepNum = 0 }) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(defaultStepNum);
    const steps = getSteps();

    //const handleNext = () => {
    //    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    //};

    //const handleBack = () => {
    //    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    //};

    //const handleReset = () => {
    //    setActiveStep(0);
    //};
    const history = useHistory();

    const stepHandler = e => {
        //setActiveStep(e.stepNum)
        history.push(e.rediectTo)

    }
    return (
        <div className={classes.root}>
            {/*--------------BASCIC STEPS*/}
            {/*<Stepper alternativeLabel activeStep={activeStep}>
                {steps.map((c) => (
                    <Step key={c.label}>
                        <StepLabel onClick={() => stepHandler(c)}>
                            <Link to={c.rediectTo}>
                                {c.label}
                            </Link>
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>*/}
            {/*----------------MODERN STEPS*/}
            <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
                {steps.map((c) => (
                    <Step key={c.label}>
                        <StepLabel StepIconComponent={QontoStepIcon} onClick={() => stepHandler(c)}>
                            <Link to={c.rediectTo}>
                                {c.label}
                            </Link>
                        </StepLabel>
                    </Step>

                ))}
            </Stepper>
            {/*----------------ICON STEPS*/}
            {/*<Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
                {steps.map((c) => (
                    <Step key={c.label}>

                        <StepLabel StepIconComponent={ColorlibStepIcon} onClick={() => stepHandler(c)}>
                            <Link to={c.rediectTo}>
                                {c.label}
                            </Link>
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>*/}
            <div>
                {/*{activeStep === steps.length ? (
                    <div>
                        <Typography className={classes.instructions}>
                            All steps completed - you&apos;re finished
            </Typography>
                        <Button onClick={handleReset} className={classes.button}>
                            Reset
            </Button>
                    </div>
                ) : (
                        <div>
                            <div>
                                <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                                    Back
              </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleNext}
                                    className={classes.button}
                                >
                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                </Button>
                            </div>
                        </div>
                    )}*/}
            </div>
        </div>
    );
}
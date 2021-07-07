import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {
    Box,
    Button,
    Checkbox,
    Grid,
    Input,
    InputLabel,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        textAlign: 'center'
    },
    root: {
        margin: 'auto',
    },
    paperAdd: {
        width: 300,
        height: 230,
        overflow: 'auto',
        borderBottom: '1px solid #999',
        '&::-webkit-scrollbar': {
            width: '2px',
        },
        '&::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,0.76)',
            outline: '1px solid slategrey'
        }
    },
    button: {
        margin: theme.spacing(0.5, 0),
    },
    addGroup: {
        marginTop: '10px',
        color: '#52a4db',
        borderColor: '#52a4db'
    },
    lineGroup: {
        width: '98%',
        paddingLeft: '15px'
    },
    lineContact: {
        width: '98%',
        paddingBottom: '30px',
        borderBottom: '1px solid #999'
    }




}));


function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
}

export default function ModalGroupSettings({open, handleClose, users, allContacts,roomId, roomName,updateSizeGroup, userId}) {
    
    const classes = useStyles();
    const [checked, setChecked] = React.useState([]);
    const [left, setLeft] = React.useState([]);
    const [right, setRight] = React.useState([]);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);
    const [nameGroup, setNameGroup] = useState([])
    const [inputTrigger, setInputTrigger] = useState(true)

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };


    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    const addNameGroup = (e) => {
        
        setInputTrigger(false)
        setNameGroup([e.target.value])
        if(e.target.value === '') {
            setInputTrigger(true)
            setNameGroup([])
        }
    }

    useEffect(() => {
        if(inputTrigger) {
            const name = right.map(({nick_name}) => nick_name)
            setNameGroup(name)
        }
    },[right])

    
    useEffect(() => {
       const contacts = allContacts.filter((user) => {
           if(!users.find(({id}) => id === user.id)) {
             return user
           }
       })
        setLeft(contacts)
        setRight(users)
        setNameGroup([roomName])
    }, [])

    const onUpdateGroup = () => {
        updateSizeGroup(
            roomId,
            right.map(({id}) => id),
            nameGroup,
            userId
             )
        handleClose()
    }

    const onEnterKey = (key) => {
        if(key === 'Enter') {
            onUpdateGroup()
            handleClose()
        }
    }

    const customList = (items) => (
        <div className={classes.paperAdd}>
            <List dense component="div" role="list">
                {items.map((value) => {
                    const labelId = `transfer-list-item-${value}-label`;

                    return (

                        <ListItem key={value.id} role="listitem" button onClick={handleToggle(value)}>
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                    color='primary'
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={`${value.nick_name}`}/>
                        </ListItem>
                    );
                })}
                <ListItem />
            </List>
        </div>
    )

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            onKeyDown={e => onEnterKey(e.key)}
        >
            <Fade in={open}>
                <Paper className={classes.paper}>
                <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
                    <Grid item>
                        <Box className={classes.lineContact}>
                            <InputLabel>Вашы контакты:</InputLabel>
                        </Box>

                        {customList(left)}
                    </Grid>
                    <Grid item>
                        <Grid container direction="column" alignItems="center">
                            <Button
                                variant="outlined"
                                size="small"
                                className={classes.button}
                                onClick={handleCheckedRight}
                                disabled={leftChecked.length === 0}
                                aria-label="move selected right"
                            >
                                &gt;
                            </Button>
                            <Button
                                variant="outlined"
                                size="small"
                                className={classes.button}
                                onClick={handleCheckedLeft}
                                disabled={rightChecked.length === 0}
                                aria-label="move selected left"
                            >
                                &lt;
                            </Button>
                        </Grid>
                    </Grid>



                    <Grid item>
                        <InputLabel>Название беседы:</InputLabel>
                        <Input
                            value={nameGroup}
                            onChange={addNameGroup}
                            className={classes.lineGroup}
                            
                        />
                        {customList(right)}
                    </Grid>
                     </Grid>


                    <Button
                        variant='outlined'
                        className={classes.addGroup}
                        disabled={right.length === 1 ? true : false}
                        onClick={onUpdateGroup}
                    >Изменить беседу</Button>
                </Paper>
            </Fade>
        </Modal>

    );
}


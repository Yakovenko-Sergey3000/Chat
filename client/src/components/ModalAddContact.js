import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {Avatar, Box, Button} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        width: '300px',
        height: '300px',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        textAlign: 'center'
    },
    avatar: {
        width: '100px',
        height: '100px',
        margin: '10px auto'
    },
    info: {
        display: 'flex',
        alignItems: 'center',
    },
    infoStatic: {
        padding: '5px',
        fontSize: '18px'
    },
    infoUser: {
        fontSize: '18px',
        fontWeight: '600'
    },
    btn: {
        width: '200px',
        margin: '0 auto',
        fontSize: '13px',
        color: '#52a4db',
        borderColor: '#52a4db'
    }

}));

export default function ModalAddContact({open, handleClose, user, onAddContact}) {
    const classes = useStyles();
    const {email, id, nick_name, sity=''} = user
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
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <Avatar alt='avatar' className={classes.avatar}/>
                        <h2 id="transition-modal-title">{nick_name}</h2>
                        <Box className={classes.info}>
                            <label className={classes.infoStatic}>Email:</label>
                            <span className={classes.infoUser}>{email}</span>
                        </Box>
                        <Box className={classes.info}>
                            <label className={classes.infoStatic}>Город:</label>
                            <span className={classes.infoUser}>{sity}</span>
                        </Box>

                        <Box className={classes.info} mt={2}>
                            <Button
                                variant={'outlined'}
                                className={classes.btn}
                                onClick={() => onAddContact(id)}
                                >Добавить в контакты</Button>
                        </Box>
                    </div>
                </Fade>
            </Modal>

    );
}


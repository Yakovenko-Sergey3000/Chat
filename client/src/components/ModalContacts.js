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
        // height: '350px',
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
        alignItems: 'center'
    },

    btn: {
        margin: '0 auto',
        width: '200px',
        fontSize: '13px',
        color: '#52a4db',
        borderColor: '#52a4db'
    },
    btnDel: {
        margin: '0 auto',
        width: '200px',
        fontSize: '13px',
        color: 'rgba(243,68,68,0.84)',
        borderColor: 'rgba(243,68,68,0.84)'
    }

}));

export default function ModalContacts({open, handleClose, user ,onOpenRoom, onRemoveContact}) {
    const classes = useStyles();

    const {id, nick_name, url_avatar} = user;


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
                    <Avatar alt='avatar' className={classes.avatar} src={url_avatar}/>
                    <h2 id="transition-modal-title">{nick_name}</h2>

                    <Box className={classes.info} mt={2}>
                        <Button
                            
                            variant={'outlined'}
                            className={classes.btn}
                            onClick={() => onOpenRoom(id)}
                        >Написать сообщение</Button>
                    </Box>
                    <Box className={classes.info} mt={2}>
                        <Button
                            variant={'outlined'}
                            className={classes.btnDel}
                            onClick={() => onRemoveContact(id)}
                        >Удалить контакт</Button>
                    </Box>
                </div>
            </Fade>
        </Modal>

    );
}


import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {Avatar, Box, Button, List, ListItem, Typography,Badge} from "@material-ui/core";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'


const StyledBadge = withStyles((theme) => ({
    badge: {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      
    },
   
    
  }))(Badge)

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        width: '300px',
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
    nickName: {
        marginBottom: '10px'
    },
    info: {
        display: 'flex',
        alignItems: 'center'
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
        margin: '0 auto',
        width: '220px',
        fontSize: '13px',
        color: '#52a4db',
        borderColor: '#52a4db'
    },
    btnDel: {
        margin: '0 auto',
        width: '220px',
        fontSize: '13px',
        color: 'rgba(243,68,68,0.84)',
        borderColor: 'rgba(243,68,68,0.84)'
    },
    group: {
        marginLeft: '10px'
    },
    privat: {
        display: 'flex',
        flexDirection: 'column'
    }

}));

export default function ModalDialogInfo({open, handleClose, room, userId, removeMess, removeRoom,}) {
    const classes = useStyles();

    const {users, type, user_id: admin, room_name, id:room_id} = room[0];

    const submit = (type) => {
        if(type === 'mess') {
            confirmAlert({
                title: '????????????????',
                message: '?????? ???????????? ?????????????? ?????? ???????? ?????????????????????????? ?????????? ??????????????',
                buttons: [
                    {
                        label: '??????????????',
                        onClick: () => removeMess(room_id)
                    },
                    {
                        label: '????????????????',

                    }
                ]
            });
        } else {
            confirmAlert({
                title: '????????????????',
                message: '???????? ???????????? ?????????? ???????????? ?? ???????? ??????????????????????????',
                buttons: [
                    {
                        label: '??????????????',
                        onClick: () => removeRoom(room_id)
                    },
                    {
                        label: '????????????????',

                    }
                ]
            });
        }
    };

    const delMess = () => {
        handleClose()
        submit('mess')
    }

    const delDialog = () => {
        handleClose()
        submit('room')
    }


    const barInfo = () => {
        if(type === 'group') {
          return users.map(({nick_name, id, url_avatar, status}) => {
              
              return (
                  <ListItem key={id}>
                      <Box display='flex' alignItems='center'>
                      {status?  <StyledBadge
                                overlap="circle"
                                anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                                }}
                                variant="dot"
                            >
                                <Avatar alt="Avatar" src={url_avatar}/>
                            </StyledBadge> :  <Avatar alt="Avatar" src={url_avatar}/>}
                          <Typography className={classes.group}>{nick_name}</Typography>
                      </Box>
                  </ListItem>
              )
          })
        } else {
            const {nick_name, email, sity,id, url_avatar} = users[0]
            return (
                <ListItem key={id} className={classes.privat}>
                    <Avatar alt='avatar' className={classes.avatar} src={url_avatar}/>
                    <h2 id="transition-modal-title" className={classes.nickName}>{nick_name}</h2>
                    <Box className={classes.info}>
                        <label className={classes.infoStatic}>Email:</label>
                        <span className={classes.infoUser}>{email}</span>
                    </Box>
                    <Box className={classes.info}>
                        <label className={classes.infoStatic}>??????????:</label>
                        <span className={classes.infoUser}>{sity}</span>
                    </Box>
                </ListItem>
            )
        }
    }

    const buttonBlock = () => {
        if(type === 'group') {
            if(admin === userId) {
                return (
                    <>
                        <Box className={classes.info} mt={2}>
                            <Button
                                variant={'outlined'}
                                className={classes.btn}

                            >???????????????? ????????????????????????</Button>
                        </Box>
                        <Box className={classes.info} mt={2}>
                            <Button
                                variant={'outlined'}
                                className={classes.btn}
                                onClick={delMess}

                            >?????????????? ??????????????????</Button>
                        </Box>
                        <Box className={classes.info} mt={2}>
                            <Button
                                variant={'outlined'}
                                className={classes.btnDel}
                                onClick={delDialog}
                            >?????????????? ????????????</Button>
                        </Box>
                    </>
                )
            } else{
                return (
                    <>
                        <Box className={classes.info} mt={2}>
                            <Button
                                variant={'outlined'}
                                className={classes.btn}

                            >???????????????? ????????????????????????</Button>
                        </Box>
                        <Box className={classes.info} mt={2}>
                            <Button
                                variant={'outlined'}
                                className={classes.btnDel}
                                onClick={delMess}
                            >?????????????? ??????????????????</Button>
                        </Box>
                    </>
                )

            }

        } else {
            return (
                <>
                    <Box className={classes.info} mt={2}>
                        <Button
                            variant={'outlined'}
                            className={classes.btn}
                            onClick={delMess}
                        >?????????????? ??????????????????</Button>
                    </Box>
                    <Box className={classes.info} mt={2}>
                        <Button
                            variant={'outlined'}
                            className={classes.btnDel}
                            onClick={delDialog}
                        >?????????????? ????????????</Button>
                    </Box>
                </>
            )
        }
    }


        const BarInfo= barInfo()
        const ButtonBlock = buttonBlock()


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

                    <List>
                        {type === 'group' ? <h2 id="transition-modal-title" className={classes.nickName}>{room_name}</h2>:
                            null
                        }
                        {BarInfo || null}
                    </List>
                    {ButtonBlock}
                </div>
            </Fade>
        </Modal>

    );
}


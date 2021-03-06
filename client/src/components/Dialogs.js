import {
    AppBar,
    Avatar,
    Box,
    Button,
    CircularProgress,
    Icon,
    IconButton,
    Paper,
    TextField,
    Toolbar,
    Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {useEffect, useRef, useState} from "react";
import ModalDialogInfo from "./ModalDialogInfo";
import ModalGroupSettings from "./modalGroupSettings";
import date from 'date-and-time'
import { confirmAlert } from 'react-confirm-alert'; // Import


const useStyle = makeStyles({
    infoBar: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-between',
        background: 'rgba(252,251,251,0.96)',
    },
    nickContact: {
        fontSize: '20px',
        fontWeight: 700,
        color: '#333'
    },
    statusContact: {
      fontSize: '14px',
      color: '#999'
    },
    hiddenMenu: {
        width: '200px',
        padding: '10px',
        position: 'absolute',
        top: '40px',
        right: '30px',
        zIndex: 1,
        textAlign: 'center',
    },
    btnMunu: {
        width: '100%',
        fontSize: '12px',
        color: 'rgba(40,40,40,0.85)',
        '&:hover': {
            background: 'none'
        }

    },
    btnClose: {
        color: 'rgba(224,60,60,0.93)',
    },
    isContact: {
        display: 'flex',
        justifyContent: 'space-around',
        background: 'rgba(245,245,245,0.96)',
        boxShadow: 'none',
        borderRadius: 0,
    },
    btnIsContact: {
        width: '100%',
        fontSize: '13px',
        '&:hover': {
            background: 'none'
        },
       '&:first-child': {
           borderRight: 'solid 1px #999'
       },
        borderRadius: '0'
    },
    dialog: {
        overflow: 'auto',
        maxHeight: '450px',
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
    mess: {
        padding: '15px',
        display: 'flex',
        alignItems: 'flex-end'
    },
    messBody: {
        minWidth: '250px',
        maxWidth: '350px',
        marginLeft: '10px',
        padding: '10px',
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: '10px 10px 10px 0',

    },
    nick_name: {
        fontSize: '12px',
        fontWeight: '700'
    },
    text: {
        maxWidth: '250px',
        wordWrap: 'break-word',
        // marginTop:'5px',
        marginBottom: '10px'
    },
    time: {
        fontSize: '13px',
        color: '#8b8686',
        position: 'absolute',
        right: '20px',
        bottom: '1px'
    },

    form: {
        display: "flex",
        position: 'absolute',
        bottom: '5px',
        padding: '20px',
        alignItems: 'center'

    },
    input: {
        width: '700px',
        marginRight: '10px',
        background: '#fff',
        boxShadow: 'none',
        border: 'none',
        borderRadius: '5px',
        '&:focus': {
            border: 'none',
        }
    },
    btnSend: {
        width: '160px',
        height: '55px',
        padding: '10px',
        borderRadius: 0,
        color: '#fff',
        backgroundColor: '#2a9286',
        '&:hover': {
            backgroundColor: '#19705F',
        }
    },
    blockLoding: {
        width: '100%',
    },
    spinner: {
        margin: '250px 450px'
    }

})


const Dialogs = ({room,
                     closeDialog,
                     isContact,
                     addContact,
                     allHistoryMess = [],
                     sendMess,
                     user,
                     removeMess,
                     removeRoom,
                     allContacts,
                     updateSizeGroup,
                     setMessStatus
                     }) => {

    const classes = useStyle();
    const [menu, setMenu] = useState(false);
    const [openInfo, setOpenInfo] = useState(false);
    const [openSettings, setOpenSettings] = useState(false);
    const [text, setText] = useState('')
    const {id:userId} = user
    const {id: room_id, room_name, users, type} = room[0];
    const heightDialog = useRef('')
    const [loding, setLoding] = useState(false)
    const [errorInput, setErrorInput] = useState(false)
    


    const submit = () => {
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
    };



    useEffect(() => {
        if(!allHistoryMess) {
           setLoding(true)
        } else {
            setMessStatus(room_id)
            setLoding(false)
            let h = heightDialog.current.scrollHeight;
            heightDialog.current.scrollTop = h;
        }
        
    }, [allHistoryMess])

    const openMenu= () => {
       setMenu(prev => !prev)
    }

    const closeMenu = () => {
        setMenu(false)
    }

    const handleOpenModal = () => {
        setOpenInfo(true)
    }

    const handleCloseModal = () => {
        setOpenInfo(false)
    }

    const handleOpenModalSettings = () => {
        setOpenSettings(true)
    }

    const handleCloseModalSettings = () => {
        setOpenSettings(false)
    }

    const sendMessage = () => {
        setMessStatus(room_id)
        switch(!!text) {
           case true :
            if (type=== 'privat') {
                sendMess(users[0].id, text, room_id, new Date())
                setText('')
            } else {
                const idUsers = users.map(({id}) => id)
                sendMess(idUsers, text, room_id, new Date())
                setText('')
            }
            break
            case false :
                setErrorInput(true)
                break
        }

    }

    useEffect(() => {
        if(errorInput) {
            setErrorInput(false)
        }
    }, [text])

    const keyPressMess = (key) => {
        if (key === 'Enter') {
            sendMessage()
        }
    }

    const messagesArray = () => {
        let flex = ''
        

        return (
            <Box ref={heightDialog} className={classes.dialog}>
                {allHistoryMess.map(({id:mess_id,mess, time, user_id, nick_name, url_avatar}) => {
                       
                    user_id === userId ? flex = 'flex-end' : flex = '';
                   
                    const dateCreatedMess = new Date(Date.parse(time))
                    const formatTime = date.format(dateCreatedMess, 'DD-MM-YY hh:mm')
                   
                   return (
                       <Box component={'li'} key={mess_id} className={classes.mess} style={{justifyContent: flex}}>
                           <Avatar src={url_avatar || null}/>
                           <Paper className={classes.messBody}>
                               <Box>
                                   <Typography className={classes.nick_name}>
                                       {nick_name}
                                   </Typography>
                                   <Typography className={classes.text}>
                                       {mess}
                                   </Typography>
                               </Box>
                               <Typography className={classes.time}>{formatTime}</Typography>
                           </Paper>
                       </Box>
                   )
                })}
            </Box>


        )
    }



    const renderMess = messagesArray()
    return (
        <>
        <AppBar position='static' style={{boxShadow: '0px 4px 5px -1px rgb(0 0 0 / 20%)'}}>

            <Toolbar className={classes.infoBar}>
                <Box>
                    <Typography className={classes.nickContact}>
                        {type === 'group' ? room_name.split(',').join(' ') : room_name}
                    </Typography>
                    {type === 'privat' ? <Typography className={classes.statusContact}>
                        {users[0].status? 'online' : 'offline'}
                    </Typography> :
                        <Typography className={classes.statusContact}>???????????????????? ????????????????????: {users.length + 1}</Typography>
                    }
                </Box>
            <IconButton onClick={openMenu} onPointerLeave={closeMenu}>
                <Icon><span className="material-icons-two-tone">more_vert</span></Icon>
            </IconButton>

            </Toolbar>
        </AppBar>

            {!menu? null: <Paper
                className={classes.hiddenMenu}
                onPointerEnter={openMenu}
                onPointerLeave={closeMenu}

            >
                
                {type === 'group' ?
                    <Button className={classes.btnMunu} onClick={handleOpenModal}>???????????????? ??????????????????????????</Button>:
                    <Button className={classes.btnMunu} onClick={handleOpenModal}>?????????????? ??????????????</Button>
                }
                {type === 'group' ?
                    <Button className={classes.btnMunu} onClick={handleOpenModalSettings}>???????????????? ????????????</Button>:
                    null
                }

                {isContact?
                     null : <Button onClick={() => addContact(users[0].id)} className={classes.btnMunu}>???????????????? ??????????????</Button>
                }
                <Button onClick={() => closeDialog()} className={`${classes.btnMunu} ${classes.btnClose}`}>?????????????? ????????????</Button>
            </Paper> }

            {isContact ?
                null : <Paper className={classes.isContact}>
                        <Button onClick={() => addContact(users[0].id)} className={classes.btnIsContact}>???????????????? ??????????????</Button>
                        <Button onClick={submit} className={`${classes.btnIsContact} ${classes.btnClose}`}>?????????????? ????????????</Button>
                    </Paper>
            }



            {loding ? <Box className={classes.blockLoding} ><CircularProgress className={classes.spinner} /> </Box>: renderMess}



        <div className={classes.form} >
           <TextField
                error={errorInput}
                variant='outlined'
                placeholder="?????????????? ??????????????????"
               className={classes.input}
               value={text}
               onChange={(e) => setText(e.target.value)}
               onKeyDown={e => keyPressMess(e.key)}

           />
            <Button
                variant="text"
                className={classes.btnSend}
                onClick={() => sendMessage()}
            >??????????????????</Button>
        </div>

            <ModalDialogInfo
                open={openInfo}
                handleClose={handleCloseModal}
                room={room}
                userId={userId}
                removeMess={removeMess}
                removeRoom={removeRoom}

            />
            {type === 'privat' ? null :
                <ModalGroupSettings
                open={openSettings}
                handleClose={handleCloseModalSettings}
                users={users}
                allContacts={allContacts}
                roomName={room_name}
                updateSizeGroup={updateSizeGroup}
                roomId={room_id}
                userId={userId}
            />
            }
        </>
            )
}

export default Dialogs;
import {AppBar, Avatar, Box, Button, Icon, IconButton, Paper, TextField, Toolbar, Typography} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {useState} from "react";
import ModalDialogInfo from "./ModalDialogInfo";


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
        minWidth: '150px',
        maxWidth: '250px',
        marginLeft: '10px',
        padding: '10px',
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: '10px 10px 10px 0',

    },
    text: {
        maxWidth: '250px',
        wordWrap: 'break-word',
        marginBottom: '10px'
    },
    date: {
        fontSize: '13px',
        color: '#8b8686',
        position: 'absolute',
        right: '20px',
        bottom: '3px'
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
        borderRadius: 0,
        background: '#fff',
        border: 0
    },
    btnSend: {
        width: '160px',
        height: '55px',
        padding: '10px',
        borderRadius: 0,
        color: '#fff',
        backgroundColor: '#2a9286'
    }
})


const Dialogs = ({contact, closeDialog, isContact, addContact}) => {
    const classes = useStyle();
    const [menu, setMenu] = useState(false);
    const [open, setOpen] = useState(false)

    const {email, id, nick_name} = contact[0];


    const openMenu= () => {
       setMenu(prev => !prev)
    }
    const closeMenu = () => {
        setMenu(false)
    }

    const handleOpenModal = () => {
        setOpen(true)
    }

    const handleCloseModal = () => {
        setOpen(false)
    }


    const messagesArray = () => {
        return (
            <Box className={classes.dialog}>
            <Box className={classes.mess}>
                <Avatar/>
                <Paper className={classes.messBody}>
                    <Typography className={classes.text}>
                        ИспользуйнастройкидлядобавлениилиудаленияграницМожноустанавливатькаквсесразутакикаждуючастьпоотдельности

                    </Typography>
                    <Typography className={classes.date}>18:15</Typography>
                </Paper>
            </Box>

        <Box className={classes.mess}>
            <Avatar/>
            <Paper className={classes.messBody}>
                <Typography className={classes.text}>
                    ИспользуйнастройкидлядобавлениилиудаленияграницМожноустанавливатькаквсесразутакикаждуючастьпоотдельности

                </Typography>
                <Typography className={classes.date}>18:15</Typography>
            </Paper>
        </Box>

        <Box className={classes.mess}>
            <Avatar/>
            <Paper className={classes.messBody}>
                <Typography className={classes.text}>
                    ИспользуйнастройкидлядобавлениилиудаленияграницМожноустанавливатькаквсесразутакикаждуючастьпоотдельности

                </Typography>
                <Typography className={classes.date}>18:15</Typography>
            </Paper>
        </Box>

                <Box className={classes.mess}>
                    <Avatar/>
                    <Paper className={classes.messBody}>
                        <Typography className={classes.text}>
                            ИспользуйнастройкидлядобавлениилиудаленияграницМожноустанавливатькаквсесразутакикаждуючастьпоотдельности

                        </Typography>
                        <Typography className={classes.date}>18:15</Typography>
                    </Paper>
                </Box>
                <Box className={classes.mess}>
                    <Avatar/>
                    <Paper className={classes.messBody}>
                        <Typography className={classes.text}>
                            ИспользуйнастройкидлядобавлениилиудаленияграницМожноустанавливатькаквсесразутакикаждуючастьпоотдельности

                        </Typography>
                        <Typography className={classes.date}>18:15</Typography>
                    </Paper>
                </Box>
            </Box>
        )
    }

    const renderMess = messagesArray()
    return (
        <>
        <AppBar position='static' style={{boxShadow: '0px 4px 5px -1px rgb(0 0 0 / 20%)'}}>

            <Toolbar className={classes.infoBar}>
                <Box>
                    <Typography className={classes.nickContact}>{nick_name}</Typography>
                    <Typography className={classes.statusContact}>online</Typography>
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
                <Button className={classes.btnMunu} onClick={handleOpenModal}>Открыть профиль</Button>
                {isContact?
                     null : <Button onClick={() => addContact(id)} className={classes.btnMunu}>Добавить контакт</Button>
                }
                <Button onClick={() => closeDialog()} className={`${classes.btnMunu} ${classes.btnClose}`}>Закрыть диалог</Button>
            </Paper> }

            {isContact ?
                null : <Paper className={classes.isContact}>
                        <Button onClick={() => addContact(id)} className={classes.btnIsContact}>Добавить контакт</Button>
                        <Button className={`${classes.btnIsContact} ${classes.btnClose}`}>Удалить диалог</Button>
                    </Paper>
            }



              {renderMess}



        <form className={classes.form}>
           <TextField
               id="outlined-full-width"
               variant='outlined'
               fullWidth
              placeholder="Введите сообщение"
               className={classes.input}
           />
            <Button
                variant="text"
                className={classes.btnSend}
            >Отправить</Button>
        </form>

            <ModalDialogInfo
                open={open}
                handleClose={handleCloseModal}
                user={contact[0]}
            />
        </>
            )
}

export default Dialogs;
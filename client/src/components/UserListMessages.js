import React, {useState} from 'react';
import {
    Avatar,
    Button,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Tooltip,
    Typography
} from '@material-ui/core'
import {makeStyles} from "@material-ui/core/styles";
import ModalAddGroup from "./ModalAddGroup";

const useStyles = makeStyles({
    item: {
        transition: 'background .2s linear',
        '&:hover': {
            cursor: 'pointer',
            background: 'rgba(112,195,250,0.75)',
        '&:active': {
            background: 'rgba(37,174,255,0.75)'
        }
        }
    },
    addGroup: {
        width: '100%',
        height: '40px',
        background: '#cdcdcd',
        '&:hover': {
            background: '#999'
        },

    }
})



const UserListMessages = ({rooms, openRoom, allContacts, createGroupRoom}) => {
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const serverHost= process.env.REACT_APP_HOST_PORT_SERVER

    const handleClose = () => {
        setOpen(false)
    }

    if (!rooms.length) {
        return (
            <p>Сообщений нет</p>
        )
    }

    const addGroupRoom = (users) => {
        createGroupRoom(users)
        setOpen(false)
    }

    return (
        <>
            <Tooltip title='Создать беседу'>
                <Button onClick={() => setOpen(true)} className={classes.addGroup}><span className="material-icons">add</span></Button>
            </Tooltip>
            <List>
                {rooms.map(({room_name, id: room_id, room_avatar, last_mess,type, users}) => {
                            let lastMess = last_mess === null ? '' : last_mess

                    return (
                           <div className={classes.item} key={room_id} onClick={() => openRoom(room_id, users[0].id)} >
                               <ListItem alignItems="flex-start">
                                   <ListItemAvatar>
                                       <Avatar alt="Remy Sharp" src={room_avatar || null} />
                                   </ListItemAvatar>
                                   <ListItemText
                                       primary={room_name}
                                       secondary={
                                           <React.Fragment>
                                               <Typography
                                                   component="span"
                                                   variant="body2"
                                                   color="textPrimary"
                                               >
                                                 {lastMess.length > 22 ? lastMess.slice(0,22) + '...' : lastMess}
                                               </Typography>

                                           </React.Fragment>
                                       }
                                   />
                               </ListItem>
                               <Divider variant="inset" component="li" />
                           </div>
                    )
                })}
            </List>

            {open ? <ModalAddGroup
                open={open}
                handleClose={handleClose}
                allContacts={allContacts}
                addGroupRoom={addGroupRoom}
            /> : null}

        </>

    )
}

export default UserListMessages;
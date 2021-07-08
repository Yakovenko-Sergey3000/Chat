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
    Typography,
    Badge
} from '@material-ui/core'
import {makeStyles, withStyles} from "@material-ui/core/styles";
import ModalAddGroup from "./ModalAddGroup";
import {AvatarGroup} from "@material-ui/lab";

const StyledBadge = withStyles((theme) => ({
    badge: {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      
    },
   
    
  }))(Badge);

 

const useStyles = makeStyles({
    item: {
        position: 'relative',
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
    },
    small: {
        width: '35px',
        height: '35px',
    },
    badge: {
        width:'20px',
        margin: 'auto 0',
        backgroundColor: '#3f51b5',
        color: '#fff',
        textAlign: 'center',
       borderRadius: '50%'
    }
    
})



const UserListMessages = ({rooms, openRoom, allContacts, createGroupRoom}) => {
    const classes = useStyles()
    const [open, setOpen] = useState(false)


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

    const renderRoomsAvatar = (type, users, room_avatar) => {
        if(type === 'privat' && users[0].status) {
                return (
                    <StyledBadge
                        overlap="circle"
                        anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                        }}
                        variant="dot"
                    >
                        <Avatar alt="Avatar" src={room_avatar}/> 
                    </StyledBadge>
                    
                    
                )
        } else {
            return (
                <AvatarGroup max={2}>
                    {users.map(({url_avatar, id}) => {
                        return <Avatar key={id} className={classes.small} alt="Avatar" src={url_avatar || null}/>
                    })}
                </AvatarGroup>
            )
        }
    }

    const renderCountMess = (num) => {

        if(num) {
            return (
                <div className={classes.badge}>{num.count}</div>
            )
        } else {
            return null
        }

    }

    return (
        <>
            <Tooltip title='Создать беседу'>
                <Button onClick={() => setOpen(true)} className={classes.addGroup}><span className="material-icons">add</span></Button>
            </Tooltip>
            <List>
                {rooms.map(({room_name, id: room_id, type, room_avatar, last_mess, users, counDontRead}) => {
                            let lastMess = last_mess === null ? '' : last_mess
                            
                                 let RenderAvatar =renderRoomsAvatar(type, users, room_avatar)
                            let RenderCountMess = renderCountMess(counDontRead)
                            
                    return (
                           <div className={classes.item} key={room_id} onClick={() => openRoom(room_id, users[0].id)} >
                               <ListItem alignItems="flex-start">
                                   <ListItemAvatar>
                                      {RenderAvatar}
                                   </ListItemAvatar>
                                   
                                   <ListItemText
                                       primary={room_name.length > 22 ? room_name.slice(0, 22): room_name}
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
                                
                                  {RenderCountMess}
                                   
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
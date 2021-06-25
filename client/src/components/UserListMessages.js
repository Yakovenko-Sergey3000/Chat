import React, {useEffect} from 'react';
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



const UserListMessages = ({rooms, openRoom, lastMess}) => {
    const classes = useStyles()

    if (!rooms.length) {
        return (
            <p>Сообщений нет</p>
        )
    }

    return (
        <>
            <Tooltip title='Добавить группу'>
                <Button className={classes.addGroup}><span className="material-icons">add</span></Button>
            </Tooltip>
            <List>
                {rooms.map(({nick_name, email, id, room_id, last_mess}) => {
                    return (
                           <div className={classes.item} key={id} onClick={() => openRoom(id, room_id)} >
                               <ListItem alignItems="flex-start">
                                   <ListItemAvatar>
                                       <Avatar alt="Remy Sharp" />
                                   </ListItemAvatar>
                                   <ListItemText
                                       primary={nick_name}
                                       secondary={
                                           <React.Fragment>
                                               <Typography
                                                   component="span"
                                                   variant="body2"
                                                   color="textPrimary"
                                               >
                                                   {lastMess ? lastMess : last_mess}
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

        </>

    )
}

export default UserListMessages;
import React from 'react';
import {Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography} from '@material-ui/core'
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
    }
})



const UserListMessages = ({rooms, openRoom}) => {
    const classes = useStyles()

    if (!rooms.length) {
        return (
            <p>Сообщений нет</p>
        )
    }

    return (
        <>
            <List>
                {rooms.map(({nick_name, email, id}) => {
                    return (
                           <div className={classes.item} key={id} onClick={() => openRoom(id)} >
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
                                                   {email}
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
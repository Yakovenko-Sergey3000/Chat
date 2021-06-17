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



const UserListMessages = ({mess}) => {
    const classes = useStyles()

    if (!mess.length) {
        return (
            <p>Сообщений нет</p>
        )
    }

    return (
        <>


            <List>
                {mess.map(({author, mess, id}) => {
                    return (
                           <div className={classes.item} key={id}>
                               <ListItem alignItems="flex-start">
                                   <ListItemAvatar>
                                       <Avatar alt="Remy Sharp" />
                                   </ListItemAvatar>
                                   <ListItemText
                                       primary={author}
                                       secondary={
                                           <React.Fragment>
                                               <Typography
                                                   component="span"
                                                   variant="body2"
                                                   color="textPrimary"
                                               >
                                                   {mess}
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
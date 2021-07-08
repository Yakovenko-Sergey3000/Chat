import React, {useState} from 'react';
import {
    Avatar,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
    Badge
} from '@material-ui/core'
import {makeStyles, withStyles} from "@material-ui/core/styles";
import LodingUsers from "./LodingUsers";
import ModalContacts from "./ModalContacts";


const StyledBadge = withStyles((theme) => ({
    badge: {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      
    },
   
    
  }))(Badge);


const useStyles = makeStyles({
    item: {
        transition: 'background .2s linear',
        '&:hover': {
            cursor: 'pointer',
            background: 'rgba(112,195,250,0.75)'
        },
        '&:active': {
            background: 'rgba(37,174,255,0.75)'
        }
    }
})



const UserContacts = ({contacts, openRoom, removeContact}) => {
    const classes = useStyles()
    const [openModal, setOpenModal] = useState(false);
    const [user, setUser] = useState(null);





    const handleOpenModal = (e) => {
       const id = e.target.closest('li').getAttribute('id') // Прокидывает id в модальное окно
        setUser(contacts.find(item => item.id === +id))
        setOpenModal(true);
    };


    const handleCloseModal = () => {
        setOpenModal(false);
    };
    const hadndleOpenRoom = (id) => {
        openRoom(id)
        setOpenModal(false)
    }

    const handleRemoveContact = (id) => {
        removeContact(id)
        setOpenModal(false)
    }



    const RenderList = () => {
          return  contacts.map(({email, id, nick_name, url_avatar, status}) => {
                    return (
                        <div key={id}>
                            <ListItem onClick={handleOpenModal} alignItems="flex-start"  className={classes.item} id={id}>
                                <ListItemAvatar>
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
                })

    }




    const render = RenderList()

    if(!contacts.length) {
        return <Typography style={{margin: '10px'}}>У вас нет контактов</Typography>
    }
    return (
        <>
       <List>
           {contacts.length ? render: <LodingUsers/> }
       </List>
            {!openModal? null:
                <ModalContacts
                    open={openModal}
                    handleClose={handleCloseModal}
                    user={user}
                    onOpenRoom={hadndleOpenRoom}
                    onRemoveContact={handleRemoveContact}
                />}
        </>
    )

}



export default UserContacts;
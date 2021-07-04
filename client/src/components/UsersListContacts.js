import React, {useState} from 'react';
import {
    Avatar,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography
} from '@material-ui/core'
import {makeStyles} from "@material-ui/core/styles";
import LodingUsers from "./LodingUsers";
import ModalContacts from "./ModalContacts";


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
          return  contacts.map(({email, id, nick_name, url_avatar}) => {
                    return (
                        <div key={id}>
                            <ListItem onClick={handleOpenModal} alignItems="flex-start"  className={classes.item} id={id}>
                                <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src={url_avatar}/>
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
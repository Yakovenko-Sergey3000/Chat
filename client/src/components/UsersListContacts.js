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
import ModalUsersInfo from "./ModalUsersInfo";


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



const UserContacts = ({contacts}) => {
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

    if(!contacts.length) {
        return (
            <LodingUsers/>
        )
    }
    return (
        <>
       <List>
           {contacts.map(({email, id}) => {
             return (
                <div key={id}>
                     <ListItem onClick={handleOpenModal} alignItems="flex-start"  className={classes.item} id={id}>
                         <ListItemAvatar>
                             <Avatar alt="Remy Sharp" />
                         </ListItemAvatar>
                         <ListItemText
                             primary={email}
                             secondary={
                                 <React.Fragment>
                                     <Typography
                                         component="span"
                                         variant="body2"
                                         color="textPrimary"
                                     >
                                         online
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
            {!openModal? null:
                <ModalUsersInfo
                    open={openModal}
                    handleClose={handleCloseModal}
                    user={user}
                />}
        </>
    )
}

export default UserContacts;
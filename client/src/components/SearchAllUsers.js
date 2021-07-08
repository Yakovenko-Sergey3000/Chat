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
import ModalAddContact from "./ModalAddContact";


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





const SearchAllUsers = ({allUsers, addContact, authUser}) => {
    const classes = useStyles();
    const [openModal, setOpenModal] = useState(false);
    const [user, setUser] = useState(null);

        const handleOpenModal = (e) => {
           const id = e.target.closest('li').getAttribute('id');// Прокидывает id в модальное окно
            setUser(allUsers.find(item => item.id === +id))
            setOpenModal(true);
        };


    const handleCloseModal = () => {
        setOpenModal(false);
    };
    const handleAddContact = (id) => {
        addContact(id)
        setOpenModal(false)
    }

   
    
    if(allUsers.length === 1) {
        return (
            <Typography style={{margin: '10px'}}>Вы первый пользователь =)</Typography>
        )
    }

    return (
        <>
        <List>
            {allUsers.map(({email, id, nick_name, url_avatar, status}) => {
                if(id === authUser) {
                    return null
                }
                return (
                    <div key={id} >
                        <ListItem alignItems="flex-start"className={classes.item} onClick={handleOpenModal} id={id}>
                            <ListItemAvatar >
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

            })}
        </List>
            {!openModal? null :
                <ModalAddContact
                open={openModal}
                handleClose={handleCloseModal}
                user={user}
                onAddContact={handleAddContact}
            /> }
        </>
    )
}

export default SearchAllUsers;
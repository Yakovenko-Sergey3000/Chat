import React, {useState, useContext, useEffect} from 'react';
import {Container, Grid, Icon, AppBar, Tabs, Tab, Box, Typography} from '@material-ui/core'
import PropTypes from 'prop-types';
import { makeStyles } from "@material-ui/core/styles";
import UserSettings from "../components/UserSettings";
import UserListMessages from "../components/UserListMessages";
import UsersContacts from "../components/UsersListContacts";
import { AuthContext } from "../context/AuthContext";
import socket from '../components/socket';
import SearchAllUsers from "../components/SearchAllUsers";
import {Link} from "react-router-dom";
import {useHttp} from "../hooks/http.hook";
import Dialogs from "../components/Dialogs";



const useStyles = makeStyles({
    container: {
        maxHeight: '650px',
        boxShadow: '0px 5px 10px 2px rgba(34, 60, 80, 0.2)',
        position: 'relative'
    },
    menuPanel: {
        backgroundColor: 'rgba(105,173,246,0.85)'

    },
    panel: {
        height: '650px',
        backgroundColor: '#fff',
        overflow: 'auto',
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
    btn: {
        minWidth: '80px',

    }
})

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={1}>
                    <Typography component={'div'}>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const  a11yProps = (index) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const ChatPage = () => {

    const [value, setValue] = useState(0);
    const [contacts, setContacts] = useState([]);
    const [userMess, setUserMess] = useState([
        {
            author: 'Alex',
            mess: 'Hello',
            id: 1
        }
    ])


    const [allUsers, setAllUsers]  = useState(null)
    const auth = useContext(AuthContext)
    const [user, setUser] = useState('')
    const { request } = useHttp()
    const [dialog, setDialog] = useState(null)

    useEffect(() => {
        let user = auth.user
        if(user) {
            setUser(user)
            socket.emit('user:login', user.id)
        }
    }, [auth.user])


    const logout = () => {
           socket.emit('user:exit', user.id)
        setUser('')
        auth.logout()
    }

    const findAllUsers =  async () => {
      const res = await request('api/search');
        setAllUsers(res)
    }

    const userContacts = async () => {
       const res = await request('/api/contacts',
           'POST',
           JSON.stringify({userId: user.id}),
           {'Content-Type': 'application/json'
           })
        setContacts(res)
    }
    const addContact = async (contactId) => {
        await request('/api/addContact',
            'POST',
            JSON.stringify({userId: user.id, contactId}),
            {'Content-Type': 'application/json'
            })

    }

    const classes = useStyles()
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const createRoom =  (id) => {
        setDialog(id)
    }

    const removeContact = async (id) => {
        await request(
            '/api/contacts',
            'DELETE',
            JSON.stringify({
                userId: user.id,
                contactId: id
            }),
            {'Content-Type': 'application/json'}
        )
    }

    return (

            <Container fixed>
                <Grid container className={classes.container} >
                    <Grid item xs={3} className={classes.panel}>
                        <AppBar position={'sticky'}>
                            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" className={classes.menuPanel}>
                                <Tab component={Link} to='/mess'  label={<Icon><span className="material-icons.md-18">mail</span></Icon>}{...a11yProps(0)} className={classes.btn} />
                                <Tab component={Link} to='/contacts' onClick={userContacts} label={<Icon><span className="material-icons.md-18">perm_contact_calendar</span></Icon>} {...a11yProps(1)} className={classes.btn} />
                                <Tab component={Link} to='/search' onClick={findAllUsers} label={<Icon><span className="material-icons.md-18">search</span></Icon>} {...a11yProps(2)} className={classes.btn} />
                                <Tab component={Link} to='/settings' label={<Icon><span className="material-icons.md-18">build_circle</span></Icon>} {...a11yProps(3)} className={classes.btn}/>
                            </Tabs>
                        </AppBar>
                        <TabPanel value={value} index={0}>
                            <UserListMessages mess={userMess} />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <UsersContacts
                                contacts={contacts}
                                createRoom={createRoom}
                                removeContact={removeContact}
                            />
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <SearchAllUsers
                                allUsers={allUsers}
                                addContact={addContact}
                                authUser={user.id}
                            />
                        </TabPanel>
                        <TabPanel value={value} index={3}>
                            <UserSettings logout={logout} user={user} />
                        </TabPanel>

                    </Grid>
                    <Grid item xs={9} style={{ backgroundImage: 'url("https://sun9-29.userapi.com/impf/c846121/v846121899/c610b/YQ5hYoJ9fNY.jpg?size=1280x1280&quality=96&sign=0dfe59067645a7dd9e655556e198492a&type=album")' }}>
                        {dialog? <Dialogs id={dialog}/> : null}
                    </Grid>

                </Grid>
            </Container>

    )
}

export default ChatPage;
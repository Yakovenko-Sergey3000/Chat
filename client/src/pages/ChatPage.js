import React, {useState, useContext, useEffect, useRef, useCallback} from 'react';
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

    const [allContacts, setAllContacts] = useState([]);
    const [allUsers, setAllUsers]  = useState(null)

    const [tabValue, setTabValue] = useState(0);
    const [isContact, setIsContact] = useState(false)
    const [rooms, setRooms] = useState([])



    const [user, setUser] = useState('')
    const { request } = useHttp()
    const [dialog, setDialog] = useState([])
    const [roomMess, setRoomMess] = useState([])
    const firstRender = useRef(false)
    const [trigerMess, setTrigerMess] = useState(true)





    const auth = useContext(AuthContext)
    const classes = useStyles()


    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };



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

        setAllContacts(res)
    }

    const userRooms = async () => {

        const rooms = await request(
            '/api/allUserRooms',
            'POST',
            JSON.stringify({userId: user.id}),
            {'Content-Type': 'application/json'}
        )



        const roomName = rooms.map(item => {
            if (item.type === 'privat') {
                return {
                    ...item,
                    room_name: item.users[0].nick_name,
                    room_avatar: item.users[0].url_avatar
                }
            } else {
                return item
            }
        })

        setRooms(roomName)
        await userContacts()
    }

    const addContact = async (contactId) => {
       const userContacts =  await request('/api/addContact',
            'POST',
            JSON.stringify({userId: user.id, contactId}),
            {'Content-Type': 'application/json'
            })

        if(userContacts.length) {
            setIsContact(true)
            setAllContacts(userContacts)
        }

    }


    const removeContact = async (id) => {
      const contacts = await request(
            '/api/contacts',
            'DELETE',
            JSON.stringify({
                userId: user.id,
                contactId: id
            }),
            {'Content-Type': 'application/json'}
        )

        setDialog([])
        setAllContacts(contacts)

    }






    const openRoomModal = async (contactId) => {
        const room =  await request(
            '/api/openRoom',
            'POST',
            JSON.stringify({
                userId: user.id,
                contactId: contactId
            }),
            {'Content-Type': 'application/json'}
        )

        const roomName = room.map(item => {
            return {
                ...item, room_name: item.users[0].nick_name,
                        room_avatar: item.users[0].url_avatar
            }
        })
        setIsContact(true)
        setDialog(roomName)
        getMessRoom(room[0].id)
        joinRoom(room[0].id)
        leaveRoom()

    }


    const createGroupRoom = async ({users, room_name}) => {

        if(users.length > 1) {
           await request(
               '/api/createGroup',
               'POST',
               JSON.stringify({
                   userAdmin: user.id,
                   arrayUsers: users,
                   room_name
               }),
               {'Content-Type': 'application/json'}
           )
        } else {
            openRoomModal(users[0].id)
        }
    }

    const openRoomMess = (room_id, contactId) => {
        const room = rooms.filter(item => item.id === room_id)
        if(room[0].type === 'group') {
            setIsContact(true)
        } else {
            const res = !!allContacts.find(item => item.id === contactId);
            setIsContact(res)
        }
        setDialog(room)
        getMessRoom(room_id)
        joinRoom(room_id)
        leaveRoom()
    }


    const closeDialog = () => {
        setDialog([])
    }

    const joinRoom = (roomId) => {
        socket.emit('room:Join', roomId)
    }




    const getMessRoom = (roomId) => {
        socket.emit('room:getMessRoom', roomId)
        socket.on('setMessRoom', data => {
            setRoomMess(data)
        })
    }

    const sendMess = (contactId, text, roomId, created) => {
       socket.emit('user:sendMess', {
           contactId, text, roomId, userId: user.id, created
       })

    }


   const leaveRoom =  useCallback(() => {
       if(dialog.length) {
           socket.emit('room:Leave', dialog[0].id)
       }
    }, [dialog])




    socket.on('historyMess', data => {
        setRoomMess(data)
    })


    useEffect(() => {
            socket.on('massageInRoom', (data) => {
                console.log(data)
            })
    })



    // useEffect(() => {
    //
    //     if(firstRender.current) {
    //         console.log('triger')
    //         // userRooms()
    //     } else {
    //         firstRender.current = true
    //     }
    //
    // }, [])



    return (

            <Container fixed>
                <Grid container className={classes.container} >
                    <Grid item xs={3} className={classes.panel}>
                        <AppBar position={'sticky'}>
                            <Tabs value={tabValue} onChange={handleChange} aria-label="simple tabs example" className={classes.menuPanel}>
                                <Tab component={Link} to='/mess'  onClick={userRooms} label={<Icon><span className="material-icons.md-18">mail</span></Icon>}{...a11yProps(0)} className={classes.btn} />
                                <Tab component={Link} to='/contacts' onClick={userContacts} label={<Icon><span className="material-icons.md-18">perm_contact_calendar</span></Icon>} {...a11yProps(1)} className={classes.btn} />
                                <Tab component={Link} to='/search' onClick={findAllUsers} label={<Icon><span className="material-icons.md-18">search</span></Icon>} {...a11yProps(2)} className={classes.btn} />
                                <Tab component={Link} to='/settings' label={<Icon><span className="material-icons.md-18">build_circle</span></Icon>} {...a11yProps(3)} className={classes.btn}/>
                            </Tabs>
                        </AppBar>
                        <TabPanel value={tabValue} index={0}>
                            <UserListMessages
                                rooms={rooms}
                                openRoom={openRoomMess}
                                allContacts={allContacts}
                                createGroupRoom={createGroupRoom}
                            />

                        </TabPanel>
                        <TabPanel value={tabValue} index={1}>
                            <UsersContacts
                                contacts={allContacts}
                                openRoom={openRoomModal}
                                removeContact={removeContact}
                            />
                        </TabPanel>
                        <TabPanel value={tabValue} index={2}>
                            <SearchAllUsers
                                allUsers={allUsers}
                                addContact={addContact}
                                authUser={user.id}
                            />
                        </TabPanel>
                        <TabPanel value={tabValue} index={3}>
                            <UserSettings
                                logout={logout}
                                user={user}

                            />
                        </TabPanel>

                    </Grid>
                    {/*<Grid item xs={9} style={{ backgroundImage: 'url("https://sun9-29.userapi.com/impf/c846121/v846121899/c610b/YQ5hYoJ9fNY.jpg?size=1280x1280&quality=96&sign=0dfe59067645a7dd9e655556e198492a&type=album")' }}>*/}
                    <Grid item xs={9} style={{ background: 'rgba(245,238,196,0.78)' }}>

                    {dialog.length ? <Dialogs
                            room={dialog}
                            closeDialog={closeDialog}
                            isContact={isContact}
                            addContact={addContact}
                            sendMess={sendMess}
                            allHistoryMess={roomMess}
                            user={user}
                        /> : null}
                    </Grid>

                </Grid>
            </Container>

    )
}

export default ChatPage;
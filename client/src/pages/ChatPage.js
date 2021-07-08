import React, {useState, useContext, useEffect,useCallback} from 'react';
import {Container, Grid, Icon, AppBar, Tabs, Tab, Box, Typography,Badge} from '@material-ui/core'
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
import LodingUsers from '../components/LodingUsers';






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
    const [allUsers, setAllUsers]  = useState([])

    const [tabValue, setTabValue] = useState(0);
    const [isContact, setIsContact] = useState(false)
    const [rooms, setRooms] = useState([])
    const auth = useContext(AuthContext)
    

    const [user, setUser] = useState({})
    const { request } = useHttp()
    const [dialog, setDialog] = useState([])
    const [roomMess, setRoomMess] = useState([])
    const [trigerGroup, setTriggerGroup] = useState(false)
    const [dontReadMessCount, setDontReadMessCount] = useState(0)

    const [loding, setLoding] = useState(false)




    
    const classes = useStyles()


    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

   
    
    useEffect(() => {
            if(auth.user) {
                setUser(auth.user)
            }
    }, [auth])

    useEffect(() => {
        if(user.id) {
            socket.emit('user:login', user.id)
        }
    }, [user])



    const logout = () => {
           socket.emit('user:exit', user.id)
        setUser('')
        auth.logout()
    }

    const findAllUsers =  async () => {
        setLoding(true)
      const res = await request('api/search');
        setAllUsers(res)
        setLoding(false)
    }

    const userContacts = async () => {
        setLoding(true)
       const res = await request('/api/contacts',
           'POST',
           JSON.stringify({userId: user.id}),
           {'Content-Type': 'application/json'
           })

        setAllContacts(res)
        setLoding(false)
    }



    useEffect(() => {
        
        if(user.id) {
            
            request(
                '/api/allUserRooms',
                'POST',
                JSON.stringify({userId: user.id}),
                {'Content-Type': 'application/json'}
            )
                .then(rooms => {

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
                    userContacts()
                    setRooms(roomName)
                    

                })
        }
        

    }, [user, roomMess,trigerGroup])

    

    useEffect(() => {
        if(rooms.length) {
            request(
                '/api/getMessStatus',
                'POST',
                JSON.stringify({
                    roomsId: rooms.map(({id}) => id),
                    userId: user.id
                }),
                {'Content-Type': 'application/json'}
                
                )
                .then(count => {
                    setDontReadMessCount(count[0].count)
                })
        }
    }, [rooms])

    


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
        setMessStatus(room[0].id)
        setIsContact(true)
        setDialog(roomName)
        joinRoom(room[0].id)
        leaveRoom()
        setTabValue(0)

    }

       
    const createGroupRoom = async ({users, room_name}) => {
        setTriggerGroup(prev => !prev)
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
           leaveRoom()
          
        } else {
            openRoomModal(users[0].id)
            leaveRoom()
        }
    }

    const updateSizeGroup = async (roomId, users,roomName, userId) => {
        socket.emit('user:updateGroup', {
            room_id: roomId,
            users: users,
            room_name: roomName,
            user_id: userId
        })

    }

    const setMessStatus = (roomId) => {
        socket.emit('user:setMessStatus', {
            userId: user.id,
            roomId
        })
    }
   

    const openRoomMess = (room_id, contactId) => {
        const room = rooms.filter(item => item.id === room_id)
        if(room[0].type === 'group') {
            setIsContact(true)
        } else {
            const res = !!allContacts.find(item => item.id === contactId);
            setIsContact(res)
        }
        
        setMessStatus(room_id)
        setDialog(room)
        joinRoom(room_id)
        leaveRoom()

        
    }


    const closeDialog = () => {
        setDialog([])
    }

    const joinRoom = (roomId) => {
        socket.emit('room:Join', roomId)
    }



   useEffect(() => {
      if(dialog.length) {
          socket.emit('room:getMessRoom', dialog[0].id)
          socket.on('setMessRoom', data => {
              setRoomMess(data)
          })
      }
    }, [dialog])





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



    useEffect(() => {
        socket.on('historyMess', data => {
            setRoomMess(data)
        })
        socket.on('newMess', data => {
            setTriggerGroup(prev => !prev)
        })
        socket.on('updateGroup', () => {
            setTriggerGroup(prev => !prev)
        })
    }, [roomMess])

    

    const removeMessages = (roomId) => {
        socket.emit('room:removeMess', roomId)
    }

    const removeRoom = (roomId) => {
        removeMessages(roomId)
        socket.emit('room:removeRoom', roomId)
        leaveRoom()
        setDialog([])
    }

    
    
    return (

            <Container fixed>
                <Grid  container className={classes.container} >
                    <Grid item xs={3} className={classes.panel}>
                        <AppBar position={'sticky'}>
                            <Tabs value={tabValue} onChange={handleChange} aria-label="simple tabs example" className={classes.menuPanel}>
                              
                                 <Tab component={Link} to='/mess'  label={
                                    <Badge
                                        badgeContent={dontReadMessCount > 0? dontReadMessCount: null} 
                                        color="secondary">
                                        <Icon><span className="material-icons.md-18">mail</span></Icon>
                                    </Badge>
                                 }{...a11yProps(0)} className={classes.btn} />
                               
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
                        {loding? <LodingUsers/>: 
                            <UsersContacts
                                contacts={allContacts}
                                openRoom={openRoomModal}
                                removeContact={removeContact}
                            />
                        }
                        </TabPanel>
                        <TabPanel value={tabValue} index={2}>
                        {loding ? <LodingUsers/>: 
                            <SearchAllUsers
                                allUsers={allUsers}
                                addContact={addContact}
                                authUser={user.id}
                            />
                        }
                        </TabPanel>
                        <TabPanel value={tabValue} index={3}>
                            <UserSettings
                                logout={logout}
                                user={user}

                            />
                        </TabPanel>

                    </Grid>
                     <Grid item xs={9} style={{backgroundImage: 'url("YQ5hYoJ9fNY.jpg")' }}>
                    {dialog.length ? <Dialogs
                            room={dialog}
                            closeDialog={closeDialog}
                            isContact={isContact}
                            addContact={addContact}
                            sendMess={sendMess}
                            allHistoryMess={roomMess}
                            user={user}
                            removeMess={removeMessages}
                            removeRoom={removeRoom}
                            allContacts={allContacts}
                            updateSizeGroup={updateSizeGroup}
                            setMessStatus={setMessStatus}

                        /> : null}
                    </Grid>

                </Grid>
            </Container>

    )
}

export default ChatPage;
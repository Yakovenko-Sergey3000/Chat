import React, {useEffect, useState} from 'react';
import {Avatar, Grid, Button, Input, InputLabel, Icon, Box} from '@material-ui/core'
import {makeStyles} from "@material-ui/core/styles";
import {useCookies} from "react-cookie";


const useStyles = makeStyles({
    avatar: {
        marginTop: '30px',
        width: '100px',
        height: '100px'
    },
    inputAddAvatar: {display:'none'},
    fakeInputAddAvatar: {
        marginTop: '20px',
        textAlign: 'center',
        color: "#30a1f1",
        '&:hover': {
            color: "#2275af",
            cursor: 'pointer'
        }
    },
    btn: {
        color: 'rgba(105,173,246,0.85)',
        borderColor: 'rgba(105,173,246,0.85)',
        marginTop: '20px'
    },
    btnLogout: {
        color: 'rgba(243,68,68,0.84)',
        borderColor: 'rgba(243,68,68,0.84)'
    }


})

const UserSettings = ({logout, user}) => {
    const classes = useStyles()
    const {nick_name, sity, id, url_avatar} = user;
    const [nickInput, setNickInput] = useState('')
    const [sityInput, setSityInput] = useState('')
    const [avatar, setAvatar] = useState('')
    const [disableBtn, setDisableBtn] = useState(true)
    const [cookie] = useCookies(['idSess'])



    useEffect(() => {
        if(sity) {
            setSityInput(sity)
        }
        
        setNickInput(nick_name)

    }, [])
    useEffect(() => {

        if(sityInput === sity && nickInput === nick_name && avatar === '') {
            setDisableBtn(true)
        } else {
            setDisableBtn(false)
        }

    }, [nickInput, sityInput, avatar])

        const idSess = cookie.idSess
    return (

            <Grid container direction={'column'} alignItems={'center'} component={'div'}>
                <Avatar className={classes.avatar} src={url_avatar} />

                       <form action='/api/settings' method='POST' encType='multipart/form-data'>
                           <InputLabel className={classes.fakeInputAddAvatar} htmlFor={'addAvatar'}><Icon><span className="material-icons-outlined.md-36">add_a_photo</span></Icon><span>Добавить фото</span></InputLabel>

                           <Input
                               name='avatar'
                               className={classes.inputAddAvatar}
                               id={'addAvatar'}
                               type={'file'}
                               placeholder={'Добавить аватарку'}
                               accept='image/*'
                               onChange={(e) => setAvatar('url')}

                           />
                           <Input type='hidden' name='idSess' value={idSess}/>
                           <Input type='hidden' name='id' value={id}/>



                           <Box mt={4} component={'div'}>
                               <InputLabel>Изменить ник:</InputLabel>
                               <Input type={'text'}
                                      name='nick_name'
                                      value={nickInput}
                                      onChange={(e) => setNickInput(e.target.value)}/>
                           </Box>
                           <Box mt={2}>
                               <InputLabel>Город:</InputLabel>
                               <Input
                                   type={'text'}
                                   name='sity'
                                   value={sityInput}
                                   onChange={(e) => setSityInput(e.target.value)}
                               />
                           </Box>
                        <Box>
                            <Button
                                variant={'outlined'}
                                className={classes.btn}
                                type='submit'
                                disabled={disableBtn}

                            >Сохранить настройки</Button>

                        </Box>

                           <Box textAlign={'center'} mt={2}>
                               <Button variant={'outlined'} className={classes.btnLogout} onClick={() => logout()}>Выйти</Button>
                           </Box>



                       </form>
            </Grid>


    )
}

export default UserSettings;
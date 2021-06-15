import React from 'react';
import {Avatar, Grid, Button, Input, InputLabel, Icon, Box} from '@material-ui/core'
import {makeStyles} from "@material-ui/core/styles";


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
    const {nickName, sity=''} = user;
    return (

            <Grid container direction={'column'} alignItems={'center'} component={'div'}>


                <Avatar className={classes.avatar} src='https://i.pinimg.com/236x/74/05/5f/74055f83bfbdc20fdc1f9d1fc116fd26.jpg'/>

                       <form>
                           <InputLabel className={classes.fakeInputAddAvatar} htmlFor={'addAvatar'}><Icon><span className="material-icons-outlined.md-36">add_a_photo</span></Icon><span>Добавить фото</span></InputLabel>

                           <Input className={classes.inputAddAvatar} id={'addAvatar'} type={'file'}laceholder={'Добавить аватарку'}/>

                           <Box mt={4} component={'div'}>
                               <InputLabel>Изменить ник:</InputLabel>
                               <Input type={'text'} value={nickName}/>
                           </Box>
                           <Box mt={2}>
                               <InputLabel>Город:</InputLabel>
                               <Input type={'text'} value={sity}/>
                           </Box>
                        <Box>
                            <Button variant={'outlined'} className={classes.btn}>Сохранить настройки</Button>

                        </Box>

                           <Box textAlign={'center'} mt={2}>
                               <Button variant={'outlined'} className={classes.btnLogout} onClick={() => logout()}>Выйти</Button>
                           </Box>

                       </form>
            </Grid>


    )
}

export default UserSettings;
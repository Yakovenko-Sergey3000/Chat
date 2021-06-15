import React, {useContext, useState} from 'react'
import {
    Button, Grid, TextField, Typography, Box, Snackbar
} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles';
import {useHttp} from '../hooks/http.hook';
import {AuthContext} from "../context/AuthContext";



const useStyles= makeStyles({
    form: {
        width: '300px',
        marginTop: '50px',
        padding: '20px',
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'space-between',
    }
})



const LoginPage = () => {
    const styles = useStyles()
    const {request} = useHttp()
    const [form, setForm] = useState({
        email: '', password: ''
    });
    const [responce, setResponce] = useState({
        open: false, horizontal: 'right', vertical:'top', msg: ''
    });
    const auth = useContext(AuthContext);


    const login = async (e) => {
        e.preventDefault()
        try{
           const data =  await request('api/auth/login', 'POST', JSON.stringify(form) , {'Content-Type': 'application/json'});
           auth.login(data.idSess, data.user)
        }catch (e) {
            setResponce({...responce, open: true, msg: e.message})
        }
    }



    const onChangeHadler = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

   

    const {open, horizontal, vertical, msg} = responce;

    return(
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center">

                <form className={styles.form} onSubmit={login}>
                    <Box display={'flex'} justifyContent={'space-between'}>
                        <Typography component="h1">Вход</Typography>
                        <Button variant={'outlined'} color={'primary'} href={'/registrarion'}>Регистрация</Button>
                    </Box>

                    <TextField
                        label={'E-mail'}
                        name={'email'}
                        margin={'normal'}
                        onChange={onChangeHadler}/>
                    <TextField
                        label={'Пароль'}
                        name={'password'}
                        type={'password'}
                        margin={'normal'}
                        onChange={onChangeHadler}/>

                    <Button
                        variant={'contained'}
                        type={'submit'}
                        color={'primary'}>Войти</Button>
                    
                </form>
               

            <Snackbar
                message={msg}
                open={open}
                anchorOrigin={{horizontal, vertical}}
                autoHideDuration={6000}
            />
        </Grid>
    )
}

export default LoginPage;
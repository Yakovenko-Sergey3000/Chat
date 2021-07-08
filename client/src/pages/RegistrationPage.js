import React, {useContext, useState} from 'react'
import {
    Button, Grid, TextField, Typography, Box, FormHelperText, Snackbar
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



const RegistarionPage = () => {
    const styles = useStyles()
    const {request} = useHttp()
    const [form, setForm] = useState({
        email: '', passOne: '', passTwo: ''
    });
    const [isValidPass, setIsValidPass] = useState('');
    const [responce, setResponce] = useState({
        open: false, horizontal: 'right', vertical: 'top', msg: ''
    });
    const auth = useContext(AuthContext);

    const coincidencePass = (a, b) => {
        return a === b;
    }

    const onChangeHadler = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }


        const onSubmitForm = async (e) => {
            e.preventDefault()
            setIsValidPass('')
            if(!coincidencePass(form.passOne, form.passTwo)) {
                setIsValidPass('Пароли не совпадают')
                return
            }

            const validDate = {
                email: form.email,
                password: form.passOne
            }


            try {
                const data = await request('api/auth/registration', 'POST', JSON.stringify(validDate) , {'Content-Type': 'application/json'});
                auth.login(data.idSess, data.user)
            } catch (e) {
                const errMess = e.message.split(',').join(' или ');
                setResponce({...responce, open: true, msg: errMess}) //TODO update test
            }

        }

        const handleClose = () => {
            setResponce({...responce, open: false});
          };


    const {open, horizontal, vertical, msg} = responce;
    return(

        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center">

            <form id={'formID'} className={styles.form} onSubmit={onSubmitForm}>
                <Box display={'flex'} justifyContent={'space-between'}>
                    <Typography component="h1">Регистрация</Typography>
                    <Button variant={'outlined'} color={'primary'} href={'/'}>Войти</Button>
                </Box>

                <TextField
                    label={'Введите e-mail'}
                    name={'email'}
                    margin={'normal'}
                    onChange={onChangeHadler}/>

                <TextField
                    label={'Введите пароль'}
                    name={'passOne'}
                    type={'password'}
                    margin={'normal'}
                    onChange={onChangeHadler}/>
                <FormHelperText error={true} variant={'standard'}>
                    {isValidPass}
                </FormHelperText>
                <TextField
                    label={'Введите пароль ёще раз'}
                    name={'passTwo'}
                    type={'password'}
                    margin={'normal'}
                    onChange={onChangeHadler}/>

                <Button
                    variant={'contained'}
                    type={'submit'}
                    color={'primary'}>Регистрация</Button>
            </form>



                   <Snackbar
                        onClose={handleClose}
                       message={msg}
                       open={open}
                       anchorOrigin={{horizontal, vertical}}
                       autoHideDuration={6000}

                   />


        </Grid>
    )
}

export default RegistarionPage;
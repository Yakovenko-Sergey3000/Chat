import {Button, TextField} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
    form: {
        display: "flex",
        position: 'absolute',
        bottom: '5px',
        padding: '20px',
        alignItems: 'center'

    },
    input: {
        width: '700px',
        borderRadius: 0,
        background: '#fff',
        border: 0
    },
    btn: {
        width: '160px',
        height: '55px',
        padding: '10px',
        borderRadius: 0,
        color: '#fff',
        backgroundColor: '#2a9286'
    }
})
const Messages = () => {
    const classes = useStyle();
    return (
        <>
        <p>Hello</p>
        <form className={classes.form}>
           <TextField
               id="outlined-full-width"
               variant='outlined'
               fullWidth
              placeholder="Введите сообщение"
               className={classes.input}
           />
            <Button
                variant="text"
                className={classes.btn}
            >Отправить</Button>
        </form>
        </>
            )
}

export default Messages;
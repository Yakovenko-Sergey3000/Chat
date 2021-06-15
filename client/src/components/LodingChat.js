import {Skeleton} from '@material-ui/lab'
import {Box, Grid} from "@material-ui/core";


const LodingChat = () => {
    return(
         <>
             <Grid container justify={'center'}>
                 <Box m={1}><Skeleton variant="rect" width={400} height={600} /></Box>
                 <Box mt={1}><Skeleton variant="rect" width={800} height={600} /></Box>
             </Grid>

         </>
    )
}

export default LodingChat;
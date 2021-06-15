import {Box, Grid} from "@material-ui/core";
import {Skeleton} from "@material-ui/lab";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    info: {
        marginLeft: '10px'
    }
})

const LodingUsers= () => {
    const classes = useStyles()
    return(
        <>
            <Grid container direction={'column'}>
                <Box component={'div'} display={'flex'} alignItems={'center'}>
                    <Skeleton variant="circle" width={60} height={60}  />
                    <Skeleton variant="text" width={200} height={80} className={classes.info} />
                </Box>
                <Box component={'div'} display={'flex'} alignItems={'center'}>
                    <Skeleton variant="circle" width={60} height={60}  />
                    <Skeleton variant="text" width={200} height={80} className={classes.info} />
                </Box>
                <Box component={'div'} display={'flex'} alignItems={'center'}>
                    <Skeleton variant="circle" width={60} height={60}  />
                    <Skeleton variant="text" width={200} height={80} className={classes.info} />
                </Box>
                <Box component={'div'} display={'flex'} alignItems={'center'}>
                    <Skeleton variant="circle" width={60} height={60}  />
                    <Skeleton variant="text" width={200} height={80} className={classes.info} />
                </Box>
                <Box component={'div'} display={'flex'} alignItems={'center'}>
                    <Skeleton variant="circle" width={60} height={60}  />
                    <Skeleton variant="text" width={200} height={80} className={classes.info} />
                </Box>
                <Box component={'div'} display={'flex'} alignItems={'center'}>
                    <Skeleton variant="circle" width={60} height={60}  />
                    <Skeleton variant="text" width={200} height={80} className={classes.info} />
                </Box>
                <Box component={'div'} display={'flex'} alignItems={'center'}>
                    <Skeleton variant="circle" width={60} height={60}  />
                    <Skeleton variant="text" width={200} height={80} className={classes.info} />
                </Box>
            </Grid>

        </>
    )
}

export default LodingUsers;
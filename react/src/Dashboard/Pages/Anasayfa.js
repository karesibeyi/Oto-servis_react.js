import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import AlarmIcon from '@material-ui/icons/Alarm';
import IconButton from '@material-ui/core/IconButton';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';

//pages
import KasaKarti from '../Pages/KasaKarti';
import ServistekiArac from '../Pages/ServistekiArac';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        fontWeight: 'bold',
    },
    textFieldTheme: {
        margin: theme.spacing(1),
        width: '30ch',
        height: '7ch',
    },

    Button: {
        margin: theme.spacing(1),
    },
    Card: {
        maxWidth: "100%"

    },
    grid: {
        display: 'flex',
        flexWrap: 'wrap',
       
    },
    gridField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '25ch',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },

}));


export default function Anasayfa(props) {
    props.setTitle('Anasayfa');
    
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    //Burası
      

    return (
        <div>

            
            <Grid container justify="center" style={{marginTop:"2%"}}>
                <Grid item xs={3} style={{marginRight:"1%"}}  >
                    <Card className={classes.root}>
                        <CardActionArea>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2" align='center' style={{ marginTop:'2%' }}>
                                Kasa Bakiyesi: 10867₺
                              </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary" fullWidth onClick={()=> props.setPage('Kasa') }>
                               <b>Detay</b>
                        </Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={3}   align='left'>
                    <Card className={classes.root}>
                        <CardActionArea>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2" align='center' style={{ marginTop:'2%', }}>
                                Servisteki Araç Sayısı: 5
                              </Typography>
                            </CardContent>
                        </CardActionArea> 
                        <CardActions>
                            <Button size="small" color="primary" fullWidth  onClick={()=> props.setPage('Servisteki Arac Listesi')} >
                               <b>Detay</b>
                        </Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={5} justify="flex-end" className={classes.grid} >
                    <Paper align='center' style={{ padding: 5,  marginBottom: "1%", maxWidth: 400, }}>
                        <img src={"https://www.catsbilisim.net/wp-content/uploads/2015/10/png-1.png"} alt="Logo" style={{ maxWidth: "60%", }} />
                        <Card className={classes.Card} variant="outlined">
                            <CardContent>

                                <Typography variant="h7" component="h2">
                                    <b>Müşteri Adi</b> <br />
                                    <b>Cats Yazılım Geliştirme Teknolojileri</b>
                                </Typography>
                                <Typography className={classes.pos} style={{ color: 'green' }}>
                                    <b>Kalan Gün Sayısı : 365</b>
                                </Typography>
                                <Typography variant="body2" component="p">
                                    Bizi Tercih Ettiginiz İçin Teşekkürler :)
                        </Typography>
                            </CardContent>
                        </Card>
                    </Paper>
                </Grid>
                
            </Grid>
           
        </div>
    )
}

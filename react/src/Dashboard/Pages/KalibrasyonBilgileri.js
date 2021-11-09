import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    TextFieldTheme: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));


export default function FullWidthGrid(props) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        age: "",
        name: ""
    });
    
    const [{ currency,currency2 }, setCurrency] = React.useState('');
    const handleChange2 = (event) => {
        setCurrency(event.target.value);
    };

    const handleChange = (event) => {
        const name = event.target.name;
        setState({
            ...state,
            [name]: event.target.value
        });
    };

    return (
        <div className={classes.root}>
            <Grid container spacing={12} style={{ marginTop: '2%' }}>
                <Grid item sm={3}></Grid>
                <Grid item sm={5}>
                    <Paper className={classes.paper}>
                        <TextField
                            id="BelgeTuru"
                            select
                            label="Belge Türü"
                            value={currency}
                            style={{ width: '223px', marginTop: '3%' ,marginLeft: '2%'}}
                            onChange={handleChange2}
                            SelectProps={{
                                native: true,
                            }}
                            variant="outlined"

                        >
                            {props.kalibrasyonbelgetur.map((option) => (
                                <option key={option.id} value={option.id}>
                                    {option.Ad}
                                </option>
                            ))}
                        </TextField>
                        <TextField

                            id="SertifikaNo"
                            label="Sertifika No"
                            variant="outlined"
                            color="secondary"
                            style={{ marginLeft: '2%', marginTop: '3%',marginLeft: '2%' }}
                            
                        />

                        <TextField
                            id="TakografNo"
                            label="TakografNo"
                           
                            style={{ marginTop: '3%',marginLeft: '2%' }}
                            variant="outlined"
                        />
                        <TextField
                            id="SensorNo"
                            label="Sensör No"
                           
                            style={{ marginLeft: '2%', marginTop: '3%' }}
                            variant="outlined"
                        />
                        <TextField
                            id="TestOncesiKM"
                            label="Test Öncesi KM"
                            variant="outlined"
                            style={{ marginTop: '3%',marginLeft: '2%' }}
                            color="secondary"

                            type="number"

                        />
                        <TextField
                            id="TestSonrasiKM"
                            label="Test Sonrası KM"
                            variant="outlined"

                            style={{ marginTop: '3%', marginLeft: '2%' }}
                            color="secondary"
                            type="number"

                        />
                        <TextField
                            id="Takograf"
                            select
                            label="Takograf"
                            value={currency2}
                            style={{ width: '223px', marginTop: '3%',marginLeft: '2%' }}
                            helperText="Cihazda Yapılan Değişiklikler"
                            onChange={handleChange2}
                            SelectProps={{
                                native: true,
                            }}
                            variant="outlined"
                        >
                            {props.KalibrasyonTakograf.map((option) => (
                                <option key={option.id} value={option.id}>
                                    {option.Ad}
                                </option>
                            ))}
                        </TextField>
                        <TextField
                            id="UretimTarih"
                            label="Üretim Tarihi"
                            variant="outlined"
                            type="datetime-local"
                            style={{ marginTop: '3%', width: '223px', marginLeft: '2%' }}
                            defaultValue="2017-05-24T10:30"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Paper>
                    <Paper className={classes.paper} style={{marginTop:'2%'}}>
             <Button style={{width:'100%'}}>Kayıt</Button>
             </Paper>
                </Grid>
            </Grid>
        </div>
    );
}
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
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

    const [{ currency, currency2, currency3 }, setCurrency] = React.useState('');
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
                <Grid item sm={4} >
                    <Paper className={classes.paper}>
                        <Typography className={classes.heading} color="primary" ><b>REGÜLATÖR</b></Typography>
                        <TextField
                            id="Cinsi"
                            select
                            label="Cinsi"
                            value={currency}
                            style={{ width: '223px', marginTop: '3%' }}
                            onChange={handleChange2}
                            SelectProps={{
                                native: true,
                            }}
                            variant="outlined"
                        >
                            {props.lpgcins.map((option) => (
                                <option key={option.id} value={option.id}>
                                    {option.Ad}
                                </option>
                            ))}
                        </TextField>

                        <TextField
                            id="Markasi"
                            select
                            label="Markası"
                            value={currency2}
                            style={{ width: '223px', marginTop: '3%' }}
                            onChange={handleChange2}
                            SelectProps={{
                                native: true,
                            }}
                            variant="outlined"

                        >
                            {props.lpgmarka.map((option) => (
                                <option key={option.id} value={option.id}>
                                    {option.Ad}
                                </option>
                            ))}
                        </TextField>
                        <TextField

                            id="TipOnayNo"
                            label="Tip Onay Numarası"
                            variant="outlined"
                            color="secondary"
                            style={{ marginTop: '3%' }}
                            defaultValue="0"
                        />
                        <TextField
                            id="Tipi"
                            select
                            label="Tipi"
                            value={currency3}
                            style={{ width: '223px', marginTop: '3%' }}
                            onChange={handleChange2}
                            SelectProps={{
                                native: true,
                            }}
                            variant="outlined"

                        >
                            {props.lpgtip.map((option) => (
                                <option key={option.id} value={option.id}>
                                    {option.Ad}
                                </option>
                            ))}
                        </TextField>
                        <TextField
                            id="SeriNo"
                            label="SeriNo"
                            defaultValue="0"
                            style={{ marginTop: '3%' }}
                            variant="outlined"
                        />
                        <TextField
                            id="İmalatYili"
                            label="İmalat Yılı"
                            variant="outlined"
                            type="datetime-local"
                            style={{ marginTop: '3%', width: '223px' }}
                            defaultValue="2021-05-24T10:30"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Paper>
                </Grid>
                <Grid item sm={4}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.heading} color="primary" ><b>TANK</b></Typography>
                        <TextField
                            id="Cinsi"
                            select
                            label="Cinsi"
                            value={currency}
                            style={{ width: '223px', marginTop: '3%' }}
                            onChange={handleChange2}
                            SelectProps={{
                                native: true,
                            }}
                            variant="outlined"

                        >
                            {props.lpgcins.map((option) => (
                                <option key={option.id} value={option.id}>
                                    {option.Ad}
                                </option>
                            ))}
                        </TextField>

                        <TextField
                            id="Markasi"
                            select
                            label="Markası"
                            value={currency2}
                            style={{ width: '223px', marginTop: '3%' }}
                            onChange={handleChange2}
                            SelectProps={{
                                native: true,
                            }}
                            variant="outlined"

                        >
                            {props.lpgmarka.map((option) => (
                                <option key={option.id} value={option.id}>
                                    {option.Ad}
                                </option>
                            ))}
                        </TextField>
                        <TextField

                            id="TipOnayNo"
                            label="Tip Onay Numarası"
                            variant="outlined"
                            color="secondary"
                            style={{ marginTop: '3%' }}
                            defaultValue="0"
                        />
                        <TextField
                            id="Tipi"
                            select
                            label="Tipi"
                            value={currency3}
                            style={{ width: '223px', marginTop: '3%' }}
                            onChange={handleChange2}
                            SelectProps={{
                                native: true,
                            }}
                            variant="outlined"
                        >
                            {props.lpgtip.map((option) => (
                                <option key={option.id} value={option.id}>
                                    {option.Ad}
                                </option>
                            ))}
                        </TextField>
                        <TextField
                            id="Litre"
                            label="Litre"
                            type="number"
                            variant="outlined"
                            style={{ marginTop: '3%' }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            className={classes.textFieldTheme}
                        />
                        <TextField
                            id="Cap"
                            label="Çap"
                            type="number"
                            variant="outlined"
                            style={{ marginTop: '3%' }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            className={classes.textFieldTheme}
                        />
                        <TextField
                            id="Agirlik"
                            label="Ağırlık"
                            type="number"
                            variant="outlined"
                            style={{ marginTop: '3%' }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            className={classes.textFieldTheme}
                        />
                        <TextField
                            id="SeriNo"
                            label="SeriNo"
                            defaultValue="0"
                            style={{ marginTop: '3%' }}
                            variant="outlined"
                        />
                        <TextField
                            id="İmalatYili"
                            label="İmalat Yılı"
                            variant="outlined"
                            type="datetime-local"
                            style={{ marginTop: '3%', width: '223px' }}
                            defaultValue="2021-05-24T10:30"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="SonKulTarih"
                            label="Son Kul. Tarihi"
                            variant="outlined"
                            type="datetime-local"
                            style={{ marginTop: '3%', width: '223px' }}
                            defaultValue="2021-05-24T10:30"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Paper>
                </Grid>
                <Grid item sm={4}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.heading} color="primary" ><b>DİĞER</b></Typography>
                        <TextField
                            id="BelgeNo"
                            label="BelgeNo"
                            defaultValue="0"
                            style={{ marginTop: '3%' }}
                            helperText="Hizmet Yeterlilik Belge Numarası"
                            variant="outlined"
                        />
                        <TextField
                            id="GecerlilikTarih"
                            label="Geçerlilik Tarihi"
                            variant="outlined"
                            type="datetime-local"
                            style={{ marginTop: '4%', width: '223px' }}
                            defaultValue="2021-05-24T10:30"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Paper>
                    <Paper className={classes.paper} style={{ marginTop: '2%' }}>
                        <Button style={{ width: '100%' }}>Kayıt</Button>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}
import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

export default function WrongModal(props) {

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
            width: '100%',
            backgroundColor: theme.palette.background.paper,
        },
    }));

    return (
        <Dialog
            maxWidth={true}
            open={props.wrongModalOpen}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle align="center" id="responsive-dialog-title">{props.title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {props.content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.setWrongModalOpen(false)}>İptal</Button>
                <Button onClick={() => props.onClick()}>EVET</Button>
            </DialogActions>
        </Dialog>

    )
}

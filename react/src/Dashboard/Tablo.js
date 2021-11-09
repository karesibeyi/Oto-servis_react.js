import React, { Component, useState,useRef  } from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import DownloadIcon from '@material-ui/icons/GetApp'


//#region Tablo Stilleri
const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: '#fff',
        fontWeight: 'bold',
    },
    body: {
        fontSize: 14,
    },

}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);


const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 700,
    },
    absolute: {
        margin: theme.spacing(0),
    },
    fab: {
        margin: theme.spacing(2),
    },
}));

//#endregion

export default function Tablo(props) {
    const classes = useStyles();

    const [addRow, setAddRow] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    var tempData = [];
    const createArr = (index, value) => {
        tempData[index] = value;
    }

    const newRowSave = () => {
        tempData["selectedOption"] = selectedOption;
        if (props.callback(tempData)) {
            setAddRow(false);
            tempData = [];
        }
    }

    const handleCreatePDFDocument = () => {
        
    }

    return (
        <>
            <Autocomplete
                  hidden={props.hidden}
                id={props.AutoSelectID}
                options={props.optionList}
                getOptionLabel={(option) => option.Plaka}
                style={{ width: 300, marginBottom: 10 }}
                onChange={(event, option) => {
                    try {
                        setSelectedOption(option["ID"])
                    } catch (err) {
                        setSelectedOption(null)
                    }

                }}
                renderInput={(params) => <TextField  {...params} label="Plaka Seç" variant="outlined" />}
            />

            <TableContainer component={Paper}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            {
                                props.tableHeader.map((header) => {
                                    return (
                                        <StyledTableCell align="center">{header}</StyledTableCell>
                                    )
                                })

                            }
                            <StyledTableCell align="center">Eylem</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{/*> */}
                        {props.tableRows.map((data) => (
                            <StyledTableRow>
                                {
                                    data.map((cell) => {
                                        return (
                                            <StyledTableCell align="center">
                                                {cell}
                                            </StyledTableCell>
                                        )
                                    })

                                }
                                <StyledTableCell align="center" style={{ width: '18.8%' }}>
                                    <Paper>
                                    <Tooltip title="Görüntüle" style={{ padding: 10 }}>
                                            <IconButton>
                                                <VisibilityIcon style={{ width: '20px', height: '20px', margin: 5, cursor: 'pointer' }} onClick={() => {
                                                   var faturaId = data[0];
                                                   //Buradaki ID Değerini kullanarak Fatura üzerinde işlem yapabilirsin
                                                   //Veritabanından tablo üzerinde işlem yapılan faturanın ID değerini göndererek
                                                   //Create Read Update Delete (CRUD) işlemleri yapabilirsin
                                                }} />
                                            </IconButton>
                                        </Tooltip>

                                        <Tooltip title="İndir" style={{ padding: 10 }}>
                                            <IconButton>
                                                <DownloadIcon style={{ width: '20px', height: '20px', margin: 5, cursor: 'pointer' }} onClick={() => {
                                                   var faturaId = data[0];
                                                    handleCreatePDFDocument()
                                                }} />
                                            </IconButton>
                                        </Tooltip>
                                       
                                        <Tooltip title="Düzenle">
                                            <IconButton>
                                                <EditIcon style={{ width: '20px', height: '20px', margin: 5, cursor: 'pointer' }}onClick={() => {
                                                    var faturaId = data[0];
                                                }}/>
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Sil" style={{ padding: 10 }}>
                                            <IconButton>
                                                <DeleteIcon style={{ width: '20px', height: '20px', margin: 5, cursor: 'pointer' }} onClick={() => {
                                                    var faturaId = data[0];
                                                }}/>
                                            </IconButton>
                                        </Tooltip>
                                    </Paper>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}

                        {addRow ? props.tableHeader.map((header, index) => {
                            return (
                                <StyledTableCell align="left">
                                    <TextField onChange={(e) => createArr(index, e.target.value)} />
                                </StyledTableCell>
                            )
                        }) : null}

                    </TableBody>
                </Table>
            </TableContainer>
            {
                props.addButton ? (<Button style={{ marginTop: 10 }} onClick={addRow ? () => newRowSave() : () => setAddRow(true)}>{addRow ? "Kaydet" : "Ekle"}</Button>) : null

            }
        </>
    );
}
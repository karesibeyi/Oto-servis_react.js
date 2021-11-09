import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { API_URL } from '../constants';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import {  GridToolbarContainer} from '@material-ui/data-grid';
import { DataGrid } from '@material-ui/data-grid';
import RandevuOlusturModal from '../Modals/RandevuOlusturModal';
import WrongModal from '../Modals/WrongModal';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));
  

  const columns = [
    { field: 'Tarih_Saat', headerName: "Randevu Tarihi", width: 250 },
    { field: 'İsim', headerName: "İsim", width: 300 },
    { field: 'GSM', headerName: "Gsm", width: 150 },
  ];

export default function RandevuTalebi(props) {
props.setTitle('Randevu Talebi');
const classes = useStyles();

//
const [editButtonDisabled, setEditButtonDisabled ] = useState(true);
const [deleteButtonDisabled, setDeleteButtonDisabled ] = useState(true);
const [selectedRowIDs, setSelectedRowIDs ] = useState([]);
const [randevuData, setRandevuData] = useState(null)

const [open, setOpen] = React.useState(false);
const [wrongModalOpen, setWrongModalOpen] = React.useState(false);
const [randevuRow, setRandevuRow] = useState([]);


const handleRowEdit = () => {
  randevuRow.map((data, index) => {
      if(data.id == selectedRowIDs[0]) {
        setRandevuData({id: data.id, Tarih_Saat: data.Tarih_Saat, gsm: data.GSM, İsim: data.İsim})
      }
  })
  setOpen(true)
}

const handleRowDelete = () => {
  if(!wrongModalOpen) {
    setWrongModalOpen(true)
  }else{
    axios.post(API_URL + '/arac/randevuSil', {ids: selectedRowIDs}).then((resp) => {
      if(resp.data.status == 'success') {
        setWrongModalOpen(false);
        GetAllRandevu();
      }
      else{
        console.log('Axios Randevu Post Error!');
      }
    }).catch((error) => {
      console.log('Axios Error: ', error)
    })
  }
}
////

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <Tooltip title="Düzenle">
          <IconButton disabled={editButtonDisabled}>
            <EditIcon style={{ width: '20px', height: '20px', margin: 5, cursor: 'pointer' }}  onClick={() => handleRowEdit()}  />
          </IconButton>
        </Tooltip>
        <Tooltip title="Sil" style={{ padding: 10 }}>
          <IconButton disabled={deleteButtonDisabled}>
            <DeleteIcon style={{ width: '20px', height: '20px', margin: 5, cursor: 'pointer' }} onClick={() => handleRowDelete()}  />
          </IconButton>
        </Tooltip>
    </GridToolbarContainer>
  );
}

useEffect(() => {
  GetAllRandevu()
}, [])

const GetAllRandevu = () => {
  axios.get(API_URL + '/arac/randevu').then((resp) => {
    let tempArrayRow = [];

    resp.data.data.map((rows, index) => {
      tempArrayRow[index] = { id: rows.ID, Tarih_Saat: rows.Tarih_Saat, İsim: rows.İsim, GSM: rows.GSM, Adres: rows.Adres };
    })

    setRandevuRow(tempArrayRow);

  }).catch((err) => {
    console.log("Axios GET Error --> ", err)
  })
}

    return (
        <div className={classes.root}>
 <Grid container  justify="center">
       <Grid item xs={12} sm={11} > </Grid>
          <Grid item  >
            <RandevuOlusturModal open={open} setOpen={setOpen} randevuData={randevuData} refreshData={() => GetAllRandevu()} />
            <WrongModal 
              wrongModalOpen={wrongModalOpen}   
              setWrongModalOpen={setWrongModalOpen} 
              title={'Randevuyu Sil'} 
              content={'Randevuyu silmek istediğinize emin misiniz?'} 
              onClick={() => handleRowDelete()} 
          />
            <Tooltip  title=" Randevu Oluştur " placement="left" >
              <Fab color="primary" className={classes.absolute} onClick={() => {setRandevuData(null); setOpen(true)}}>
                <AddIcon />
              </Fab>
            </Tooltip>
          </Grid>
        </Grid>

        <Grid item xs="12" className={classes.grid}>
        <div style={{ height: 410, width: '100%', marginTop: '1%' }}>
          <DataGrid rows={randevuRow} columns={columns} checkboxSelection
            rowHeight={30}
            localeText={{
              columnMenuSortAsc: 'Alfabetik Sırala',
              columnMenuSortDesc: 'Tersten Sırala',
              columnMenuFilter: 'Filtrele',
              columnMenuUnsort: 'Filtrelemeyi Temizle',
              columnMenuHideColumn: 'Sütunu Gizle',
              columnMenuShowColumns: 'Tümünü Göster',
              filterPanelColumns: 'Başlıklar',
              filterPanelOperators: 'İşlemler',
              filterPanelInputLabel: 'Sözcük Arama',
              filterPanelInputPlaceholder: 'Aranacak Sözcük...',
              filterOperatorEquals: 'Eşleştir',
              filterOperatorContains: 'İçerikte Ara',
              filterOperatorStartsWith: 'Baştan Ara',
              filterOperatorEndsWith: 'Sondan Ara',
            }}
            components={{
              Toolbar: CustomToolbar,
            }} 

            onSelectionModelChange={(newSelection) => {
              if(newSelection.selectionModel.length != 0) {
                setDeleteButtonDisabled(false);
                if(newSelection.selectionModel.length > 1 ) {
                  setEditButtonDisabled(true)
                }
                else{
                  setEditButtonDisabled(false)
                }
              }
              else{
                setDeleteButtonDisabled(true);
                setEditButtonDisabled(true)
              }
              setSelectedRowIDs(newSelection.selectionModel)
            }}

            />
        </div>
      </Grid>
      </div>
    )
}

import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import {
    GridToolbarContainer,
    GridToolbarExport,
  } from '@material-ui/data-grid';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,

    },
    grid: {
        marginTop: '1%',
    },
}));

 const columns = [
    { field: 'tarih', headerName: 'Tarih', width: 150 },
    { field: 'kod', headerName: 'Kod', width: 130},
    { field: 'adi', headerName: 'Adi', width: 130 },
    { field: 'cinsi', headerName: 'Cinsi', width: 130 },
    { field: 'aciklama', headerName: 'Acıklama', width: 130 },
    { field: 'giren', headerName: 'Giren', width: 250 },
    { field: 'cıkan', headerName: 'Çıkan', width: 130,},
    { field: 'bakiye', headerName: 'Bakiye', width: 130 },
    
  ];

  const rows = [
    { id: 1, tarih: '02.05.2021', kod: 'Cam',adi:'54',cinsi:'8',aciklama:'54',giren:'işlem uygulandı karşimmm',cıkan:'02.05.2021',bakiye:'asdsadsa'},
    { id: 2, tarih: '02.05.2021', kod: 'Cam',adi:'54',cinsi:'8',aciklama:'54',giren:'işlem uygulandı karşimmm',cıkan:'02.05.2021',bakiye:'asdsadsa'},
    { id: 3, tarih: '02.05.2021', kod: 'Cam',adi:'54',cinsi:'8',aciklama:'54',giren:'işlem uygulandı karşimmm',cıkan:'02.05.2021',bakiye:'asdsadsa'},
    { id: 4, tarih: '02.05.2021', kod: 'Cam',adi:'54',cinsi:'8',aciklama:'54',giren:'işlem uygulandı karşimmm',cıkan:'02.05.2021',bakiye:'asdsadsa'},
    { id: 5, tarih: '02.05.2021', kod: 'Cam',adi:'54',cinsi:'8',aciklama:'54',giren:'işlem uygulandı karşimmm',cıkan:'02.05.2021',bakiye:'asdsadsa'},
    { id: 6, tarih: '02.05.2021', kod: 'Cam',adi:'54',cinsi:'8',aciklama:'54',giren:'işlem uygulandı karşimmm',cıkan:'02.05.2021',bakiye:'asdsadsa'},
    { id: 7, tarih: '02.05.2021', kod: 'Cam',adi:'54',cinsi:'8',aciklama:'54',giren:'işlem uygulandı karşimmm',cıkan:'02.05.2021',bakiye:'asdsadsa'},
    { id: 8, tarih: '02.05.2021', kod: 'Cam',adi:'54',cinsi:'8',aciklama:'54',giren:'işlem uygulandı karşimmm',cıkan:'02.05.2021',bakiye:'asdsadsa'},
    { id: 9, tarih: '02.05.2021', kod: 'Cam',adi:'54',cinsi:'8',aciklama:'54',giren:'işlem uygulandı karşimmm',cıkan:'02.05.2021',bakiye:'asdsadsa'},
    { id: 10, tarih: '02.05.2021', kod: 'Cam',adi:'54',cinsi:'8',aciklama:'54',giren:'işlem uygulandı karşimmm',cıkan:'02.05.2021',bakiye:'asdsadsa'},
   
    
  ];

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }
export default function CustomizedTables(props) {
    const classes = useStyles();
    props.setTitle('Kasa');
    return (
        <div>
                       <Grid item xs="12" className={classes.grid}>
            <div style={{ height: 410 , width: '100%' , marginTop:'1%'}}>
        <DataGrid rows={rows} columns={columns} checkboxSelection 
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
        }} />
      </div>
            </Grid>
        </div>

    );
}
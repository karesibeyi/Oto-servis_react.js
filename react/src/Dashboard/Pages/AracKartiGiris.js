import React, { Component } from 'react'
import Tablo from '../Tablo';

const TableHeader = ["Servis Tipi", "Motor No", "Şasi No", "CariTür", "CariAdi",
 "Plaka", "Marka","Model","Renk","Yıl","AracKM","Arac Tipi","Tr. Cikis Tarihi" , ]
const TableRows = [
    [
        "Data1", "Data2", "Data3", "Data4", "Data5", "Data6", "Data7", "Data8", "Data9", "Data9", "Data10", "Data11","Data 12"
    ]
]

export default function CustomizedTables() {
    
    return (
        <div>
             <Tablo hidden={true} addButton={true} tableHeader={TableHeader} tableRows={TableRows}/>

             
        </div>

    );
}
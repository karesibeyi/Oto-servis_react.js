import React, { Component } from 'react'
import Tablo from '../Tablo';



const TableHeader = ["Teslim Tarihi","Teslim Eden Ad","Teslim Eden TC",
"Teslim Eden Gsm","Teslim Alan Personel","Çıkış Tarihi","Teslim Alan Ad","Teslim Alan TC","Teslim Alan Tel","Teslim Eden Personel"]
const TableRows = [
    [
        "Data1", "Data2", "Data3", "Data4","Personel" ,"date","data","data","data","Personel"
    ],
]

export default class AracGirisCikis extends Component {
    render() {
        return (
            <div>
                <Tablo hidden={true} addButton={false} tableHeader={TableHeader} tableRows={TableRows} />

                
            </div>
        )
    }
}

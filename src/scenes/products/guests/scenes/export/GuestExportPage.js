import React, { Component } from 'react';
import { ExportPage } from "../../../common/ExportPage";


export class GuestExportPage extends Component{

    render(){
        return(

            <div>
                <ExportPage isSignedIn={false}/>

               
            </div>
        );
    }
}

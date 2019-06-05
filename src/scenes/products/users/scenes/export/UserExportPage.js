import React, { Component } from 'react';
import { ExportPage } from "../../../common/ExportPage";


export class UserExportPage extends Component{

    render(){
        return(

            <div>
                <ExportPage isSignedIn={true}/>

               
            </div>
        );
    }
}

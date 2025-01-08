
import Box from '@mui/material/Box';
import { useState, useEffect, useContext } from "react";
import { TableView } from '../views/TableView';

export default function TablesPage() { 

    console.log("TablesPage start");

    let tables = [];

    try
    {
        const Controllers = require("../controllers");

        const tables = Controllers.tableController.getTables();
    }
    catch(err){
        console.log(err.message);
    }
    


    
    const tableItems = tables?.map(table => (
        <TableView
        key={table.id} 
        Number={table.Number}/>
        )
    );

        
    
    return (
    <Box className="HomePage" >
        <h1>Tables</h1>
    
        <dvi className="center">
            <div >
                {tableItems}
            </div>
        </dvi>
    </Box>
    )
}


import Box from '@mui/material/Box';
import { useState, useEffect, useContext } from "react";
import { TableView } from '../views/TableView';
// const Controllers = require("../controllers");

export default function TablesPage() { 

    // const tables = Controllers.tableController.getTables();

    
    // const tableItems = tables?.map(table => (
    //     <TableView
    //     key={table.id} 
    //     Number={table.Number}/>
    //     )
    // );

        
    
    return (
    <Box className="HomePage" >
        <h1>Tables</h1>
    
        {/* <dvi className="center">
            <div >
                {tableItems}
            </div>
        </dvi> */}
    </Box>
    )
}

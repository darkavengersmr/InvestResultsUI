import React from "react";
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

const InvestmentListItem = ({ data, date }) => {    
    const { history, sum_in, sum_out } = data;

    const tableCellStyle = { p: "8px 1px 8px 1px", fontSize: "0.8rem" };

    return (
        <TableRow>            
            <TableCell sx={tableCellStyle}>
                {date}
            </TableCell>
            <TableCell sx={tableCellStyle} 
                       align="right">
                           {typeof history === 'number' ? history.toLocaleString() : "-"}
            </TableCell>
            <TableCell sx={tableCellStyle} 
                       align="right">
                           {typeof sum_in === 'number' ? sum_in.toLocaleString() : "-"}
            </TableCell>
            <TableCell sx={tableCellStyle} 
                       align="right">
                           {typeof sum_out === 'number' ? sum_out.toLocaleString() : "-"}
            </TableCell>                    
        </TableRow>  
    );
       
};

export default InvestmentListItem;
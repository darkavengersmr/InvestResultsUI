import React, { useMemo, memo } from "react";
import { useTheme } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

const InvestmentListItem = memo(({ data, date, portraitScreen, bg }) => {    
    const { history, 
            sum_in, 
            sum_out, 
            sum_plan,
            sum_delta_rub,
            sum_delta_proc,
            ratio_deposit_index } = data;
    
    let bgCell;
    const theme = useTheme();
    if (theme.palette.mode === 'dark') {
        bg === 'odd' ? bgCell = '#1E1E1E' : bgCell = '#303030';
    } else {
        bg === 'odd' ? bgCell = '#FFFFFF' : bgCell = '#EFEFEF';
    }
    
    const tableCellStyle = useMemo(() => ({ p: "8px 1px 8px 1px", 
                                            fontSize: "0.8rem", 
                                            background: bgCell
    }), [bgCell]);

    return (
        <TableRow>            
            <TableCell sx={tableCellStyle}>
                {date}
            </TableCell>
            <TableCell sx={tableCellStyle} 
                       align="right">
                           {typeof sum_in === 'number' ? sum_in.toLocaleString() : "-"}
            </TableCell>
            <TableCell sx={tableCellStyle} 
                       align="right">
                           {typeof sum_out === 'number' ? sum_out.toLocaleString() : "-"}
            </TableCell> 

            {!portraitScreen 
            ? <TableCell sx={tableCellStyle} 
                         align="right">
                         {typeof sum_plan === 'number' ? sum_plan.toLocaleString() : "-"}
              </TableCell>
            : false
            }

            <TableCell sx={tableCellStyle} 
                       align="right">
                           {typeof history === 'number' ? history.toLocaleString() : "-"}
            </TableCell>

            {!portraitScreen 
            ? <TableCell sx={tableCellStyle} 
                         align="right">
                         {typeof sum_delta_rub === 'number' ? sum_delta_rub.toLocaleString() : "-"}
              </TableCell>
            : false
            }

            {!portraitScreen 
            ? <TableCell sx={tableCellStyle} 
                         align="right">
                         {typeof sum_delta_proc === 'number' ? sum_delta_proc.toLocaleString()+"%" : "-"}
              </TableCell>
            : false
            }

            {!portraitScreen 
            ? <TableCell sx={tableCellStyle} 
                         align="right">
                         {typeof ratio_deposit_index === 'number' ? ratio_deposit_index.toLocaleString()+"%": "-"}
              </TableCell>
            : false
            }

        </TableRow>  
    );
       
})

export default InvestmentListItem;
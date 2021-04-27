import React from 'react'
import { Table, TableHead, TableRow, TableCell, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    table: {
        marginTop: theme.spacing(15)
    }
        
}))

export default function ViewandPredictTable(patientDetails, cells) {

    const classes = useStyles();
    const TableContainer = props => (
        <Table className={classes.table}>
            {props.children}
        </Table>
    )
    const TblHead = props => {
    return (<TableHead>
        <TableRow>
            {
                cells.map(cell => (
                    <TableCell key={cell.id}>
                        
                    {cell.label}
                            
                    </TableCell>))
            }
        </TableRow>
    </TableHead>)
    }

return {
    TableContainer,
    TblHead
}
    
    
}




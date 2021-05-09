import React, { useState }from 'react'
import { Table, TableHead, TableRow, TableCell, makeStyles, TablePagination, TableSortLabel } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    table: {
        marginTop: theme.spacing(10)
    },
    // head:{
    //      backgroundColor: theme.palette.common.grey,
    //     //color: theme.palette.common.white,
    //     fontSize: 18
    // },
    cell:{
        fontSize: 18
    }
        
}))

export default function ViewandPredictTable(patientDetails, cells, filterval) {

    
    const classes = useStyles();
    const pages = [5, 10, 25]
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(pages[page])
    const [order, setOrder] = useState()
    const [orderBy, setOrderBy] = useState()

    const TableContainer = props => (
        <Table className={classes.table}>
            {props.children}
        </Table>
    )
    const TblHead = props => {

        const sortHandler = cellId => {
            const isAsc = orderBy === cellId && order === "asc";
            setOrder(isAsc ? 'desc' : 'asc');
            setOrderBy(cellId)
        }
    return (<TableHead className={classes.head}>
        <TableRow>
            {
                cells.map(cell => (
                    <TableCell className={classes.cell} key={cell.id}
                     sortDirection={orderBy === cell.id ? order : false}>
                            {cell.disableSorting ? cell.label :
                                <TableSortLabel
                                    active={orderBy === cell.id}
                                    direction={orderBy === cell.id ? order : 'asc'}
                                    onClick={() => { sortHandler(cell.id) }}>  
                    {cell.label}
                    </TableSortLabel> 
    }       
                    </TableCell>))
            }
        </TableRow>
    </TableHead>)
    }
    
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0);
    }

    const TblPagination = () => (<TablePagination
        component="div"
        page={page}
        rowsPerPageOptions={pages}
        rowsPerPage={rowsPerPage}
        count={patientDetails.length}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
    />)
        console.log("inside table.js"+ patientDetails);
    function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    function getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    const tablePagingandSorting = () => {
        return stableSort(filterval.fn(patientDetails), getComparator(order, orderBy))
            .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
    }

return {
    TableContainer,
    TblHead,
    TblPagination,
    tablePagingandSorting
}
    
    
}




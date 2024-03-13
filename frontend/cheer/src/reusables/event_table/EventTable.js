import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TablePagination from '@mui/material/TablePagination';
import './EventTable.css'

function Row(props) {
  const [open, setOpen] = useState(false);
  const [rowData, setRowData] = useState({})
  const subdata = props.row["subdata"||"Subdata"]  //used in commented section


  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
        </TableCell>
        {
          Object.keys(props.row).map((d)=>{ 
              return(
                <TableCell >{props.row[d]}</TableCell> 
              )
          })         
        }
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={50}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>

            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}


export default function CollapsibleTable(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [pageData, setPageData]= useState([])
  const [maxRows, setMaxRows] = useState(0)



  useEffect(()=>{
      // getMaxRow()
      // getData()
      
  },[props.type, page, rowsPerPage  ])

  const handleChangePage = (event, newPage) => {
    //get next data
    setPage(newPage);
  };

  // const getMaxRow = () =>{
  //   fetch(props.url.toString()+'/length'+'?'+ new URLSearchParams({
  //     type: props.type,
  //     start_date : props.start_date,
  //     end_date: props.end_date
  //   }),{
  //     method:"GET"
  //   }).then(response=> {
  //     if(response.ok)
  //       return response.json()
  //     }).then(data=>setMaxRows(data[0].max))
  // }

  // const getData = () =>{
  //   fetch(props.url.toString()+'?'+ new URLSearchParams({
  //     length: rowsPerPage,
  //     offset: page,
  //     type: props.type,s
  //     start_date : props.start_date,
  //     end_date: props.end_date
  //   }), {
  //     method: 'GET'
  //   }).then(response=> {
  //     if(response.ok)
  //       return response.json()
  //     }).then(data=>setPageData(data))
  // }



  const handleChangeRowsPerPage = (event) => {
    //get new data
    setRowsPerPage(parseInt(event.target.value, 10));

  };
  return (
    <div className='table_container'>
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table" size="small">
        <TableHead>
          <TableRow>
            <TableCell />
            {Object.keys(pageData[0]?pageData[0]:pageData).map((h)=>{
                h = h.charAt(0).toUpperCase() + h.slice(1)    
                return(
                    <TableCell>{h}</TableCell>
                )
            })}
          </TableRow>
        </TableHead>
        <TableBody>
            {pageData.map((d)=>{
                return(
                    <Row row={d}/>
                )
            })}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={maxRows}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </div>
  );
}
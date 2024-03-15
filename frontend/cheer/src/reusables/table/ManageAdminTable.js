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
import './ManageAdminTable.css'

function Row(props) {
  const [open, setOpen] = useState(false);
  const [rowData, setRowData] = useState({})
  const subdata = props.row["subdata"||"Subdata"]  //used in commented section


  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
        {props.row["accepted" || "Accepted"] ==false||props.row["requested_change"||"Requested_Change"]==true ? 
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
          :<></>}
        </TableCell>
        {
          Object.keys(props.row).map((d)=>{
              if(d.toLowerCase()==='prompt'||d.toLowerCase()==='subdata'){
                return     
              }
              if(d=="accepted"){
                if(props.row[d]==1){
                  return(
                    <TableCell >Accepted</TableCell> 
                  )
                }else{
                  return(
                    <TableCell >Pending</TableCell> 
                  )
                }
              }
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
              {/* <Typography variant="h6" gutterBottom component="div">
                Prompt
              </Typography> */}
              <p>{props.row["prompt"] || props.row["Prompt"]}</p>
              {props.row["accepted" || "Accepted"] =='0'||props.row["requested_change"||"Requested_Change"]=="1" ? <div className='manageuser_button_container'>
                <button className='manageuser_ad_button'>Accept</button>
                <button className='manageuser_ad_button'>Decline</button>
              </div> : <div></div>}
              <Table size="small" aria-label="purchases">
                {/* <TableHead> DONT REMOVE THIS
                  <TableRow>
                    {
                      Object.keys(subdata).map((d)=>{
                        return(
                          <TableCell>{d}</TableCell>
                        )
                      })
                    }
                  </TableRow>
                </TableHead> */}
                {/* <TableBody>
                  {
                    Object.keys(subdata).map((d)=>{
                      return(
                        <TableCell>{subdata[d]}</TableCell>
                      )
                    })
                  } 
                   {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))} 
                {/* </TableBody> */}
              </Table>
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
      if(props.type){
        getMaxRow()
        getData()
      }else{
        getDataNoType()
      }
  },[props.type, page, rowsPerPage  ])

  const handleChangePage = (event, newPage) => {
    //get next data
    setPage(newPage);
  };

  const getMaxRow = () =>{
    fetch(props.url.toString()+'/length'+'?'+ new URLSearchParams({
      type: props.type
    }),{
      method:"GET"
    }).then(response=> {
      if(response.ok)
        return response.json()
      }).then(data=>setMaxRows(data[0].max))
  }

  const getData = () =>{
    fetch(props.url.toString()+'?'+ new URLSearchParams({
      length: rowsPerPage,
      offset: page,
      type: props.type
    }), {
      method: 'GET'
    }).then(response=> {
      if(response.ok)
        return response.json()
      }).then(data=>setPageData(data))
  }

  const getDataNoType = () =>{
    fetch(props.url , {
      method:'GET',
    }).then(response=>{
      if(response.ok){
        return response.json()
      }
    }).then(data=>setPageData(data))
  }


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
                if(h.toLowerCase()==='prompt'||h.toLowerCase()==='subdata'){
                  return
                }
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
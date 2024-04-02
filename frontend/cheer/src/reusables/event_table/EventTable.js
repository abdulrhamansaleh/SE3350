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
import { DatePicker  } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import './EventTable.css'

export default function CollapsibleTable(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [pageData, setPageData]= useState([])
  const [maxRows, setMaxRows] = useState(0)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [dropDownValue, setDropDownValue] = useState('all')
  let x=0;
  const dropDownChange = () =>{
    let d = document.getElementById('select_type')
    setDropDownValue(d.value)
  }

  useEffect(()=>{
      getMaxRow()
      getData()
      
  },[dropDownValue, page, rowsPerPage])

  const handleChangePage = (event, newPage) => {
    //get next data
    setPage(newPage);
  };

  const getMaxRow = () =>{
    if(dropDownValue =="custom" && (startDate.$y ===undefined || endDate.$y === undefined)){
      return;
    }
    fetch('/admin/get/events/length'+'?'+ new URLSearchParams({
      type: dropDownValue,
      start_date : `${startDate.$y}-${startDate.$M}-${startDate.$D}`,
      end_date: `${endDate.$y}-${endDate.$M}-${endDate.$D}`
    }),{
      method:"GET"
    }).then(response=> {
      if(response.ok)
        return response.json()
      }).then(data=>setMaxRows(data[0]? data[0].max: 0))
  }

  const getData = () =>{
    if(dropDownValue =="custom" &&(startDate.$y ===undefined || endDate.$y === undefined)){
      return;
    }

    fetch('/admin/get/events'+'?'+ new URLSearchParams({
      length: rowsPerPage,
      offset: page,
      type: dropDownValue,
      start_date : `${startDate.$y}-${startDate.$M}-${startDate.$D}`,
      end_date: `${endDate.$y}-${endDate.$M}-${endDate.$D}`,
      length: rowsPerPage,
      offset: page,
    }), {
      method: 'GET'
    }).then(response=> {
      if(response.ok)
        return response.json()
      }).then(data=>setPageData(data))
  }

  const handleChangeRowsPerPage = (event) => {
    //get new data
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const onButtonClick= () =>{
      getMaxRow()
      getData()
  }

  const selectStartDate = (e) =>{
    if(e.$M<10){
      e.$M = parseInt(e.$M)+1
      e.$M = '0'+e.$M
    }
    if(e.$D<10){
      e.$D = '0'+e.$D
    }
    setStartDate(e)
  }
  const selectEndDate = (e)=>{
    if(e.$M<10){
      e.$M = parseInt(e.$M)+1
      e.$M = '0'+e.$M
    }
    if(e.$D<10){
      e.$D = '0'+e.$D
    }
    setEndDate(e)
  }

  const onRowClicked = (e)=>{
    // e.preventDefault()
    // console.log(e.target.parentElement.id)
    props.callback(pageData[e.target.parentElement.id])
  }

  return (
    <div className='table_container'>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
           
           {dropDownValue==='custom' ? 
           <div className='datepicker_container'> 
             <DatePicker id='sd' label={'Enter Start Date'} views={['year', 'month', 'day']} value={startDate} onChange={(nvalue)=>{selectStartDate(nvalue)}}/>
             <DatePicker id='ed' label={'Enter End Date'} views={['year', 'month', 'day']} value={endDate} onChange={(nvalue)=>selectEndDate(nvalue)}/>
           </div>: 
           <div>
             <DatePicker disabled value={startDate}/>
             <DatePicker disabled value={endDate}/>
           </div> 
           }

           <select id='select_type' onChange={dropDownChange}>
             <option value='all'>All</option>
             <option value='future'>Future Events</option>
             <option value='past'>Past Events</option>
             <option value='custom'>Custom Time</option>
           </select>
         </LocalizationProvider>
      <button onClick={onButtonClick}>Enter</button>
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table" size="small" enableRowSelection>
        <TableHead>
          <TableRow>
            <TableCell />
            
            {Object.keys(pageData[0]?pageData[0]:{}).map((h)=>{
                if(h!=='transport_details' && h!=='description'){
                  h = h.charAt(0).toUpperCase() + h.slice(1)    
                  return(
                      <TableCell>{h}</TableCell>
                  )
                }
            })}
          </TableRow>
        </TableHead>
        <TableBody>
            {pageData.map((d)=>{
                return(
                    <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} id={x++} onClick={(e)=>onRowClicked(e)}>
                      <TableCell>
                      </TableCell>
                      {
                        Object.keys(d).map((f)=>{ 
                          if(f!=='transport_details' && f!=='description'){
                            if(f==='start_time'|| f==='end_time'){
                              try{
                                d[f]=d[f].replace('T04:',' | ').replace('Z','').replace('T'," | ").substring(0,18)
                              }catch{
                                d[f] = null
                              }
                            }
                            return(
                              <TableCell >{d[f]}</TableCell> 
                            )
                          }
                        })         
                      }
                    </TableRow>
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
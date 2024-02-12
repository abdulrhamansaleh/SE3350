import * as React from 'react';
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
import './ManageUsers.css'

function Row(props) {
  const row  = props;
  const [open, setOpen] = React.useState(false);
  const subdata = props.row["subdata"] || props.row["Subdata"]
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {
          Object.keys(props.row).map((d)=>{
              if(d.toLowerCase()==='prompt'||d.toLowerCase()==='subdata'){
                return     
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
              <Typography variant="h6" gutterBottom component="div">
                Prompt
              </Typography>
              <p>{props.row["prompt"] || props.row["Prompt"]}</p>
              {props.row["Verified" || "verified"] =='no'||props.row["requested_change"||"Requested_Change"]=="yes" ? <div className='manageuser_button_container'>
                <button className='manageuser_ad_button'>Accept</button>
                <button className='manageuser_ad_button'>Decline</button>
              </div> : <div></div>}
              <Table size="small" aria-label="purchases">
                {/* <TableHead>
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
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            {Object.keys(props.table_data[0]).map((h)=>{
                if(h.toLowerCase()==='prompt'||h.toLowerCase()==='subdata'){
                  return
                }
                return(
                    <TableCell>{h}</TableCell>
                )
            })}
          </TableRow>
        </TableHead>
        <TableBody>
            {props.table_data.map((d)=>{
              // console.log(d)
                return(
                    <Row row={d}/>
                )
            })}

          {/* {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))} */}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
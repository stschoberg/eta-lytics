import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import Amplify, { API } from 'aws-amplify';


const styles = {
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: 16,
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  }
}

const config = Amplify.configure({
  API: {
      endpoints: [
          {
              name: "test123",
              endpoint: "https://om7reelck3.execute-api.us-east-1.amazonaws.com/live/eta-lyticsGetDBLambda/"
          },
      ]
  }
});

/**
 * Class that renders the TableComponent of eta-lytics. On componentDidMount,
 * it calls the API to fill the rows of the table with data about the GroupMe.
 */
export default class TableComponent extends React.Component {
    constructor() {
        super();

        this.state = {
            size: 0,
            entries: this.getData(),
            headCells: [
                { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
                { id: 'messages', numeric: true, disablePadding: false, label: '# Messages' },
                { id: 'likesPerMessage', numeric: true, disablePadding: false, label: 'Likes Recived Per Message' },
                { id: 'likesGiven', numeric: true, disablePadding: false, label: 'Likes Given' },
                { id: 'percentageEta', numeric: true, disablePadding: false, label: 'Percentage of Eta Talk' }
            ]
        }

        this.componentDidMount = this.componentDidMount.bind(this);
        this.getData = this.getData.bind(this);
    }

    async componentDidMount() {
      // load data into entries here
      console.log("attempting mount")
      await API.get("test123", "entries")
          .then(res => res.body.entries)
          .then(data => this.setState({entries : data}))
    }
    
    /**
     *  Returns the data in row-ingestible format for the table 
     *  rendering.
     * 
     * @param {String} name 
     * @param {Int} messages 
     * @param {Float} likesPerMessage 
     * @param {Int} likesGiven 
     */
    static createData(name, messages, likesPerMessage) {
        var x= 0;
        return { name, messages, likesPerMessage, x};
      }

    getData() {
        const res = API.get("test123", "entries")
          .then(res => res.body.entries)
          .then(data => this.setState({entries : data}))
          .catch(err => console.log(err)); 
        return res;
    }

    /**
     * Creates the TableHeader element. Will eventually support sort functionality for all
     * columns in the table.
     */

    EnhancedTableHead() {
      return (
        <TableHead>
        <TableRow>
        {this.state.headCells.map(headCell => 
      <TableCell
        key={headCell.id}
        align={headCell.numeric ? 'right' : 'left'}
        padding={headCell.disablePadding ? 'none' : 'default'}
        sortDirection={false}
        >
          <TableSortLabel>
          </TableSortLabel>
          <b>{headCell.label}</b>
      </TableCell>)}
      </TableRow>
        </TableHead>
      )
     }

     TableBody() {
       if (Array.isArray(this.state.entries) && this.state.entries.length){
         return this.state.entries.map((row, index) => { return (
          <TableRow>
            <TableCell component="th" scope="row" padding="default">
            {index + 1}.  {row.name}
              </TableCell>
              <TableCell align="right">{row.messages}</TableCell>
              <TableCell align="right">{row.likes_per_message}</TableCell>
              <TableCell align="right">{row.likes_given}</TableCell>
              <TableCell align="right">{row.percentage_eta}</TableCell>


          </TableRow>
        )
        })
      }
      else{
        return (<TableRow><TableCell>Empty</TableCell></TableRow>)
      }
     }


    render(){
        return (
          <div className={styles.root}>
          <Paper>

            <TableContainer>
            <Table>
              {this.EnhancedTableHead()}
            <TableBody>
              {this.TableBody()}
            </TableBody>
            </Table>

            </TableContainer>         
        </Paper>
        </div>
          );
    }
}
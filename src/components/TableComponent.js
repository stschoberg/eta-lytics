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

/**
 * Class that renders the TableComponent of eta-lytics. On componentDidMount,
 * it calls the API to fill the rows of the table with data about the GroupMe.
 */
export default class TableComponent extends React.Component {
    constructor() {
        super();

        this.state = {
            size: 0,
            entries: [],
            headCells: [
                { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
                { id: 'messages', numeric: true, disablePadding: false, label: 'messages' },
                { id: 'likesPerMessage', numeric: true, disablePadding: false, label: 'likesPerMessage' },
                { id: 'likesGiven', numeric: true, disablePadding: false, label: 'likesGiven' }
            ]
        }
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
    createData(name, messages, likesPerMessage, likesGiven) {
        return { name, messages, likesPerMessage, likesGiven};
      }

    /**
     * Creates the TableHeader element. Will eventually support sort functionality for all
     * columns in the table.
     */

    EnhancedTableHead() {
      return (
        <TableHead>
          {this.state.headCells.map(headCell => 
            <TableCell>
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'default'}
              {/* sortDirection={orderBy === headCell.id ? order : false} */}
            </TableCell>)}
          

        </TableHead>
      )
     }


    render(){
        return (
          <div className={styles.root}>
          <Paper>

            <TableContainer>
            <Table>
              <TableHead>
              <TableRow>
              {this.state.headCells.map(headCell => 
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'default'}
              sortDirection={false}
              >
                {headCell.label}
            </TableCell>)}
            </TableRow>
              </TableHead>
            </Table>

            </TableContainer>         
        </Paper>
        </div>
          );
    }
}
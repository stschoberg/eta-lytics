import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
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
              endpoint: "https://dhdv449b05.execute-api.us-east-1.amazonaws.com/default/eta-lyticsGetDBLambda/"
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
            data: [],
            headCells: [
                { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
                { id: 'messages', numeric: true, disablePadding: false, label: '# Messages' },
                { id: 'likes_per_message', numeric: true, disablePadding: false, label: 'Likes Recived Per Message' },
                { id: 'likes_given', numeric: true, disablePadding: false, label: 'Likes Given' },
                { id: 'percentage_eta', numeric: true, disablePadding: false, label: 'Percentage of Eta Talk' }
            ],
            sortDirection: 'desc',
            sortBy: 'name'

        }

        this.componentDidMount = this.componentDidMount.bind(this);
        this.sortBy = this.sortBy.bind(this);
        this.compare = this.compare.bind(this);
    }

    sortBy(key){
      this.setState({
        sortDirection: (this.state.sortDirection === 'asc') ? 'desc' : 'asc',

        data: this.state.data.sort( (a, b) => (
          console.log(a),
          this.state.sortDirection != 'asc'
          ? this.compare(a[key], b[key], key) // a[key].toString().localeCompare(b[key].toString())
          : this.compare(b[key], a[key], key)//b[key].toString().localeCompare(a[key].toString())
        )),
        sortBy: key
      })
    }

    compare(a , b, key) {
      if(key === "name") {
        return a.localeCompare(b);
      }
      else {
        return (a - b);
      }
    }


    async componentDidMount() {
      // load data into entries here
      console.log("attempting mount")
      await API.get("test123", "entries")
          .then(res => res.body.entries)
          .then(data => this.setState({data : data}))

      this.sortBy('name');

      
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
        <TableSortLabel
          active={this.state.sortBy === headCell.id}
          direction={this.state.sortDirection}
          onClick={() => this.sortBy(headCell.id)}
        >
          <b>{headCell.label}</b>

          </TableSortLabel>
      </TableCell>)}
      </TableRow>
        </TableHead>
      )
     }

     TableBody() {
       if (Array.isArray(this.state.data) && this.state.data.length){
         return this.state.data.map((row, index) => { return (
          <TableRow>
            <TableCell component="th" scope="row" padding="default">
            {index + 1}.  {row.name}
              </TableCell>
              <TableCell align="right">{row.messages}</TableCell>
              <TableCell align="right">{parseInt(row.likes_per_message) === -1 ? "No messages": row.likes_per_message}</TableCell>
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
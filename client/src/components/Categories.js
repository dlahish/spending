import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import * as actions from '../actions';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import { Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn }
  from 'material-ui/Table';
import { blueGrey200, blueGrey300 } from 'material-ui/styles/colors';
import Dialog from 'material-ui/Dialog';

const styles = {
  paper : {
    margin: 50,
    textAlign: 'left',
    marginTop: 10,
    margin: 'auto',
    width: '40%',
    backgroundColor: 'white',
    padding: 20
  },

  label: {
    fontWeight: 'bold',
    fontSize: 30,
    marginTop: 15
  },

  headline: {
    fontSize: 24,
    paddingTop: 10,
    marginBottom: 8,
    fontWeight: 400,
  },

  table: {
    fixedHeader: true,
    fixedFooter: true,
    stripedRows: false,
    showRowHover: false,
    selectable: true,
    multiSelectable: false,
    enableSelectAll: false,
    deselectOnClickaway: true,
    showCheckboxes: true,
    height: '300px',
  }

  // dialogStyles: {
  //   // position: 'absolute',
  //   // left: '25%',
  //   // top: '50%',
  //   // transform: 'translate(-50%, -50%)'
  //   width: '40%'
  // }
};

class Categories extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
      categoryInput: '',
      disableDialogSubmit: true,
      selectedCategory: null
    }
  }

  componentWillMount() {
    if (!this.props.userEmail) {
      this.props.getUserEmail();
    }
    this.props.fetchCategories();
  }

  handleDialogOpen = () => {
    this.setState({ dialogOpen: true });
  }

  handleDialogClose = () => {
    this.setState({ dialogOpen: false, categoryInput: '' });
  }

  handleDeleteButton() {
    console.log(this.props.categories[this.state.selectedCategory].name);
    this.props.deleteCategory(this.props.categories[this.state.selectedCategory].name);
    this.props.fetchCategories();
  }

  handleAddButton() {
    this.handleDialogClose();
    this.props.addNewCategory(this.state.categoryInput);
    this.props.fetchCategories();
    this.setState({ categoryInput: '' });
  }

  handleDialogText = (event) => {
    if (event.target.value.length > 0) {
      this.setState({ categoryInput: event.target.value, disableDialogSubmit: false });
    } else {
      this.setState({ categoryInput: event.target.value, disableDialogSubmit: true });
    }

  };

  handleRowSelection = (event) => {
    console.log('handle row selection');
    const selectedCategory = event[0];
    this.setState({ selectedCategory: selectedCategory });
    this.props.toggleCategory(selectedCategory);
  }

  render() {
    console.log(this.props.categories);
    const dialogActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleDialogClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleAddButton.bind(this)}
        disabled={this.state.disableDialogSubmit}
      />,
    ];

    return (
      <div>
        <p style={styles.label}>Edit Caegories</p>
        <Paper style={styles.paper} zDephth={3} >
          <div style={{ paddingBottom: '20px' }}>
          <FlatButton
            label="Add"
            primary={true}
            onTouchTap={this.handleDialogOpen}
            //style={{ display: 'inline-block', w: '20%'}}
          />
          <Dialog
            title="Enter a new Category"
            actions={dialogActions}
            modal={false}
            open={this.state.dialogOpen}
            onRequestClose={this.handleDialogClose}
            style={{ width: '40%', marginLeft: '30%' }}
          >
            <TextField
              hintText="Category name"
              floatingLabelText="Category name"
              value={this.state.categoryInput}
              onChange={this.handleDialogText.bind(this)}
            />
          </Dialog>
          {/*<FlatButton label="Edit" />*/}
          <FlatButton
            label="Delete"
            secondary={true}
            onTouchTap={this.handleDeleteButton.bind(this)}
            //style={{ display: 'inline-block'}}
          />
          </div>
          <Divider style={{ height: '3px' }} />
          <div>
            <Table
              height={styles.table.height}
              fixedHeader={styles.table.fixedHeader}
              fixedFooter={styles.table.fixedFooter}
              selectable={styles.table.selectable}
              multiSelectable={styles.table.multiSelectable}
              onRowSelection={this.handleRowSelection.bind(this)}
            >
              <TableHeader
                displaySelectAll={styles.table.showCheckboxes}
                adjustForCheckbox={styles.table.showCheckboxes}
                enableSelectAll={styles.table.enableSelectAll}
                style={{ backgroundColor: blueGrey300 }}
              >
                <TableRow>
                  <TableHeaderColumn
                    style={{ fontWeight: 'bold', color: 'black', fontSize: '15px' }}
                  >Category Name
                  </TableHeaderColumn>
                </TableRow>
              </TableHeader>

              <TableBody
                displayRowCheckbox={styles.table.showCheckboxes}
                deselectOnClickaway={styles.table.deselectOnClickaway}
                showRowHover={styles.table.showRowHover}
                stripedRows={styles.table.stripedRows}
                style={{ backgroundColor: blueGrey200 }}
              >
                {this.props.categories.map((row, index) => (
                  <TableRow key={index} selected={row.selected}>
                    <TableRowColumn>{row.name}</TableRowColumn>
                  </TableRow>
                ))}
              </TableBody>

            </Table>
          </div>

        </Paper>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { categories: state.user.categories };
}

export default connect(mapStateToProps, actions)(Categories);

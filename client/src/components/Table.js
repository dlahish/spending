import React from 'react';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import { cyan800, grey50, red900 } from 'material-ui/styles/colors';

const styles = {
  propContainer: {
    width: 200,
    overflow: 'hidden',
    margin: '20px auto 0',
  },
  propToggleHeader: {
    margin: '20px auto 10px',
  },
  header: {
    color: 'white'
  }
};

export default class TableExampleComplex extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      fixedHeader: true,
      fixedFooter: false,
      stripedRows: false,
      showRowHover: false,
      selectable: false,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      showCheckboxes: false,
      height: '320px',
    };
  }

  handleToggle = (event, toggled) => {
    this.setState({
      [event.target.name]: toggled,
    });
  };

  handleChange = (event) => {
    this.setState({height: event.target.value});
  };

  render() {
    return (
      <div style={{ width: '80%', margin: 'auto', paddingTop: '20px' }}>
        <Table
          height={this.state.height}
          fixedHeader={this.state.fixedHeader}
          fixedFooter={this.state.fixedFooter}
          selectable={this.state.selectable}
          multiSelectable={this.state.multiSelectable}
        >
          <TableHeader
            displaySelectAll={this.state.showCheckboxes}
            adjustForCheckbox={this.state.showCheckboxes}
            enableSelectAll={this.state.enableSelectAll}
          >
            <TableRow>
              <TableHeaderColumn style={{ width: '6%', textAlign: 'left', fontSize: '18px', color: 'black', height: '10px' }} tooltip="Super Header">Your Data</TableHeaderColumn>
              {/*<TableHeaderColumn></TableHeaderColumn>*/}
              <TableHeaderColumn style={{ width: '13%' }}></TableHeaderColumn>
              <TableHeaderColumn style={{ width: '13%' }}></TableHeaderColumn>
              <TableHeaderColumn style={{ width: '13%' }}></TableHeaderColumn>
              <TableHeaderColumn style={{ width: '14%' }}></TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn style={{ height: '10px', color: 'black', fontSize: '14px', textAlign: 'left', backgroundColor: cyan800, fontWeight: '600' }} tooltip="The ID">#</TableHeaderColumn>
              {/*<TableHeaderColumn style={{ height: '10px', color: 'black', fontSize: '14px', textAlign: 'left', backgroundColor: cyan800, fontWeight: '600' }} tooltip="fileName">fileName</TableHeaderColumn>*/}
              <TableHeaderColumn style={{ height: '10px', color: 'black', fontSize: '14px', textAlign: 'left', backgroundColor: cyan800, fontWeight: '600' }} tooltip="date">date</TableHeaderColumn>
              <TableHeaderColumn style={{ height: '10px', color: 'black', fontSize: '14px', textAlign: 'left', backgroundColor: cyan800, fontWeight: '600' }} tooltip="category">category</TableHeaderColumn>
              <TableHeaderColumn style={{ height: '10px', color: 'black', fontSize: '14px', textAlign: 'left', backgroundColor: cyan800, fontWeight: '600' }} tooltip="amount">amount</TableHeaderColumn>
              <TableHeaderColumn style={{ height: '10px', color: 'black', fontSize: '14px', textAlign: 'left', backgroundColor: cyan800, fontWeight: '600' }} tooltip="note">note</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
            preScanRows={false}
          >
            {this.props.tableData.map( (row, index) => (
              <TableRow key={index} selected={row.selected}>
                <TableRowColumn style={{ width: '6%' }}>{index}</TableRowColumn>
                {/*<TableRowColumn>{row.fileName}</TableRowColumn>*/}
                <TableRowColumn style={{ width: '13%' }}>{row.date}</TableRowColumn>
                <TableRowColumn style={{ width: '13%' }}>{row.category}</TableRowColumn>
                <TableRowColumn style={{ width: '13%' }}>{row.amount}</TableRowColumn>
                <TableRowColumn style={{ width: '14%' }}>{row.note}</TableRowColumn>
              </TableRow>
              ))}
          </TableBody>
          <TableFooter
            adjustForCheckbox={this.state.showCheckboxes}
          >
            <TableRow>
              <TableRowColumn>ID</TableRowColumn>
              <TableRowColumn>Name</TableRowColumn>
              <TableRowColumn>Status</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn colSpan="3" style={{textAlign: 'center'}}>
                Super Footer
              </TableRowColumn>
            </TableRow>
          </TableFooter>
        </Table>

        {/*<div style={styles.propContainer}>
          <h3>Table Properties</h3>
          <TextField
            floatingLabelText="Table Body Height"
            defaultValue={this.state.height}
            onChange={this.handleChange}
          />
          <Toggle
            name="fixedHeader"
            label="Fixed Header"
            onToggle={this.handleToggle}
            defaultToggled={this.state.fixedHeader}
          />
          <Toggle
            name="fixedFooter"
            label="Fixed Footer"
            onToggle={this.handleToggle}
            defaultToggled={this.state.fixedFooter}
          />
          <Toggle
            name="selectable"
            label="Selectable"
            onToggle={this.handleToggle}
            defaultToggled={this.state.selectable}
          />
          <Toggle
            name="multiSelectable"
            label="Multi-Selectable"
            onToggle={this.handleToggle}
            defaultToggled={this.state.multiSelectable}
          />
          <Toggle
            name="enableSelectAll"
            label="Enable Select All"
            onToggle={this.handleToggle}
            defaultToggled={this.state.enableSelectAll}
          />
          <h3 style={styles.propToggleHeader}>TableBody Properties</h3>
          <Toggle
            name="deselectOnClickaway"
            label="Deselect On Clickaway"
            onToggle={this.handleToggle}
            defaultToggled={this.state.deselectOnClickaway}
          />
          <Toggle
            name="stripedRows"
            label="Stripe Rows"
            onToggle={this.handleToggle}
            defaultToggled={this.state.stripedRows}
          />
          <Toggle
            name="showRowHover"
            label="Show Row Hover"
            onToggle={this.handleToggle}
            defaultToggled={this.state.showRowHover}
          />
          <h3 style={styles.propToggleHeader}>Multiple Properties</h3>
          <Toggle
            name="showCheckboxes"
            label="Show Checkboxes"
            onToggle={this.handleToggle}
            defaultToggled={this.state.showCheckboxes}
          />
        </div>*/}
      </div>
    );
  }
}

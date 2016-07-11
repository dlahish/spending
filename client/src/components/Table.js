import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import { cyan800, grey50, red900 } from 'material-ui/styles/colors';
import MaterialIcons from 'material-design-icons';
import FontIcon from 'material-ui/FontIcon';
import {red500, yellow500, blue500} from 'material-ui/styles/colors';

const iconStyles = {
  marginRight: 54,
  fontSize: '54px'
};

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
  },

  tableHeaderColumn: {
    height: '10px',
    color: 'black',
    fontSize: '14px',
    textAlign: 'left',
    backgroundColor: cyan800,
    fontWeight: '600'
  }

};

class DataTable extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      table: {
        fixedHeader: true,
        fixedFooter: false,
        stripedRows: false,
        showRowHover: false,
        selectable: false,
        multiSelectable: false,
        enableSelectAll: false,
        deselectOnClickaway: true,
        showCheckboxes: false,
        height: '320px'
      },

      amountSort: ''
    };
  }

  // handleToggle = (event, toggled) => {
  //   this.setState({
  //     [event.target.name]: toggled,
  //   });
  // };
  //
  // handleChange = (event) => {
  //   this.setState({height: event.target.value});
  // };
  handleAmountSort() {
    if (this.state.amountSort.length === 0) {
        this.props.setVisibilityFilter('SORT_DOWN_AMOUNT');
        this.setState({ amountSort: 'down' });
    } else if (this.state.amountSort === 'down') {
        this.props.setVisibilityFilter('SORT_UP_AMOUNT');
        this.setState({ amountSort: 'up' });
    } else {
        this.props.setVisibilityFilter('SORT_DOWN_AMOUNT');
        this.setState({ amountSort: 'down' });
    }
    // this.forceUpdate();
  }

  render() {
    return (
      <div style={{ width: '80%', margin: 'auto', paddingTop: '20px' }}>
        {/*<div>
          <FontIcon className="material-icons" style={iconStyles}>home</FontIcon>
          <FontIcon className="material-icons" style={iconStyles} color={red500}>flight_takeoff</FontIcon>
          <FontIcon className="material-icons" style={iconStyles} color={yellow500}>cloud_download</FontIcon>
          <FontIcon className="material-icons" style={iconStyles} color={blue500}>videogame_asset</FontIcon>
        </div>*/}
        <Table
          height={this.state.table.height}
          fixedHeader={this.state.table.fixedHeader}
          fixedFooter={this.state.table.fixedFooter}
          selectable={this.state.table.selectable}
          multiSelectable={this.state.table.multiSelectable}
        >
          <TableHeader
            displaySelectAll={this.state.table.showCheckboxes}
            adjustForCheckbox={this.state.table.showCheckboxes}
            enableSelectAll={this.state.table.enableSelectAll}
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
              <TableHeaderColumn style={ styles.tableHeaderColumn } tooltip="The ID">#</TableHeaderColumn>
              <TableHeaderColumn style={ styles.tableHeaderColumn } tooltip="date">date</TableHeaderColumn>
              <TableHeaderColumn style={ styles.tableHeaderColumn } tooltip="category">category</TableHeaderColumn>
              <TableHeaderColumn style={ styles.tableHeaderColumn } tooltip="amount">
                <span>
                  { this.state.amountSort === 'down' ?
                    <FontIcon
                      className="material-icons"
                      style={{ fontSize: '25px', marginLeft: '-35px', cursor: 'pointer' }}
                      onTouchTap={this.handleAmountSort.bind(this)}
                    >arrow_drop_down
                    </FontIcon> :
                    <FontIcon
                      className="material-icons"
                      style={{ fontSize: '25px', marginLeft: '-35px', cursor: 'pointer' }}
                      onTouchTap={this.handleAmountSort.bind(this)}
                    >arrow_drop_up
                    </FontIcon>
                  }
                </span>
                amount
              </TableHeaderColumn>
              <TableHeaderColumn style={ styles.tableHeaderColumn} tooltip="note">note</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.state.table.showCheckboxes}
            deselectOnClickaway={this.state.table.deselectOnClickaway}
            showRowHover={this.state.table.showRowHover}
            stripedRows={this.state.table.stripedRows}
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
          {/*<TableFooter
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
          </TableFooter>*/}
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

export default connect(null, actions)(DataTable)

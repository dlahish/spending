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
import SortArrow from './SortArrow';

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
        selectable: true,
        multiSelectable: false,
        enableSelectAll: false,
        displaySelectAll: false,
        adjustForCheckbox: true,
        deselectOnClickaway: true,
        showCheckboxes: false,
        height: '320px'
      },

      amountSort: '',
      dateSort: '',
      categorySort: '',
      selectedData: null
    };
  }

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
  }

  handleDateSort() {
    if (this.state.dateSort.length === 0) {
        this.props.setVisibilityFilter('SORT_DOWN_DATE');
        this.setState({ dateSort: 'down' });
    } else if (this.state.dateSort === 'down') {
        this.props.setVisibilityFilter('SORT_UP_DATE');
        this.setState({ dateSort: 'up' });
    } else {
        this.props.setVisibilityFilter('SORT_DOWN_DATE');
        this.setState({ dateSort: 'down' });
    }
  }

  handleCategorySort() {
    if (this.state.categorySort.length === 0) {
        this.props.setVisibilityFilter('SORT_DOWN_CATEGORY');
        this.setState({ categorySort: 'down' });
    } else if (this.state.categorySort === 'down') {
        this.props.setVisibilityFilter('SORT_UP_CATEGORY');
        this.setState({ categorySort: 'up' });
    } else {
        this.props.setVisibilityFilter('SORT_DOWN_CATEGORY');
        this.setState({ categorySort: 'down' });
    }
  }

  handleRowSelection = (event) => {
    console.log('handle row selection');
    const selectedData = event[0];
    console.log(selectedData);
    const dataId = this.props.tableData[selectedData].data._id;
    // console.log(dataSelected);
    // this.setState({ selectedData: selectedData });
    this.props.toggleData(dataId);
  }

  render() {
    console.log(this.state.categorySort);
    return (
      <div style={{ width: '90%', margin: 'auto', paddingTop: '20px' }}>
        <Table
          height={this.state.table.height}
          fixedHeader={this.state.table.fixedHeader}
          fixedFooter={this.state.table.fixedFooter}
          selectable={this.state.table.selectable}
          multiSelectable={this.state.table.multiSelectable}
          onRowSelection={this.handleRowSelection.bind(this)}
        >
          <TableHeader
            displaySelectAll={this.state.table.showCheckboxes}
            adjustForCheckbox={this.state.table.adjustForCheckbox}
            enableSelectAll={this.state.table.enableSelectAll}
          >
            {/*<TableRow>
              <TableHeaderColumn style={{ width: '6%', textAlign: 'left', fontSize: '18px', color: 'black', height: '10px' }} tooltip="Super Header">Your Data</TableHeaderColumn>
              <TableHeaderColumn style={{ width: '6%' }}></TableHeaderColumn>
              <TableHeaderColumn style={{ width: '13%' }}></TableHeaderColumn>
              <TableHeaderColumn style={{ width: '13%' }}></TableHeaderColumn>
              <TableHeaderColumn style={{ width: '13%' }}></TableHeaderColumn>
              <TableHeaderColumn style={{ width: '14%' }}></TableHeaderColumn>
            </TableRow>*/}
            <TableRow>
              <TableHeaderColumn
                style={ {
                  width: '8%',
                  height: '10px',
                  color: 'black',
                  fontSize: '14px',
                  textAlign: 'left',
                  backgroundColor: cyan800,
                  fontWeight: '600',
                  paddingLeft: '50px',
                  marginRight: '25px'
                 } }
                tooltip="The ID">#</TableHeaderColumn>
              <TableHeaderColumn
                style={{
                  paddingLeft: '44px',
                  height: '10px',
                  color: 'black',
                  fontSize: '14px',
                  textAlign: 'left',
                  backgroundColor: cyan800,
                  fontWeight: '600'
                }}
                tooltip="date">

                <span>
                  { this.state.dateSort === 'down' ?
                    <FontIcon
                      className="material-icons"
                      style={{ fontSize: '25px', cursor: 'pointer' }}
                      onTouchTap={this.handleDateSort.bind(this)}
                    >arrow_drop_down
                    </FontIcon> :
                    <FontIcon
                      className="material-icons"
                      style={{ fontSize: '25px', cursor: 'pointer' }}
                      onTouchTap={this.handleDateSort.bind(this)}
                    >arrow_drop_up
                    </FontIcon>
                  }
                </span>
                date
              </TableHeaderColumn>
              <TableHeaderColumn style={ styles.tableHeaderColumn } tooltip="category">
                <span>
                  { this.state.categorySort === 'down' ?
                    <FontIcon
                      className="material-icons"
                      style={{ fontSize: '25px', marginLeft: '-30px', cursor: 'pointer' }}
                      onTouchTap={this.handleCategorySort.bind(this)}
                    >arrow_drop_down
                    </FontIcon> :
                    <FontIcon
                      className="material-icons"
                      style={{ fontSize: '25px', marginLeft: '-30px', cursor: 'pointer' }}
                      onTouchTap={this.handleCategorySort.bind(this)}
                    >arrow_drop_up
                    </FontIcon>
                  }
                </span>
                category
              </TableHeaderColumn>
              <TableHeaderColumn style={ styles.tableHeaderColumn } tooltip="amount">
                <span>
                  { this.state.amountSort === 'down' ?
                    <FontIcon
                      className="material-icons"
                      style={{ fontSize: '25px', marginLeft: '-30px', cursor: 'pointer' }}
                      onTouchTap={this.handleAmountSort.bind(this)}
                    >arrow_drop_down
                    </FontIcon> :
                    <FontIcon
                      className="material-icons"
                      style={{ fontSize: '25px', marginLeft: '-30px', cursor: 'pointer' }}
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
            displayRowCheckbox={true}
            deselectOnClickaway={this.state.table.deselectOnClickaway}
            showRowHover={this.state.table.showRowHover}
            stripedRows={this.state.table.stripedRows}
            preScanRows={false}
          >
            {this.props.tableData.length > 0 ?
              this.props.tableData.map((row, index) => (
                <TableRow key={index} selected={row.selected}>
                  <TableRowColumn style={{ width: '6%' }}>{index}</TableRowColumn>
                  {/*<TableRowColumn>{row.fileName}</TableRowColumn>*/}
                  <TableRowColumn style={{ width: '13%' }}>{row.data.date}</TableRowColumn>
                  <TableRowColumn style={{ width: '13%' }}>{row.data.category}</TableRowColumn>
                  <TableRowColumn style={{ width: '13%' }}>{row.data.amount}</TableRowColumn>
                  <TableRowColumn style={{ width: '14%' }}>{row.data.note}</TableRowColumn>
                </TableRow>
              )) : ''
            }

          </TableBody>
        </Table>
      </div>
    );
  }
}

export default connect(null, actions)(DataTable)

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { connect } from 'react-redux';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

const CommitList = (props) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const columns = [
    {
      id: 'sha',
      label: 'sha',
    },
    {
      id: 'message',
      label: 'message',
    },
    {
      id: 'repository',
      label: 'repository',
    },
    {
      id: 'date',
      label: 'date',
    },
  ];

  return (
    <div>

      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell
                    key={column.id}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {props.repository.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.sha}>
                    {columns.map(column => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} >
                        {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={props.repository.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      {/* <Row>
        <Table columns={columns} dataSource={props.repository} size="middle" />
      </Row> */}
    </div>
  );
};

const filterData = (commitList, deselectedItems) => {
  const listWithKeys = commitList.map((d) => {
    return { ...d, key: d.sha };
  });

  if (deselectedItems.length > 0) {
    return listWithKeys.filter((f) => !deselectedItems.includes(f.repository));
  } else {
    return listWithKeys;
  }
};

const mapStateToProps = (state) => {
  const filteredCommitList = filterData(state.repository, state.visibilityFilter);
  return {
    repository: filteredCommitList,
  };
};


export default connect(
  mapStateToProps,
  null
)(CommitList);

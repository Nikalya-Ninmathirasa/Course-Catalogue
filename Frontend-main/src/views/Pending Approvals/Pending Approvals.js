import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import UserCard from "../../components/Core/UserCard/UserCard";
import IconButton from "@material-ui/core/IconButton";
import DoneIcon from '@material-ui/icons/Done';
import { getPendingApprovals,approveUser } from "../../services/staticService";
import { ToastContainer, toast } from "react-toastify";

const columns = [
  { id: "user_name", label: "User", minWidth: 250 },
  { id: "user_type", label: "User Type", minWidth: 170 },

  {
    id: "phn",
    label: "Phone",
    minWidth: 170,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "email",
    label: "Email",
    minWidth: 170,
    format: (value) => value.toLocaleString("en-US"),
  },

  {
    id: "action",
    label: "Action",
    minWidth: 100,
    format: (value) => value.toFixed(2),
  },
];

const StyledTableCell = withStyles(() => ({
  head: {
    backgroundColor: "rgba(250,250,250,1)",
    fontSize: "16px",
    fontWeight: "700",
    paddingBottom: "35px",
  },
  root: {
    borderBottom: "4px solid rgba(250,250,250,1)",
  },
  body: {
    paddingTop: "0",
    paddingBottom: "0",
  },
}))(TableCell);

const StyledIconButton = withStyles(() => ({
  colorPrimary: {
    color: "rgba(134, 141, 170, 1)",
  },
  colorSecondary: {
    color: "rgba(77, 182, 172, 1)",
  },
}))(IconButton);

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 540,
  },
});

export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState(false);
  const [update, setUpdate] = React.useState('');
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  const getStats = async () => {
    try {
      const res = await getPendingApprovals();

      setRows(res);

      setLoading(false);
    } catch (e) {
      setLoading(false);
      setError(true);
    }
  };

  const handleApproveUser = async (id) => {
    try {
      await approveUser(id);
      setUpdate(id);
    } catch (e) {
      toast('Action Failed!');
    }
  };

  React.useEffect(() => {
    getStats();
  }, [update]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if(loading){
    return(
      <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
        <CircularProgress/>
      </div>
    );
  }

  return (
    <Paper className={classes.root} elevation={0}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    <StyledTableCell>
                      <UserCard name={row.user_firstname} />
                    </StyledTableCell>
                    <StyledTableCell style={{textTransform:'capitalize'}}>{row.role}</StyledTableCell>
                    <StyledTableCell>{row.phoneno}</StyledTableCell>
                    <StyledTableCell>{row.email}</StyledTableCell>
                    <StyledTableCell>
                      <StyledIconButton color="secondary" aria-label="delete" onClick={()=>handleApproveUser(row._id)}>
                        <DoneIcon fontSize="small" />
                      </StyledIconButton>
                    </StyledTableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <ToastContainer />
    </Paper>
  );
}

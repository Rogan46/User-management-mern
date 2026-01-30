import {
  Table, TableBody, TableCell, TableHead,
  TableRow, IconButton, Menu, MenuItem, Avatar,
  TableContainer, Paper, TableFooter, TablePagination, Box
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../Service/userservice";
import { useState } from "react";

function UserTable({ users = [], reload, currentPage = 0, pageSize = 5, totalPages = 1, onPageChange, onPageSizeChange }) {
  const navigate = useNavigate();

  const handleChangePage = (_e, newPage) => {
    if (onPageChange) onPageChange(newPage);
  };
  const handleChangeRowsPerPage = (e) => {
    const newSize = parseInt(e.target.value, 10);
    if (onPageSizeChange) onPageSizeChange(newSize);
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        width: "100%",
        boxShadow: 2,
        borderRadius: 1,
        overflow: "hidden"
      }}
    >
      <Table sx={{ width: "100%" }}>
        {/* TABLE HEADER */}
        <TableHead>
          <TableRow sx={{ backgroundColor: "#2b2b2b" }}>
            {["ID", "Full Name", "Email", "Gender", "Status", "Profile", "Action"].map(
              (h) => (
                <TableCell
                  key={h}
                  sx={{
                    color: "white",
                    fontWeight: 600,
                    fontSize: "0.9rem"
                  }}
                >
                  {h}
                </TableCell>
              )
            )}
          </TableRow>
        </TableHead>

        {/* TABLE BODY */}
        <TableBody>
          {users.map((u, index) => (
            <TableRow key={u.id ?? index} hover>
              <TableCell>{currentPage * pageSize + index + 1}</TableCell>
              <TableCell>{u.firstName}</TableCell>
              <TableCell>{u.email}</TableCell>
              <TableCell>{u.gender}</TableCell>

              {/* STATUS */}
              <TableCell>
                <Box
                  sx={{
                    display: "inline-block",
                    px: 1.5,
                    py: 0.5,
                    borderRadius: "12px",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    textTransform: "capitalize",
                    backgroundColor:
                      u.status === "active" ? "#e6f4ea" : "#fdecea",
                    color:
                      u.status === "active" ? "#2e7d32" : "#c62828"
                  }}
                >
                  {u.status}
                </Box>
              </TableCell>

              {/* PROFILE */}
              <TableCell>
                <Avatar 
                  sx={{ width: 32, height: 32 }}
                  src={u.profile}
                  alt={u.firstName}
                >
                  {u.firstName ? u.firstName[0].toUpperCase() : '👤'}
                </Avatar>
              </TableCell>

              {/* ACTION */}
              <TableCell>
                <ActionMenu id={u.id} reload={reload} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        {/* PAGINATION */}
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 15]}
              colSpan={7}
              count={totalPages * pageSize}
              rowsPerPage={pageSize}
              page={currentPage}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{
                borderTop: "1px solid #e0e0e0"
              }}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

function ActionMenu({ id, reload }) {
  const [anchor, setAnchor] = useState(null);
  const navigate = useNavigate();

  return (
    <>
      <IconButton size="small" onClick={(e) => setAnchor(e.currentTarget)}>
        <MoreVertIcon />
      </IconButton>

      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={() => setAnchor(null)}
      >
        <MenuItem onClick={() => navigate(`/view/${id}`)}>View</MenuItem>
        <MenuItem onClick={() => navigate(`/edit/${id}`)}>Edit</MenuItem>
        <MenuItem
          onClick={async () => {
            await deleteUser(id);
            reload();
          }}
          sx={{ color: "error.main" }}
        >
          Delete
        </MenuItem>
      </Menu>
    </>
  );
}

export default UserTable;

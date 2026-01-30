import { useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import Header from "../Component/Header";
import UserTable from "../Component/Usertable";
import { getUsers, searchUsers, exportCsv, getUsersWithPagination } from "../Service/userservice";
import { useNavigate } from "react-router-dom";

function UserList() {
  const [users, setUsers] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    loadUsers();
  }, [page, size]);

  const loadUsers = () => {
    getUsersWithPagination(page, size).then(res => {
      setUsers(res.data.content || res.data);
      setTotalPages(res.data.totalPages || 1);
    }).catch(() => {
      getUsers().then(res => setUsers(res.data));
    });
  };

  const handleSearch = () => {
    if (keyword) {
      searchUsers(keyword).then(res => setUsers(res.data));
    } else {
      setPage(0);
      loadUsers();
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newSize) => {
    setSize(newSize);
    setPage(0);
  };

  const handleExport = async () => {
    const res = await exportCsv();
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const a = document.createElement("a");
    a.href = url;
    a.download = "users.csv";
    a.click();
  };

  return (
    <Box sx={{ backgroundColor: "#f4f4f4", minHeight: "100vh", width: "100%", boxSizing: "border-box", overflow: "hidden" }}>
      <Header />

      {/* PAGE CONTAINER */}
      <Box
  sx={{
    width: "100%",
    boxSizing: "border-box",
    px: { xs: 2, md: 4 },
    py: 2
  }}
>

        {/* TOP ACTION BAR */}
<Box
  display="flex"
  alignItems="center"
  justifyContent="space-between"
  flexWrap="wrap"
  gap={2}
  mb={2}
>
          <TextField
            size="small"
            placeholder="Search"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            sx={{ backgroundColor: "white", width: 220 }}
          />

          <Button
            variant="contained"
            onClick={handleSearch}
            sx={{ backgroundColor: "#a6423a" }}
          >
            Search
          </Button>

          <Box flexGrow={1} />

          <Button
            variant="contained"
            sx={{ backgroundColor: "#a6423a" }}
            onClick={() => navigate("/add")}
          >
            + Add User
          </Button>

          <Button
            variant="contained"
            sx={{ backgroundColor: "#a6423a" }}
            onClick={handleExport}
          >
            Export To Csv
          </Button>
        </Box>

        {/* TABLE */}
        <UserTable 
          users={users} 
          reload={loadUsers} 
          currentPage={page}
          pageSize={size}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      </Box>
    </Box>
  );
}

export default UserList;

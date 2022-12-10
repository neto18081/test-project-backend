import React, { useState, useEffect } from "react";

import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Snackbar,
  TextField,
} from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Typography from "@mui/material/Typography";
import { visuallyHidden } from "@mui/utils";

import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import "./App.css";
import TableComponent from "./components/TableComponent";
import { Order, EnhancedTableProps } from "./types/Customer";
import ModalComponent from "./components/ModalComponent";
import { useForm, SubmitHandler } from "react-hook-form";
import api from "./services/api";
import Alert from "@mui/material/Alert";

type Data = {
  ID: number;
  first_name: string;
  last_name: string;
  email: string;
};
interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

type Inputs = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

function App() {
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [orderBy, setOrderBy] = useState<string>("id");
  const [order, setOrder] = useState<Order>("asc");
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState<{
    type: string;
    id: string;
    customer: { [key: string]: string } | undefined;
  }>({
    type: "create",
    id: "0",
    customer: {
      ID: "",
      first_name: "",
      last_name: "",
      email: "",
    },
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [rows, setRows] = useState<[] | readonly { [key: string]: string }[]>(
    []
  );
  const [customers, setCustomers] = useState<
    [] | readonly { [key: string]: string }[]
  >([]);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (modalType.type === "create") {
      createCustomer(data);
      reset();
    } else {
      updateCustomer(data);
    }
  };

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  async function getCustomers() {
    const res = await api.get("/customers");
    setCustomers(res.data.customers);

    const tableRows:
      | []
      | readonly {
          [key: string]: string;
        }[] = res.data.customers.map((c: { [key: string]: string }) =>
      createData(c.ID, c.First_Name, c.Last_Name, c.Email)
    );

    setRows(tableRows);
    setTimeout(() => {
      setSelected([]);
    }, 1);
    console.log(res.data);
  }

  async function deleteCustomer(id?: string) {
    setLoading(true);
    try {
      if (id !== undefined) {
        const res = await api.delete(`/customers/${id}`);
        getCustomers();
        console.log(res.data);
      } else {
        selected.forEach(async (s) => {
          const res = await api.delete(`/customers/${s}`);
          getCustomers();
          console.log(res.data);
        });
      }
      setSnackbar({
        ...snackbar,
        severity: "success",
        open: true,
        message: "Customer(s) successfully deleted",
      });
    } catch (err) {
      setSnackbar({
        ...snackbar,
        severity: "error",
        open: true,
        message: "Something went wrong! Try again later.",
      });
    } finally {
      setLoading(false);
    }
  }

  async function updateCustomer(data: {
    first_name: string;
    last_name: string;
    email: string;
  }) {
    console.log(data);
    setLoading(true);
    try {
      const res = await api.put(`/customers/${modalType.id}`, {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
      });
      console.log(res);
      getCustomers();
      setSnackbar({
        ...snackbar,
        severity: "success",
        open: true,
        message: "Customer successfully updated",
      });
      console.log(res.data);
    } catch (err) {
      setSnackbar({
        ...snackbar,
        severity: "error",
        open: true,
        message: "Something went wrong! Try again later.",
      });
    } finally {
      setLoading(false);
    }
  }

  async function createCustomer(data: Inputs) {
    setLoading(true);
    try {
      const res = await api.post("/customers", {
        First_Name: data.first_name,
        Last_Name: data.last_name,
        Email: data.email,
        Password: data.password,
      });
      getCustomers();
      setSnackbar({
        ...snackbar,
        severity: "success",
        open: true,
        message: "Customer successfully created",
      });
    } catch (err) {
      setSnackbar({
        ...snackbar,
        severity: "error",
        open: true,
        message: "Something went wrong! Try again later.",
      });
    } finally {
      setLoading(false);
    }
  }
  function handleModal(type: string, id: string) {
    console.log(id);
    reset();
    if (type === "create") {
      setModalType({
        ...modalType,
        type: "create",
        id: "0",
      });
    } else {
      const c = rows.find((r) => parseInt(r.ID) === parseInt(id));
      setModalType({
        type: "update",
        id: id,
        customer: c,
      });
    }
    setTimeout(() => {
      setOpen(true);
      setSelected([]);
    }, 1);
  }

  useEffect(() => {
    getCustomers();
  }, []);

  function createData(
    ID: string,
    first_name: string,
    last_name: string,
    email: string
  ) {
    return {
      ID,
      first_name,
      last_name,
      email,
    };
  }

  const headCells: readonly HeadCell[] = [
    {
      id: "ID",
      numeric: true,
      disablePadding: true,
      label: "ID",
    },
    {
      id: "first_name",
      numeric: false,
      disablePadding: false,
      label: "First Name",
    },
    {
      id: "last_name",
      numeric: false,
      disablePadding: false,
      label: "Last Name",
    },
    {
      id: "email",
      numeric: false,
      disablePadding: false,
      label: "Email",
    },
  ];

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  function EnhancedTableHead(props: EnhancedTableProps) {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
      onRequestSort,
    } = props;
    const createSortHandler =
      (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
      };

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                "aria-label": "select all desserts",
              }}
            />
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? "right" : "left"}
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1>Customers</h1>
          <Box sx={{ display: "flex", gap: "20px" }}>
            <Button
              onClick={() => handleModal("create", "0")}
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
            >
              Create
            </Button>
            <Button
              variant="contained"
              color="error"
              disabled={selected.length === 0}
              startIcon={<DeleteIcon />}
              onClick={() => deleteCustomer()}
            >
              Delete {selected.length > 0 && `(${selected.length})`}
            </Button>
          </Box>
        </Box>
        <div>
          <TableComponent
            selected={selected}
            setSelected={setSelected}
            rows={rows}
            handleRequestSort={handleRequestSort}
            order={order}
            orderBy={orderBy}
            EnhancedTableHead={EnhancedTableHead}
            onEdit={handleModal}
            onDelete={deleteCustomer}
          />
        </div>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity === "success" ? "success" : "error"}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>

        <ModalComponent open={open} onClose={setOpen}>
          {modalType.type === "create" ? (
            <>
              <Typography id="modal-modal-title" variant="h5" component="h2">
                Create a Customer
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Fill the fields below to create a customer.
              </Typography>
              <form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "20px 10px",
                  gap: "20px",
                }}
                onSubmit={handleSubmit(onSubmit)}
              >
                <Box sx={{ width: "100%" }}>
                  <TextField
                    sx={{ width: "100%" }}
                    label="First Name"
                    variant="outlined"
                    {...register("first_name", {
                      required: true,
                    })}
                  />

                  {errors.first_name && (
                    <Typography color="error" sx={{ padding: "10px 0 0 10px" }}>
                      This field is required
                    </Typography>
                  )}
                </Box>

                <Box sx={{ width: "100%" }}>
                  <TextField
                    sx={{ width: "100%" }}
                    label="Last Name"
                    variant="outlined"
                    {...register("last_name", {
                      required: true,
                    })}
                  />

                  {errors.last_name && (
                    <Typography color="error" sx={{ padding: "10px 0 0 10px" }}>
                      This field is required
                    </Typography>
                  )}
                </Box>

                <Box sx={{ width: "100%" }}>
                  <TextField
                    sx={{ width: "100%" }}
                    label="Email"
                    variant="outlined"
                    type="email"
                    {...register("email", {
                      required: true,
                    })}
                  />

                  {errors.email && (
                    <Typography color="error" sx={{ padding: "10px 0 0 10px" }}>
                      This field is required
                    </Typography>
                  )}
                </Box>

                <Box sx={{ width: "100%" }}>
                  <TextField
                    sx={{ width: "100%" }}
                    label="Password"
                    variant="outlined"
                    type="password"
                    {...register("password", {
                      required: true,
                    })}
                  />

                  {errors.password && (
                    <Typography color="error" sx={{ padding: "10px 0 0 10px" }}>
                      This field is required
                    </Typography>
                  )}
                </Box>
                <Button
                  disabled={loading}
                  type="submit"
                  color="primary"
                  variant="contained"
                >
                  {loading ? (
                    <CircularProgress
                      style={{ color: "#fff", padding: "5px" }}
                    />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </form>
            </>
          ) : (
            <>
              <Typography id="modal-modal-title" variant="h5" component="h2">
                Update a Customer
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Change the fields below to update a customer.
              </Typography>
              <form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "20px 10px",
                  gap: "20px",
                }}
                onSubmit={handleSubmit(onSubmit)}
              >
                <Box sx={{ width: "100%" }}>
                  <TextField
                    sx={{ width: "100%" }}
                    label="First Name"
                    variant="outlined"
                    defaultValue={modalType.customer?.first_name}
                    {...register("first_name")}
                  />

                  {errors.first_name && (
                    <Typography color="error" sx={{ padding: "10px 0 0 10px" }}>
                      This field is required
                    </Typography>
                  )}
                </Box>

                <Box sx={{ width: "100%" }}>
                  <TextField
                    sx={{ width: "100%" }}
                    label="Last Name"
                    variant="outlined"
                    defaultValue={modalType.customer?.last_name}
                    {...register("last_name")}
                  />

                  {errors.last_name && (
                    <Typography color="error" sx={{ padding: "10px 0 0 10px" }}>
                      This field is required
                    </Typography>
                  )}
                </Box>

                <Box sx={{ width: "100%" }}>
                  <TextField
                    sx={{ width: "100%" }}
                    label="Email"
                    variant="outlined"
                    type="email"
                    defaultValue={modalType.customer?.email}
                    {...register("email")}
                  />

                  {errors.email && (
                    <Typography color="error" sx={{ padding: "10px 0 0 10px" }}>
                      This field is required
                    </Typography>
                  )}
                </Box>

                <Box sx={{ width: "100%" }}>
                  <TextField
                    sx={{ width: "100%", display: "none" }}
                    label="Password"
                    variant="outlined"
                    type="password"
                    disabled={true}
                    {...register("password", {
                      required: false,
                    })}
                  />

                  {errors.password && (
                    <Typography color="error" sx={{ padding: "10px 0 0 10px" }}>
                      This field is required
                    </Typography>
                  )}
                </Box>

                <Button
                  disabled={loading}
                  type="submit"
                  color="primary"
                  variant="contained"
                >
                  {loading ? (
                    <CircularProgress
                      style={{ color: "#fff", padding: "5px" }}
                    />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </form>
            </>
          )}
        </ModalComponent>
      </>
    </Box>
  );
}

export default App;

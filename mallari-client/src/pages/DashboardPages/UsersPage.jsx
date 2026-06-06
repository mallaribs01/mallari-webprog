import { useState, useMemo, useEffect } from "react";

import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";

import {
  fetchUsers,
  createUser,
  updateUser,
} from "../../services/UserService";

import { useTheme } from "@mui/material/styles";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import SearchIcon from "@mui/icons-material/Search";

import { DataGrid } from "@mui/x-data-grid";

const roles = ["admin", "editor", "viewer"];

const genders = ["male", "female", "other"];

const blankForm = {
  firstName: "",
  lastName: "",
  age: "",
  gender: "",
  contactNumber: "",
  email: "",
  type: "editor",
  username: "",
  password: "",
  address: "",
  isActive: true,
};

const labelize = (value) =>
  value
    ? `${value.charAt(0).toUpperCase()}${value.slice(1)}`
    : "";

const UsersPage = () => {

  const theme = useTheme();

  const isMobile = useMediaQuery(
    theme.breakpoints.down("sm")
  );

  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [modal, setModal] = useState({
    open: false,
    id: null,
  });

  const [form, setForm] = useState(blankForm);

  const [errors, setErrors] = useState({});

  const [showPassword, setShowPassword] =
    useState(false);

  const [search, setSearch] = useState("");

  const [roleFilter, setRoleFilter] =
    useState("");

  const [genderFilter, setGenderFilter] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("");

  // FILTER USERS
  const filteredUsers = useMemo(() => {

    const q = search.trim().toLowerCase();

    return users.filter((user) => {

      const matchesSearch =
        !q ||
        user.firstName
          ?.toLowerCase()
          .includes(q) ||
        user.lastName
          ?.toLowerCase()
          .includes(q) ||
        user.email
          ?.toLowerCase()
          .includes(q) ||
        user.username
          ?.toLowerCase()
          .includes(q);

      const matchesRole =
        !roleFilter ||
        user.type === roleFilter;

      const matchesGender =
        !genderFilter ||
        user.gender === genderFilter;

      const matchesStatus =
        statusFilter === ""
          ? true
          : statusFilter === "active"
            ? user.isActive
            : !user.isActive;

      return (
        matchesSearch &&
        matchesRole &&
        matchesGender &&
        matchesStatus
      );

    });

  }, [
    users,
    search,
    roleFilter,
    genderFilter,
    statusFilter,
  ]);

  // LOAD USERS
  const loadUsers = async () => {

    try {

      setLoading(true);

      const { data } = await fetchUsers();

      setUsers(data.users || []);

    } catch (error) {

      console.error(
        "Error fetching users:",
        error
      );

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadUsers();

  }, []);

  const resetForm = () => {

    setForm({ ...blankForm });

    setErrors({});

  };

  const openModal = (user) => {

    setModal({
      open: true,
      id: user?._id ?? null,
    });

    setForm(
      user
        ? { ...blankForm, ...user }
        : { ...blankForm }
    );

    setErrors({});

  };

  const closeModal = () => {

    setModal({
      open: false,
      id: null,
    });

    setShowPassword(false);

    resetForm();

  };

  const handleChange = ({
    target: {
      name,
      value,
      checked,
      type,
    },
  }) => {

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));

    if (errors[name]) {

      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));

    }

  };

  // VALIDATION
  const validate = () => {

    const nextErrors = {};

    const email =
      form.email.trim().toLowerCase();

    const username =
      form.username.trim().toLowerCase();

    [
      ["firstName", "First name"],
      ["lastName", "Last name"],
      ["age", "Age"],
      ["gender", "Gender"],
      ["contactNumber", "Contact number"],
      ["email", "Email"],
      ["type", "Type"],
      ["username", "Username"],
      ["password", "Password"],
      ["address", "Address"],
    ].forEach(([key, label]) => {

      if (!String(form[key]).trim()) {

        nextErrors[key] =
          `${label} is required.`;

      }

    });

    if (
      !nextErrors.age &&
      !/^\d+$/.test(form.age.trim())
    ) {

      nextErrors.age =
        "Age must be numeric.";

    }

    if (
      !nextErrors.contactNumber &&
      !/^\d{11}$/.test(
        form.contactNumber.trim()
      )
    ) {

      nextErrors.contactNumber =
        "Contact number must be 11 digits.";

    }

    if (
      !nextErrors.password &&
      form.password.length < 8
    ) {

      nextErrors.password =
        "Password must be at least 8 characters.";

    }

    if (
      !nextErrors.username &&
      /\s/.test(form.username)
    ) {

      nextErrors.username =
        "Username cannot contain spaces.";

    }

    if (
      !nextErrors.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email
      )
    ) {

      nextErrors.email =
        "Invalid email address.";

    }

    if (
      !nextErrors.email &&
      users.some(
        (user) =>
          user._id !== modal.id &&
          user.email === email
      )
    ) {

      nextErrors.email =
        "Email already exists.";

    }

    if (
      !nextErrors.username &&
      users.some(
        (user) =>
          user._id !== modal.id &&
          user.username === username
      )
    ) {

      nextErrors.username =
        "Username already exists.";

    }

    return nextErrors;

  };

  // SUBMIT
  const handleSubmit = async (
    event
  ) => {

    event.preventDefault();

    const nextErrors = validate();

    if (
      Object.keys(nextErrors).length
    ) {

      setErrors(nextErrors);

      return;

    }

    try {

      const nextUser = {
        firstName:
          form.firstName.trim(),
        lastName:
          form.lastName.trim(),
        age: form.age.trim(),
        gender:
          form.gender
            .trim()
            .toLowerCase(),
        contactNumber:
          form.contactNumber.trim(),
        email:
          form.email
            .trim()
            .toLowerCase(),
        type:
          form.type
            .trim()
            .toLowerCase(),
        username:
          form.username
            .trim()
            .toLowerCase(),
        password: form.password,
        address:
          form.address.trim(),
        isActive: form.isActive,
      };

      if (modal.id) {

        const updatedUser = {
          ...nextUser,
        };

        if (
          !updatedUser.password
        ) {

          delete updatedUser.password;

        }

        await updateUser(
          modal.id,
          updatedUser
        );

      } else {

        await createUser(nextUser);

      }

      await loadUsers();

      closeModal();

    } catch (error) {

      console.error(
        "Error saving user:",
        error
      );

    }

  };

  // TOGGLE STATUS
  const toggleStatus = async (id) => {

    try {

      const selectedUser =
        users.find(
          (user) =>
            user._id === id
        );

      await updateUser(id, {
        isActive:
          !selectedUser.isActive,
      });

      await loadUsers();

    } catch (error) {

      console.error(
        "Error updating status:",
        error
      );

    }

  };

  // FIELD PROPS
  const fieldProps = (
    name,
    label,
    extra = {}
  ) => ({
    name,
    label,
    value: form[name],
    onChange: handleChange,
    error: Boolean(errors[name]),
    helperText: errors[name],
    fullWidth: true,
    ...extra,
  });

  // TABLE COLUMNS
  const columns = [
    {
      field: "fullName",
      headerName: "Full Name",
      flex: 1,
      minWidth: 160,

      valueGetter: (_, row) =>
        `${row.firstName || ""} ${row.lastName || ""
        }`.trim(),
    },

    {
      field: "username",
      headerName: "Username",
      width: 130,
    },

    {
      field: "age",
      headerName: "Age",
      width: 70,
    },

    {
      field: "gender",
      headerName: "Gender",
      width: 100,

      valueGetter: (_, row) =>
        labelize(row.gender),
    },

    {
      field: "contactNumber",
      headerName: "Contact",
      width: 140,
    },

    {
      field: "email",
      headerName: "Email",
      flex: 1,
      minWidth: 200,
    },

    {
      field: "type",
      headerName: "Role",
      width: 100,

      valueGetter: (_, row) =>
        labelize(row.type),
    },

    {
      field: "status",
      headerName: "Status",
      width: 110,
      sortable: false,

      renderCell: (params) => (
        <Chip
          size="small"
          label={
            params.row.isActive
              ? "Active"
              : "Inactive"
          }
          color={
            params.row.isActive
              ? "success"
              : "default"
          }
          variant={
            params.row.isActive
              ? "filled"
              : "outlined"
          }
        />
      ),
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 190,
      sortable: false,
      filterable: false,

      renderCell: (params) => (
        <Stack
          direction="row"
          spacing={1}
        >
          <Button
            size="small"
            variant="outlined"
            onClick={() =>
              openModal(params.row)
            }
          >
            Edit
          </Button>

          <Button
            size="small"
            variant="contained"
            color={
              params.row.isActive
                ? "warning"
                : "success"
            }
            onClick={() =>
              toggleStatus(
                params.row._id
              )
            }
          >
            {params.row.isActive
              ? "Disable"
              : "Activate"}
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100%",
        overflow: "hidden",
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          mb: 3,
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Typography variant="h4">
          Users
        </Typography>

        <Button
          variant="contained"
          onClick={() =>
            openModal()
          }
        >
          Add User
        </Button>
      </Box>

      {/* FILTERS */}
      <Paper
        sx={{
          p: 2,
          mb: 2,
          overflowX: "auto",
        }}
      >
        <Stack
          direction={{
            xs: "column",
            md: "row",
          }}
          spacing={2}
        >
          <TextField
            placeholder="Search users..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            size="small"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            select
            label="Role"
            value={roleFilter}
            onChange={(e) =>
              setRoleFilter(
                e.target.value
              )
            }
            size="small"
            sx={{
              minWidth: 140,
            }}
          >
            <MenuItem value="">
              All Roles
            </MenuItem>

            {roles.map((r) => (
              <MenuItem
                key={r}
                value={r}
              >
                {labelize(r)}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Gender"
            value={genderFilter}
            onChange={(e) =>
              setGenderFilter(
                e.target.value
              )
            }
            size="small"
            sx={{
              minWidth: 140,
            }}
          >
            <MenuItem value="">
              All Genders
            </MenuItem>

            {genders.map((g) => (
              <MenuItem
                key={g}
                value={g}
              >
                {labelize(g)}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Status"
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value
              )
            }
            size="small"
            sx={{
              minWidth: 140,
            }}
          >
            <MenuItem value="">
              All Status
            </MenuItem>

            <MenuItem value="active">
              Active
            </MenuItem>

            <MenuItem value="inactive">
              Inactive
            </MenuItem>
          </TextField>
        </Stack>
      </Paper>

      {/* TABLE */}
      <Paper
        sx={{
          p: 2,
          width: "100%",
          overflow: "hidden",
        }}
      >
        {users.length ? (
          <Box
            sx={{
              width: "100%",
              overflowX: "auto",
            }}
          >
            <Box
              sx={{
                minWidth: 900,
                height: 520,
              }}
            >
              <DataGrid
                rows={filteredUsers}
                columns={columns}
                getRowId={(row) =>
                  row._id
                }
                loading={loading}
                disableRowSelectionOnClick
                pageSizeOptions={[
                  5,
                  10,
                ]}
                initialState={{
                  pagination: {
                    paginationModel:
                    {
                      pageSize: 5,
                      page: 0,
                    },
                  },
                }}
                sx={{
                  border: "none",

                  "& .MuiDataGrid-columnHeaders":
                  {
                    backgroundColor:
                      "#f4f4f5",
                  },

                  "& .MuiDataGrid-columnHeaderTitle":
                  {
                    fontWeight: 600,
                    fontSize: "14px",
                  },

                  "& .MuiDataGrid-cell":
                  {
                    fontSize: "14px",
                  },

                  "& .MuiDataGrid-cell, & .MuiDataGrid-columnHeader":
                  {
                    outline: "none",
                  },
                }}
              />
            </Box>
          </Box>
        ) : (
          <Alert severity="info">
            No users found.
          </Alert>
        )}
      </Paper>

      {/* MODAL */}
      <Dialog
        open={modal.open}
        onClose={closeModal}
        fullWidth
        fullScreen={isMobile}
        maxWidth="md"
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
        >
          <DialogTitle>
            {modal.id
              ? "Edit User"
              : "Add User"}
          </DialogTitle>

          <DialogContent dividers>
            <Stack
              spacing={2}
              sx={{ pt: 1 }}
            >
              <Stack
                direction={{
                  xs: "column",
                  sm: "row",
                }}
                spacing={2}
              >
                <TextField
                  {...fieldProps(
                    "firstName",
                    "First Name"
                  )}
                />

                <TextField
                  {...fieldProps(
                    "lastName",
                    "Last Name"
                  )}
                />
              </Stack>

              <Stack
                direction={{
                  xs: "column",
                  sm: "row",
                }}
                spacing={2}
              >
                <TextField
                  {...fieldProps(
                    "age",
                    "Age"
                  )}
                />

                <TextField
                  {...fieldProps(
                    "gender",
                    "Gender",
                    {
                      select: true,
                    }
                  )}
                >
                  {genders.map(
                    (gender) => (
                      <MenuItem
                        key={gender}
                        value={gender}
                      >
                        {labelize(
                          gender
                        )}
                      </MenuItem>
                    )
                  )}
                </TextField>
              </Stack>

              <TextField
                {...fieldProps(
                  "contactNumber",
                  "Contact Number"
                )}
              />

              <TextField
                {...fieldProps(
                  "email",
                  "Email Address"
                )}
              />

              <Stack
                direction={{
                  xs: "column",
                  sm: "row",
                }}
                spacing={2}
              >
                <TextField
                  {...fieldProps(
                    "type",
                    "Role",
                    {
                      select: true,
                    }
                  )}
                >
                  {roles.map((role) => (
                    <MenuItem
                      key={role}
                      value={role}
                    >
                      {labelize(role)}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  {...fieldProps(
                    "username",
                    "Username"
                  )}
                />
              </Stack>

              <TextField
                {...fieldProps(
                  "password",
                  "Password",
                  {
                    type:
                      showPassword
                        ? "text"
                        : "password",

                    InputProps: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              setShowPassword(
                                (
                                  prev
                                ) =>
                                  !prev
                              )
                            }
                          >
                            {showPassword
                              ? <VisibilityOff />
                              : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }
                )}
              />

              <TextField
                {...fieldProps(
                  "address",
                  "Address",
                  {
                    multiline: true,
                    rows: 3,
                  }
                )}
              />

              <FormControlLabel
                control={
                  <Switch
                    name="isActive"
                    checked={
                      form.isActive
                    }
                    onChange={
                      handleChange
                    }
                  />
                }
                label={
                  form.isActive
                    ? "Active"
                    : "Inactive"
                }
              />
            </Stack>
          </DialogContent>

          <DialogActions>
            <Button
              onClick={closeModal}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="contained"
            >
              {modal.id
                ? "Update User"
                : "Save User"}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );

};

export default UsersPage;
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
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";
import {
  fetchArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} from "../../services/ArticleService";

const blankForm = {
  title: "",
  author: "",
  category: "",
  content: "",
  image: "",
  status: "draft",
};

const DashArticleListPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState({
    open: false,
    id: null,
  });

  const [form, setForm] = useState(blankForm);
  const [errors, setErrors] = useState({});

  // LOAD ARTICLES
  const loadArticles = async () => {
    try {
      setLoading(true);

      const { data } = await fetchArticles();

      setArticles(data || []);
    } catch (error) {
      console.error("Error loading articles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  // SEARCH FILTER
  const filteredArticles = useMemo(() => {
    const q = search.trim().toLowerCase();

    return articles.filter(
      (article) =>
        !q ||
        article.title?.toLowerCase().includes(q) ||
        article.author?.toLowerCase().includes(q) ||
        article.category?.toLowerCase().includes(q),
    );
  }, [articles, search]);

  // OPEN MODAL
  const openModal = (article = null) => {
    setModal({
      open: true,
      id: article?._id ?? null,
    });

    setForm(
      article
        ? {
            ...article,
          }
        : {
            ...blankForm,
          },
    );

    setErrors({});
  };

  // CLOSE MODAL
  const closeModal = () => {
    setModal({
      open: false,
      id: null,
    });

    setForm(blankForm);

    setErrors({});
  };

  // HANDLE CHANGE
  const handleChange = ({ target: { name, value } }) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // VALIDATE
  const validate = () => {
    const nextErrors = {};

    ["title", "author", "category", "content"].forEach((field) => {
      if (!String(form[field]).trim()) {
        nextErrors[field] =
          `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`;
      }
    });

    return nextErrors;
  };

  // SAVE ARTICLE
  const handleSubmit = async (e) => {
    e.preventDefault();

    const nextErrors = validate();

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);

      return;
    }

    try {
      const nextArticle = {
        title: form.title.trim(),
        author: form.author.trim(),
        category: form.category.trim(),
        content: form.content.trim(),
        image: form.image.trim(),
        status: form.status,
      };

      if (modal.id) {
        await updateArticle(modal.id, nextArticle);
      } else {
        await createArticle(nextArticle);
      }

      await loadArticles();

      closeModal();
    } catch (error) {
      console.error("Error saving article:", error);
    }
  };

  // DELETE ARTICLE
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this article?",
    );

    if (!confirmDelete) return;

    try {
      await deleteArticle(id);

      await loadArticles();
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  // TABLE COLUMNS
  const columns = [
    {
      field: "title",
      headerName: "Title",
      flex: 1.5,
      minWidth: 220,
    },

    {
      field: "author",
      headerName: "Author",
      flex: 1,
      minWidth: 160,
    },

    {
      field: "category",
      headerName: "Category",
      flex: 1,
      minWidth: 140,
    },

    {
      field: "status",
      headerName: "Status",
      width: 140,

      renderCell: (params) => (
        <Chip
          size="small"
          label={params.row.status === "published" ? "Published" : "Draft"}
          color={params.row.status === "published" ? "success" : "default"}
        />
      ),
    },

    {
      field: "actions",
      headerName: "Actions",
      minWidth: 240,
      sortable: false,
      filterable: false,

      renderCell: (params) => (
        <Stack direction="row" spacing={1} sx={{ py: 0.5 }}>
          <Button
            size="small"
            variant="contained"
            onClick={() => openModal(params.row)}
          >
            Edit
          </Button>

          <Button
            size="small"
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => handleDelete(params.row._id)}
          >
            Delete
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      {/* HEADER */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 3 }}
      >
        <Typography variant="h4" fontWeight="bold">
          Articles
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddCircleIcon />}
          onClick={() => openModal()}
        >
          Add Article
        </Button>
      </Stack>

      {/* SEARCH */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <TextField
          fullWidth
          placeholder="Search articles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      {/* TABLE */}
      <Paper sx={{ p: 2 }}>
        {articles.length ? (
          <Box
            sx={{
              height: 550,
              width: "100%",
            }}
          >
            <DataGrid
              rows={filteredArticles}
              columns={columns}
              getRowId={(row) => row._id}
              loading={loading}
              disableRowSelectionOnClick
              pageSizeOptions={[5, 10, 20]}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                    page: 0,
                  },
                },
              }}
            />
          </Box>
        ) : (
          <Alert severity="info">No articles found.</Alert>
        )}
      </Paper>

      {/* MODAL */}
      <Dialog open={modal.open} onClose={closeModal} fullWidth maxWidth="md">
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle>{modal.id ? "Edit Article" : "Add Article"}</DialogTitle>

          <DialogContent dividers>
            <Stack spacing={2} sx={{ pt: 1 }}>
              <TextField
                label="Title"
                name="title"
                value={form.title}
                onChange={handleChange}
                error={Boolean(errors.title)}
                helperText={errors.title}
                fullWidth
              />

              <TextField
                label="Author"
                name="author"
                value={form.author}
                onChange={handleChange}
                error={Boolean(errors.author)}
                helperText={errors.author}
                fullWidth
              />

              <TextField
                label="Category"
                name="category"
                value={form.category}
                onChange={handleChange}
                error={Boolean(errors.category)}
                helperText={errors.category}
                fullWidth
              />

              <TextField
                multiline
                rows={6}
                label="Content"
                name="content"
                value={form.content}
                onChange={handleChange}
                error={Boolean(errors.content)}
                helperText={errors.content}
                fullWidth
              />

              <TextField
                select
                label="Status"
                name="status"
                value={form.status}
                onChange={handleChange}
                fullWidth
              >
                <MenuItem value="draft">Draft</MenuItem>

                <MenuItem value="published">Published</MenuItem>
              </TextField>
            </Stack>
          </DialogContent>

          <DialogActions sx={{ p: 2 }}>
            <Button onClick={closeModal}>Cancel</Button>

            <Button type="submit" variant="contained">
              {modal.id ? "Save Changes" : "Add Article"}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default DashArticleListPage;
import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

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

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [modal, setModal] = useState({
    open: false,
    id: null,
  });

  const [form, setForm] = useState(blankForm);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      setLoading(true);

      const { data } = await fetchArticles();

      setArticles(data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredArticles = useMemo(() => {
    const q = search.toLowerCase();

    return articles.filter((article) => {
      const matchesSearch =
        article.title?.toLowerCase().includes(q) ||
        article.author?.toLowerCase().includes(q) ||
        article.category?.toLowerCase().includes(q);

      const matchesStatus =
        statusFilter === "" ? true : article.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [articles, search, statusFilter]);

  const openModal = (article = null) => {
    setModal({
      open: true,
      id: article?._id || null,
    });

    setForm(
      article
        ? {
            ...blankForm,
            ...article,
          }
        : blankForm,
    );
  };

  const closeModal = () => {
    setModal({
      open: false,
      id: null,
    });

    setForm(blankForm);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        title: form.title,
        author: form.author,
        category: form.category,
        content: form.content,
        image: form.image,
        status: form.status,
      };

      if (modal.id) {
        await updateArticle(modal.id, payload);
      } else {
        await createArticle(payload);
      }

      await loadArticles();

      closeModal();
    } catch (error) {
      console.error("Error saving article:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this article?");

    if (!confirmed) return;

    try {
      await deleteArticle(id);

      await loadArticles();
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  const columns = [
    {
      field: "image",
      headerName: "Image",
      width: 120,

      renderCell: (params) => (
        <img
          src={
            params.row.image ||
            "https://via.placeholder.com/100x60?text=No+Image"
          }
          alt="Article"
          style={{
            width: 70,
            height: 45,
            objectFit: "cover",
            borderRadius: 8,
            marginTop: 8,
          }}
        />
      ),
    },

    {
      field: "title",
      headerName: "Title",
      flex: 1,
      minWidth: 220,
    },

    {
      field: "author",
      headerName: "Author",
      width: 160,
    },

    {
      field: "category",
      headerName: "Category",
      width: 160,
    },

    {
      field: "preview",
      headerName: "Preview",
      flex: 1,
      minWidth: 250,

      valueGetter: (_, row) => row.content?.slice(0, 80) + "...",
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
      width: 220,
      sortable: false,

      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => openModal(params.row)}
          >
            Edit
          </Button>

          <Button
            size="small"
            color="error"
            onClick={() => handleDelete(params.row._id)}
          >
            Delete
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        overflowX: "hidden",
      }}
    >
      <Box
        sx={{
          mb: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">Articles</Typography>

        <Button variant="contained" onClick={() => openModal()}>
          Add Article
        </Button>
      </Box>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Stack direction="row" spacing={2}>
          <TextField
            placeholder="Search Articles"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            fullWidth
          />

          <TextField
            select
            label="Status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            sx={{ width: 200 }}
          >
            <MenuItem value="">All Statuses</MenuItem>

            <MenuItem value="published">Published</MenuItem>

            <MenuItem value="draft">Draft</MenuItem>
          </TextField>
        </Stack>
      </Paper>

      <Paper sx={{ p: 2 }}>
        {articles.length ? (
          <Box
            sx={{
              width: "100%",
              overflowX: "auto",
            }}
          >
            <DataGrid
              autoHeight
              rows={filteredArticles}
              columns={columns}
              loading={loading}
              getRowId={(row) => row._id}
              pageSizeOptions={[5, 10]}
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

      <Dialog open={modal.open} onClose={closeModal} fullWidth maxWidth="md">
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle>{modal.id ? "Edit Article" : "Add Article"}</DialogTitle>

          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <TextField
                name="title"
                label="Title"
                value={form.title}
                onChange={handleChange}
                fullWidth
              />

              <TextField
                name="author"
                label="Author"
                value={form.author}
                onChange={handleChange}
                fullWidth
              />

              <TextField
                name="category"
                label="Category"
                value={form.category}
                onChange={handleChange}
                fullWidth
              />

              <TextField
                name="image"
                label="Image URL"
                value={form.image}
                onChange={handleChange}
                fullWidth
              />

              <TextField
                name="content"
                label="Content"
                value={form.content}
                onChange={handleChange}
                multiline
                rows={6}
                fullWidth
              />

              <TextField
                select
                name="status"
                label="Status"
                value={form.status}
                onChange={handleChange}
                fullWidth
              >
                <MenuItem value="draft">Draft</MenuItem>

                <MenuItem value="published">Published</MenuItem>
              </TextField>
            </Stack>
          </DialogContent>

          <DialogActions>
            <Button onClick={closeModal}>Cancel</Button>

            <Button type="submit" variant="contained">
              Save
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default ArticlesPage;

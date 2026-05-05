import React from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Stack,
  Card,
  CardContent,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { BarChart, PieChart, Gauge } from "@mui/x-charts";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix marker
const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

const position = [14.604253, 120.994314];

// TABLE
const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "firstName", headerName: "First name", width: 150 },
  { field: "lastName", headerName: "Last name", width: 150 },
  { field: "age", headerName: "Age", type: "number", width: 110 },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 14 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
  { id: 3, lastName: "Stark", firstName: "Arya", age: 11 },
];

function DashboardPage() {
  const location = useLocation();

  const avgAge =
    rows.reduce((sum, r) => sum + (r.age || 0), 0) / rows.length;

  return (
    <Box className="flex w-full flex-col gap-6">

      {/* HEADER */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6">
        <Typography className="text-3xl font-bold text-zinc-900">
          Dashboard Overview
        </Typography>
      </section>

      {/* SUMMARY */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6">
        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
          {[ 
            { label: "Users", value: rows.length },
            { label: "Average Age", value: avgAge.toFixed(1) },
          ].map((item, i) => (
            <Card
              key={i}
              sx={{
                borderRadius: "1.5rem",
                border: "2px solid #18181b",
                backgroundColor: "#f4f4f5",
                boxShadow: "none",
                flex: 1,
              }}
            >
              <CardContent>
                <Typography className="text-sm uppercase tracking-widest text-zinc-500">
                  {item.label}
                </Typography>
                <Typography className="text-2xl font-bold text-zinc-900">
                  {item.value}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </section>

      {/* CHARTS */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6">
        <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
          <Box
            className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4"
            sx={{ flex: 1 }}
          >
            <Typography className="mb-3 font-semibold text-zinc-900">
              Quarterly Data
            </Typography>
            <BarChart
              height={250}
              series={[{ data: [10, 20, 30, 40] }]}
              xAxis={[
                { data: ["Q1", "Q2", "Q3", "Q4"], scaleType: "band" },
              ]}
            />
          </Box>

          <Box
            className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4"
            sx={{ width: 300 }}
          >
            <Typography className="mb-3 font-semibold text-zinc-900">
              Distribution
            </Typography>
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: 10, label: "A" },
                    { id: 1, value: 20, label: "B" },
                  ],
                },
              ]}
              height={200}
            />
          </Box>
        </Stack>
      </section>

      {/* TABLE */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6">
        <Typography className="mb-4 text-xl font-semibold text-zinc-900">
          Users Overview
        </Typography>

        <Box
          sx={{
            height: 400,
            borderRadius: "1.5rem",
            border: "2px solid #18181b",
            overflow: "hidden",
            backgroundColor: "#f4f4f5",
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            pageSizeOptions={[5]}
            sx={{
              border: "none",
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#e4e4e7",
              },
            }}
          />
        </Box>
      </section>

      {/* MAP */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6">
        <Typography className="mb-4 text-xl font-semibold text-zinc-900">
          Location Map
        </Typography>

        <Box className="h-[400px] w-full overflow-hidden rounded-3xl border-2 border-zinc-900">
          <MapContainer
            center={position}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={position}>
              <Popup>NU Manila</Popup>
            </Marker>
          </MapContainer>
        </Box>
      </section>
    </Box>
  );
}

export default DashboardPage;
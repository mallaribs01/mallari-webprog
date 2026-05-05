import React from "react";
import { Typography, Box, Stack } from "@mui/material";
import { BarChart, PieChart } from "@mui/x-charts";

function ReportsPage() {
  return (
    <Box className="flex w-full flex-col gap-6">

      {/* HEADER */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6">
        <Typography className="text-3xl font-bold text-zinc-900">
          Reports & Analytics
        </Typography>
      </section>

      {/* SUMMARY */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6">
        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
          {[
            { label: "Monthly Sales", value: "₱120,000" },
            { label: "New Users", value: "320" },
          ].map((item, i) => (
            <Box
              key={i}
              className="flex-1 rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5"
            >
              <p className="text-[11px] uppercase tracking-[0.24em] text-zinc-500">
                {item.label}
              </p>
              <p className="mt-2 text-2xl font-bold text-zinc-900">
                {item.value}
              </p>
            </Box>
          ))}
        </Stack>
      </section>

      {/* CHARTS */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6">
        <Stack direction={{ xs: "column", md: "row" }} spacing={3}>

          <Box className="flex-1 rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <Typography className="mb-3 font-semibold text-zinc-900">
              Revenue Trend
            </Typography>
            <BarChart
              height={250}
              series={[{ data: [12000, 15000, 18000, 20000] }]}
              xAxis={[
                { data: ["Jan", "Feb", "Mar", "Apr"], scaleType: "band" },
              ]}
            />
          </Box>

          <Box className="w-full md:w-[300px] rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <Typography className="mb-3 font-semibold text-zinc-900">
              Device Usage
            </Typography>
            <PieChart
              height={220}
              series={[
                {
                  data: [
                    { id: 0, value: 40, label: "Mobile" },
                    { id: 1, value: 35, label: "Desktop" },
                    { id: 2, value: 25, label: "Tablet" },
                  ],
                },
              ]}
            />
          </Box>

        </Stack>
      </section>
    </Box>
  );
}

export default ReportsPage;
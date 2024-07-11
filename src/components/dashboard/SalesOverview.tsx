import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import DashboardCard from "../../../src/components/shared/DashboardCard";
import dynamic from "next/dynamic";
import axios from "axios";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface PendapatanProps {
  date: string;
  gross_amount: number;
}

const SalesOverview = () => {
  const [pendapatan, setPendapatan] = useState<PendapatanProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/chart/pendapatanmingguan`
      );
      setPendapatan(response.data.data || []); // Ensure data is an array
    } catch (err) {
      setError("Error fetching data");
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;

  // Chart options
  const optionscolumnchart: any = {
    chart: {
      type: "bar",
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: "#adb0bb",
      toolbar: {
        show: true,
      },
      height: 370,
    },
    colors: [primary, secondary],
    plotOptions: {
      bar: {
        horizontal: false,
        barHeight: "60%",
        columnWidth: "42%",
        borderRadius: [6],
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "all",
      },
    },
    stroke: {
      show: true,
      width: 5,
      lineCap: "butt",
      colors: ["transparent"],
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    grid: {
      borderColor: "rgba(0,0,0,0.1)",
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    yaxis: {
      tickAmount: 4,
    },
    xaxis: {
      categories: pendapatan.map((item) => item.date) || [],
      axisBorder: {
        show: false,
      },
    },
    tooltip: {
      theme: theme.palette.mode === "dark" ? "dark" : "light",
      fillSeriesColor: false,
    },
  };

  const seriescolumnchart: any = [
    {
      name: "Pendapatan Harian",
      data: pendapatan.map((item) => item.gross_amount) || [],
    },
  ];

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <DashboardCard title="Pendapatan Harian">
      {pendapatan.length > 0 ? (
        <Chart
          options={optionscolumnchart}
          series={seriescolumnchart}
          type="bar"
          height="370px"
        />
      ) : (
        <p>No data available for the selected period.</p>
      )}
    </DashboardCard>
  );
};

export default SalesOverview;

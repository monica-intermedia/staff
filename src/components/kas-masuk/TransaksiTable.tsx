import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  TextField,
} from "@mui/material";
import DashboardCard from "../shared/DashboardCard";
import dayjs from "dayjs";
import axios from "axios";
import { HiCheck } from "react-icons/hi";

const TransaksiTable = (): any => {
  interface KoranProps {
    halaman: number;
    warna: number;
    plate: number;
    harga: number;
  }
  interface Pembelian {
    id: string;
    namaKoran: string;
    eksemplar: number;
    gross_amount: number;
    statusCetak: string;
    tanggal: Date;
    koran: KoranProps;
  }

  const [transaksi, setTransaksi] = useState<Pembelian[]>([]);

  const fetchData = async () => {
    const response = await axios.get(
      "http://localhost:8080/penjualan/transaksistatus"
    );
    setTransaksi(response.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const statusDisplay = (status: string) => {
    if (status === "belum-dicetak") {
      return "error";
    } else {
      return "success";
    }
  };

  const deleteItem = async (id: string) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this item?"
      );
      if (confirmed) {
        await axios.delete(`http://localhost:8080/penjualan/transaksi/${id}`);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const checklist = async (id: string) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to update this item?"
      );
      if (confirmed) {
        await axios.put(`http://localhost:8080/penjualan/transaksi/${id}`, {
          statusCetak: "sudah-dicetak",
          isValid: true,
        });
        fetchData();
      }
    } catch (error) {
      console.error("Error updating item:", error);
      window.alert("Failed to update item");
    }
  };

  return (
    <DashboardCard title="Tabel Transaksi">
      <Box sx={{ overflow: "auto", width: { xs: "280px", sm: "auto" } }}>
        <Box>
          <Box>
            <br />
            <form>
              <TextField
                id="search-bar"
                label="Masukkan nama barang"
                variant="outlined"
                placeholder="Search..."
                size="small"
                sx={{ width: 1 / 3 }}
              />
            </form>
          </Box>
        </Box>
        <Table aria-label="simple table" sx={{ whiteSpace: "nowrap", mt: 2 }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  No.
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Nama Koran
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Jumlah Halaman
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="subtitle2" fontWeight={600}>
                  Jumlah Warna
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="subtitle2" fontWeight={600}>
                  Jumlah Plate
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="subtitle2" fontWeight={600}>
                  Harga
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="subtitle2" fontWeight={600}>
                  Total Harga
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="subtitle2" fontWeight={600}>
                  Tanggal
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="subtitle2" fontWeight={600}>
                  Status
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="subtitle2" fontWeight={600}>
                  Action
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(transaksi) && transaksi.length > 0 ? (
              transaksi.map((option, index) => (
                <TableRow key={option.id}>
                  <TableCell>
                    <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                      {index + 1}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" sx={{ fontSize: "13px" }}>
                      {option.namaKoran}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" sx={{ fontSize: "13px" }}>
                      {option.koran.halaman}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      fontWeight={400}
                    >
                      {option.koran.warna}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      fontWeight={400}
                    >
                      {option.koran.plate}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      fontWeight={400}
                    >
                      {option.koran.harga}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      fontWeight={400}
                    >
                      {option.gross_amount}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      fontWeight={400}
                    >
                      {dayjs(option.tanggal).format("DD-MM-YYYY")}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="subtitle2" fontWeight={400}>
                      <span
                        style={{
                          backgroundColor:
                            statusDisplay(option.statusCetak) === "error"
                              ? "#f44336"
                              : "#4caf50",
                          padding: "6px 8px",
                          borderRadius: "4px",
                          color: "#fff",
                        }}
                      >
                        {option.statusCetak}
                      </span>
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => checklist(option.id)}
                      sx={{ borderRadius: "16px" }}
                    >
                      <HiCheck />
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => deleteItem(option.id)}
                      sx={{ borderRadius: "16px", ml: 1 }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10} align="center">
                  <Typography variant="subtitle1">No data available</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>
    </DashboardCard>
  );
};

export default TransaksiTable;

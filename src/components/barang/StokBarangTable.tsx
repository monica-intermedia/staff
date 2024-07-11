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
import axios from "axios";

const StokBarangTable = (): any => {
  interface BarangProps {
    id: string;
    namaBarang: string;
    harga: number;
    stok: number;
  }

  const [barang, setBarang] = useState<BarangProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:8080/barang/barang");
      setBarang(response.data.data);
    };
    fetchData();
  }, []);

  const deleteItem = async (id: string) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this item?"
      );
      if (confirmed) {
        await axios.delete(`http://localhost:8080/barang/barang/${id}`);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <DashboardCard title="Tabel Pembelian Lainya">
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
                  Nama Barang
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Harga
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Stok
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle2" fontWeight={600}>
                  Action
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(barang) && barang.length > 0 ? (
              barang.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                      {index + 1}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" sx={{ fontSize: "13px" }}>
                      {item.namaBarang}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography color="textSecondary" sx={{ fontSize: "13px" }}>
                      {item.harga}
                    </Typography>
                  </TableCell>

                  <TableCell align="right">
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      fontWeight={400}
                    >
                      {item.stok}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Button variant="outlined" sx={{ marginRight: "10px" }}>
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => deleteItem(item.id!)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">
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

export default StokBarangTable;

import React, { useState, useEffect } from "react";
import { IconPrinter } from "@tabler/icons-react";
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
import FormOtherSellModals from "../../modals/kas-masuk/FormOtherSellModals";

const OthersaleTable = (): any => {
  interface PenjualanProps {
    id: string;
    kodePenjualan: string;
    namaPenjualan: string;
    tanggal: Date;
    totalHarga: number;
    keterangan: string;
  }

  const [penjualanLainya, setPenjualanLainya] = useState<PenjualanProps[]>([]);

  const fetchData = async () => {
    const response = await axios.get(
      "http://localhost:8080/kasmasuk/penjualanlainya"
    );
    setPenjualanLainya(response.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(penjualanLainya);

  const deleteItem = async (id: string) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this item?"
      );
      if (confirmed) {
        await axios.delete(
          `http://localhost:8080/kasmasuk/penjualanlainya/${id}`
        );
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <DashboardCard title="Tabel Penjualan Lainya">
      <Box sx={{ overflow: "auto", width: { xs: "280px", sm: "auto" } }}>
        <Box>
          <Box display="flex">
            <FormOtherSellModals />
            <Button variant="contained" sx={{ px: 3, marginLeft: 2 }}>
              <IconPrinter />
            </Button>
          </Box>
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
                  Kode Penjualan
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Nama Penjualan
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Tanggal
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle2" fontWeight={600}>
                  Total Harga
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle2" fontWeight={600}>
                  Keterangan
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
            {Array.isArray(penjualanLainya) && penjualanLainya.length > 0 ? (
              penjualanLainya.map((option, index) => (
                <TableRow key={option.id}>
                  <TableCell>
                    <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                      {index + 1}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" sx={{ fontSize: "13px" }}>
                      {option.kodePenjualan}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography color="textSecondary" sx={{ fontSize: "13px" }}>
                      {option.namaPenjualan}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      fontWeight={400}
                    >
                      {dayjs(option.tanggal).format("DD-MM-YYYY")}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      fontWeight={400}
                    >
                      {option.totalHarga}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      fontWeight={400}
                    >
                      {option.keterangan}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Button variant="outlined" sx={{ marginRight: "10px" }}>
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => deleteItem(option.id!)}
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

export default OthersaleTable;

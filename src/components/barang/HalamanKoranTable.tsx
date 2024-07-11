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
import axios from "axios";
import FormDialogKoran from "../../modals/barang/FormDialogKoran";

const HalamanKoranTable = (): any => {
  interface KoranProps {
    id: string;
    keterangan: string;
    halaman: number;
    warna: number;
    plate: number;
    harga: number;
  }

  const [koran, setKoran] = useState<KoranProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:8080/koran");
      setKoran(response.data.data);
    };
    fetchData();
  }, []);

  const deleteItem = async (id: string) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this item?"
      );
      if (confirmed) {
        await axios.delete(`http://localhost:8080/koran/${id}`);
        window.location.replace("/barang/halaman-koran");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <DashboardCard title="Tabel Halaman Koran">
      <Box sx={{ overflow: "auto", width: { xs: "280px", sm: "auto" } }}>
        <Box>
          <Box display="flex">
            <FormDialogKoran />
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
                  Keterangan
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Halaman
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Warna
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Plate
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Harga
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Action
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(koran) && koran.length > 0 ? (
              koran.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                      {index + 1}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" sx={{ fontSize: "13px" }}>
                      {item.keterangan}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography color="textSecondary" sx={{ fontSize: "13px" }}>
                      {item.halaman}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      fontWeight={400}
                    >
                      {item.warna}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      fontWeight={400}
                    >
                      {item.plate}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      fontWeight={400}
                    >
                      {item.harga}
                    </Typography>
                  </TableCell>
                  <TableCell>
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

export default HalamanKoranTable;

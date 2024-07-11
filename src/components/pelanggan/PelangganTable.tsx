import React, { useState } from "react";
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
import { IconPrinter } from "@tabler/icons-react";
import DashboardCard from "../shared/DashboardCard";
import Link from "next/link";
import { useFetchData, handleDelete } from "../../action/actions";
import FormDialogPelanggan from "../../modals/pelanggan/FormDialogPelanggan";

interface SupplierProps {
  id: string;
  name: string;
  alamat: string;
  email: string;
  handphone: string;
}

const PelangganTable = (): React.ReactElement => {
  const [pelanggan, setPelanggan] = useState<SupplierProps[]>([]);

  useFetchData("http://localhost:8080/pelanggan/pelanggan", setPelanggan);

  return (
    <DashboardCard title="Tabel Pelanggan">
      <Box sx={{ overflow: "auto", width: { xs: "280px", sm: "auto" } }}>
        <Box>
          <Box display="flex">
            <FormDialogPelanggan />
            <Button
              variant="contained"
              style={{
                paddingRight: "20px",
                paddingLeft: "20px",
                marginLeft: "20px",
              }}
            >
              <IconPrinter />
            </Button>
          </Box>
          <Box>
            <br />
            <form>
              <TextField
                id="search-bar"
                className="text"
                label="masukan nama Pelanggan"
                variant="outlined"
                placeholder="Search..."
                size="small"
                sx={{ width: 1 / 3 }}
              />
            </form>
          </Box>
        </Box>
        <Table
          aria-label="simple table"
          sx={{
            whiteSpace: "nowrap",
            mt: 2,
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  No.
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Nama
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Alamat
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Email
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Handphone
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
            {pelanggan.map((options, index) => (
              <TableRow key={options.id}>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: "500",
                    }}
                  >
                    {index + 1}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography
                        variant="subtitle2"
                        fontWeight={600}
                      ></Typography>
                      <Typography
                        color="textSecondary"
                        sx={{
                          fontSize: "13px",
                        }}
                      >
                        {options.name}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: "500",
                    }}
                  >
                    {options.alamat}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: "500",
                    }}
                  >
                    {options.email}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: "500",
                    }}
                  >
                    {options.handphone}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Link
                    href={`/pegawai/jabatan/${options.id}`}
                    style={{ marginRight: "10px" }}
                  >
                    <Button variant="outlined">Edit</Button>
                  </Link>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() =>
                      handleDelete(
                        options.id!,
                        setPelanggan,
                        "http://localhost:8080/pelanggan/pelanggan"
                      )
                    }
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </DashboardCard>
  );
};

export default PelangganTable;

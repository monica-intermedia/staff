import { CardContent, Typography, Grid } from "@mui/material";
import { Stack } from "@mui/system";
import BlankCard from "../../../src/components/shared/BlankCard";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  HiMiniUserGroup,
  HiMiniTruck,
  HiCube,
  HiCurrencyDollar,
} from "react-icons/hi2";

const CardInfo = () => {
  interface PegawaiProps {
    data: number;
  }

  interface SupplierProps {
    data: number;
  }

  interface BarangProps {
    data: number;
  }
  interface TransaksiProps {
    data: number;
  }

  const [pegawai, setPegawai] = useState<PegawaiProps | null>(null);
  const [supplier, setSupplier] = useState<SupplierProps | null>(null);
  const [transaksi, setTransaksi] = useState<TransaksiProps | null>(null);
  const [barang, setBarang] = useState<BarangProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDataPegawai = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/chart/pegawai"
      );

      console.log(response);
      setPegawai(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch data");
      setLoading(false);
    }
  };

  const fetchDataSupplier = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/chart/supplier"
      );

      console.log(response);
      setSupplier(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch data");
      setLoading(false);
    }
  };

  const fetchDataBarang = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/chart/barang"
      );

      console.log(response);
      setBarang(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch data");
      setLoading(false);
    }
  };

  const fetchDataTransaksi = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/chart/transaksi"
      );

      console.log(response);
      setTransaksi(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataPegawai();
    fetchDataSupplier();
    fetchDataBarang();
    fetchDataTransaksi();
  }, []);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4} lg={3} mb={7}>
        <BlankCard>
          <CardContent sx={{ p: 3, pt: 2 }}>
            <Typography variant="h6">Pegawai</Typography>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mt={1}
            >
              <Stack direction="row" alignItems="center">
                <Typography variant="h6">
                  <HiMiniUserGroup size={70} />
                </Typography>
                <Typography color="textSecondary" fontSize={20} ml={4}>
                  {pegawai ? `${pegawai.data} orang` : "No data available"}
                </Typography>
              </Stack>
            </Stack>
          </CardContent>
        </BlankCard>
      </Grid>

      {/* supplier */}
      <Grid item xs={12} md={4} lg={3}>
        <BlankCard>
          <CardContent sx={{ p: 3, pt: 2 }}>
            <Typography variant="h6">Supplier</Typography>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mt={1}
            >
              <Stack direction="row" alignItems="center">
                <Typography variant="h6">
                  <HiMiniTruck size={70} />
                </Typography>
                <Typography color="textSecondary" fontSize={20} ml={2}>
                  {supplier ? `${supplier.data} Supplier` : "No data available"}
                </Typography>
              </Stack>
            </Stack>
          </CardContent>
        </BlankCard>
      </Grid>

      {/* Barang */}
      <Grid item xs={12} md={4} lg={3}>
        <BlankCard>
          <CardContent sx={{ p: 3, pt: 2 }}>
            <Typography variant="h6">Barang</Typography>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mt={1}
            >
              <Stack direction="row" alignItems="center">
                <Typography variant="h6">
                  <HiCube size={70} />
                </Typography>
                <Typography color="textSecondary" fontSize={20} ml={2}>
                  {barang ? `${barang.data} Barang` : "No data available"}
                </Typography>
              </Stack>
            </Stack>
          </CardContent>
        </BlankCard>
      </Grid>

      {/* transaksi */}
      <Grid item xs={12} md={4} lg={3}>
        <BlankCard>
          <CardContent sx={{ p: 3, pt: 2 }}>
            <Typography variant="h6">Transaksi</Typography>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mt={1}
            >
              <Stack direction="row" alignItems="center">
                <Typography variant="h6">
                  <HiCurrencyDollar size={70} />
                </Typography>
                <Typography color="textSecondary" fontSize={20} ml={2}>
                  {transaksi
                    ? `${transaksi.data} Transaksi`
                    : "No data available"}
                </Typography>
              </Stack>
            </Stack>
          </CardContent>
        </BlankCard>
      </Grid>
    </Grid>
  );
};

export default CardInfo;

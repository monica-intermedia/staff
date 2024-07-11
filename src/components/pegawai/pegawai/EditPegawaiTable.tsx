"use client";

import React, { useEffect, useState } from "react";
import DashboardCard from "../../shared/DashboardCard";
import {
  Box,
  FormControl,
  InputLabel,
  Input,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";

type Jabatan = {
  jabatanId: string;
  jabatan: string;
};

type Pegawai = {
  pegawaiId?: string;
  nip: string | null;
  Name: string;
  alamat: string;
  email: string;
  handphone: string;
  jabatanId: string;
};

const EditPegawaiTable = (): React.ReactElement => {
  const [pegawai, setPegawai] = useState<Pegawai>();
  const [jabatan, setJabatan] = useState<Jabatan[]>([]);
  const router = useRouter();
  const { id } = router.query;

  // Fetch pegawai data
  useEffect(() => {
    const fetchPegawaiData = async () => {
      if (id) {
        try {
          const response = await axios.get(
            `http://localhost:8080/pegawai/pegawai/${id}`
          );
          setPegawai(response.data.data);
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      }
    };
    fetchPegawaiData();
  }, [id]);

  // Fetch jabatan data
  useEffect(() => {
    const fetchJabatanData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/pegawai/jabatan`
        );
        setJabatan(response.data.data);
      } catch (error) {
        console.error("Fail to get jabatan data: ", error);
      }
    };
    fetchJabatanData();
  }, []);

  // Handle input changes
  const handleEditPegawai = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPegawai((prevState) =>
      prevState ? { ...prevState, [name]: value } : undefined
    );
  };

  // Handle form submission
  const updateData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!pegawai) {
      console.error("Pegawai Undefined");
      return;
    }

    const requestingData = {
      nip: pegawai.nip,
      Name: pegawai.Name,
      alamat: pegawai.alamat,
      email: pegawai.email,
      handphone: pegawai.handphone,
      jabatanId: pegawai.jabatanId,
    };

    try {
      await axios
        .put(`http://localhost:8080/pegawai/pegawai/${id}`, requestingData)
        .then(() => {
          if (window.confirm("apakah anda yakin inin menubah ?")) {
            window.location.replace("/pegawai/data-pegawai");
          }
        });
    } catch (error) {
      console.error("Fail to update data: ", error);
    }
  };

  return (
    <DashboardCard title="Tabel Edit Pegawai">
      <Box
        component="form"
        onSubmit={updateData}
        sx={{ overflow: "auto", width: { xs: "280px", sm: "auto" } }}
      >
        <Box display={"flex"} justifyContent={"space-between"}>
          <FormControl sx={{ width: "47%" }}>
            <InputLabel htmlFor="nip-input">Masukan NIP</InputLabel>
            <Input
              id="nip-input"
              name="nip"
              aria-describedby="nip-helper"
              type="number"
              value={pegawai?.nip || ""}
              onChange={handleEditPegawai}
              required
            />
          </FormControl>
          <FormControl sx={{ width: "47%" }}>
            <InputLabel htmlFor="alamat-input">Masukan Alamat</InputLabel>
            <Input
              id="alamat-input"
              name="alamat"
              aria-describedby="alamat-helper"
              type="text"
              value={pegawai?.alamat || ""}
              onChange={handleEditPegawai}
              required
            />
          </FormControl>
        </Box>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          sx={{ marginTop: "20px" }}
        >
          <FormControl sx={{ width: "47%" }}>
            <InputLabel htmlFor="name-input">Masukan Nama</InputLabel>
            <Input
              id="name-input"
              name="Name"
              aria-describedby="name-helper"
              type="text"
              value={pegawai?.Name || ""}
              onChange={handleEditPegawai}
              required
            />
          </FormControl>
          <FormControl sx={{ width: "47%" }}>
            <InputLabel htmlFor="email-input">Masukan Email</InputLabel>
            <Input
              id="email-input"
              name="email"
              aria-describedby="email-helper"
              type="email"
              value={pegawai?.email || ""}
              onChange={handleEditPegawai}
              required
            />
          </FormControl>
        </Box>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          sx={{ marginTop: "20px" }}
        >
          <FormControl sx={{ width: "47%" }}>
            <InputLabel htmlFor="handphone-input">
              Masukan Nomor Handphone
            </InputLabel>
            <Input
              id="handphone-input"
              name="handphone"
              aria-describedby="handphone-helper"
              type="number"
              value={pegawai?.handphone || ""}
              onChange={handleEditPegawai}
              required
            />
          </FormControl>
          <FormControl sx={{ width: "47%" }}>
            <TextField
              id="jabatanId-select"
              select
              name="jabatanId"
              label="Select Jabatan"
              helperText="Please select your Jabatan"
              variant="standard"
              onChange={handleEditPegawai}
              value={pegawai?.jabatanId || ""}
            >
              {jabatan.length > 0 ? (
                jabatan.map((option) => (
                  <MenuItem key={option.jabatanId} value={option.jabatanId}>
                    {option.jabatan}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
              )}
            </TextField>
          </FormControl>
        </Box>
        <Box sx={{ marginTop: "20px", textAlign: "right" }}>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Box>
      </Box>
    </DashboardCard>
  );
};

export default EditPegawaiTable;

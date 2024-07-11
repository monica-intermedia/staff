"use client";

import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import DashboardCard from "../../shared/DashboardCard";
import { Box, TextField, Button } from "@mui/material";
import Link from "next/link";

type Jabatan = {
  jabatanId?: string;
  jabatan?: string | null;
};

const EditPositionTable = (): any => {
  const router = useRouter();
  const { id } = router.query;
  const [jabatan, setJabatan] = useState<Jabatan | null>(null);

  const handleJabatanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJabatan({ ...jabatan, jabatan: e.target.value });
  };

  const updateData = async () => {
    if (jabatan && jabatan.jabatan !== null) {
      // memeriksa apakah jabatan null atau tidackkkkkkk
      const requestingData = {
        jabatan: jabatan.jabatan,
      };
      await axios({
        method: "PUT",
        url: `http://localhost:8080/pegawai/jabatan/${id}`,
        data: requestingData,
      })
        .then(() => {
          if (window.confirm("apakah kamu yakin mengubah ini ?")) {
            window.location.href = "/pegawai/jabatan";
          }
        })
        .catch((error) => {
          console.error("Error updating data:", error);
        });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const response = await axios({
            method: "GET",
            url: `http://localhost:8080/pegawai/jabatan/${id}`,
          });
          setJabatan(response.data.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
    fetchData();
  }, [id]);

  return (
    <DashboardCard title="Tabel  Jabatan">
      <Box sx={{ overflow: "auto", width: { xs: "280px", sm: "auto" } }}>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-text-input"
            type="text"
            autoComplete="current-text"
            value={jabatan?.jabatan || ""}
            onChange={handleJabatanChange}
          />
          <Link href="#" passHref>
            <Button onClick={updateData} variant="outlined">
              Submit
            </Button>
          </Link>
        </Box>
      </Box>
    </DashboardCard>
  );
};

export default EditPositionTable;

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import withAuth from "./src/middlewares/withAuth";

export function mainMiddleware(req: NextRequest) {
  const res = NextResponse.next();
  return res;
}

export default withAuth(mainMiddleware, [
  "/",
  "/kas-keluar/pembelian-barang",
  "/kas-keluar/gaji-karyawan",
  "/kas-keluar/pembelian-lainya",
  "/kas-masuk/transaksi",
  "/kas-masuk/data-transaksi",
  "/kas-masuk/penjualan-lainya",
  "/pegawai/data-pegawai",
  "/pegawai/jabatan",
  "/pegawai/absensi",
  "/barang/data-barang",
  "/barang/stok-barang",
  "/pelanggan/data-pelanggan",
  "/supplier/data-supplier",
]);

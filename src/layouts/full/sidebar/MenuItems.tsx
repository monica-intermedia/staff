import {
  IconLayoutDashboard,
  IconCalendar,
  IconCurrencyDollar,
  IconFolder,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  // dashboard
  {
    navlabel: true,
    subheader: "Home",
  },

  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/",
  },
  // Kas Masuk
  {
    navlabel: true,
    subheader: "Transaksi Masuk",
  },
  {
    id: uniqueId(),
    title: "Transaksi",
    icon: IconCurrencyDollar,
    href: "/kas-masuk/transaksi",
  },
  // Pegawai
  {
    navlabel: true,
    subheader: "Pegawai",
  },
  {
    id: uniqueId(),
    title: "Absensi",
    icon: IconCalendar,
    href: "/pegawai/absensi",
  },

  // Barang
  {
    navlabel: true,
    subheader: "Barang",
  },
  {
    id: uniqueId(),
    title: "Stok Barang",
    icon: IconFolder,
    href: "/barang/stok-barang",
  },
];

export default Menuitems;

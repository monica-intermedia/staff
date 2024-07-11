import React, { useEffect, useState } from "react";
import DashboardCard from "../../../src/components/shared/DashboardCard";
import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  timelineOppositeContentClasses,
} from "@mui/lab";
import axios from "axios";
import moment from "moment";

const RecentTransactions = () => {
  interface TransaksiProps {
    id: string;
    tanggal: string;
    namaKoran: string;
  }

  const [transaksi, setTransaksi] = useState<TransaksiProps[]>([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/chart/transaksihariini`
      );
      setTransaksi(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // console.log(transaksi);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DashboardCard title="Transaksi hari ini">
      <Timeline
        className="theme-timeline"
        nonce={undefined}
        onResize={undefined}
        onResizeCapture={undefined}
        sx={{
          p: 0,
          mb: "-40px",
          "& .MuiTimelineConnector-root": {
            width: "1px",
            backgroundColor: "#efefef",
          },
          [`& .${timelineOppositeContentClasses.root}`]: {
            flex: 0.5,
            paddingLeft: 0,
          },
        }}
      >
        {transaksi.map((item) => (
          <TimelineItem key={item.id}>
            <TimelineOppositeContent>
              {moment(item.tanggal).format("YYYY-MM-DD")}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="primary" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>{item.namaKoran}</TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </DashboardCard>
  );
};

export default RecentTransactions;

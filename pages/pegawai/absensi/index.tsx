import type { ReactElement } from "react";
import PageContainer from "../../../src/components/container/PageContainer";
import FullLayout from "../../../src/layouts/full/FullLayout";
import TransaksiTable from "../../../src/components/kas-masuk/TransaksiTable";

const Index = () => {
  return (
    <PageContainer title="pembelian barang" description="this is Sample page">
      <TransaksiTable />
    </PageContainer>
  );
};

export default Index;
Index.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};

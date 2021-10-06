import { useRouter } from "next/router";

import DefaultLayout from "@components/layout/DefaultLayout";

export default function BookingDetail() {
  const router = useRouter();
  const { uuid } = router.query;
  return (
    <DefaultLayout>
      <div className="prose">
        <h1>Buchungs-Details</h1>
      </div>
      {uuid}
    </DefaultLayout>
  );
}

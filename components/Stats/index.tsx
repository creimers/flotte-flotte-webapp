import { useStatsQueryQuery } from "generated/graphql";

import CarbonSavings from "./CarbonSavings";
import Usage from "./Usage";

export default function Stats() {
  const [{ data, fetching }] = useStatsQueryQuery();
  return (
    <div>
      <div className="mb-3">
        <Usage
          loading={fetching}
          users={data?.stats?.users || undefined}
          bookings={data?.stats?.bookings || undefined}
          kilometers={data?.stats?.kilometers || undefined}
        />
      </div>
      <div>
        <CarbonSavings
          loading={fetching}
          kilometers={data?.stats?.kilometers || undefined}
        />
      </div>
    </div>
  );
}

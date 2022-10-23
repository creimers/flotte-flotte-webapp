import * as React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useBikesQuery } from "generated/graphql";

import BackLink from "components/BackLink";
import DefaultLayout from "components/layout/DefaultLayout";

export default function BikeDetailPage() {
  const router = useRouter();
  const { slug } = router.query;

  const [{ data }] = useBikesQuery({ requestPolicy: "cache-first" });

  const bike = data?.bikes?.edges.find(e => e?.node?.slug === slug);

  return (
    <DefaultLayout>
      <BackLink href="/bikes" />
      {bike && (
        <div>
          <div className="prose">
            <h1>Flotte Flotte - {bike.node?.name}</h1>
            {bike.node?.model && (
              <>
                <h2>Model</h2>
                <p>{bike.node?.model}</p>
              </>
            )}
            {bike.node?.pickupStation?.locationCity && (
              <>
                <h2>Standort</h2>
                <p>{bike.node?.pickupStation?.locationCity}</p>
              </>
            )}
            {bike.node?.pickupStation?.terms && (
              <>
                <h2 id="terms">Nutzungsbedingungen</h2>
                <div
                  dangerouslySetInnerHTML={{
                    __html: bike.node?.pickupStation?.terms!,
                  }}
                ></div>
              </>
            )}
          </div>
          <div className="py-8">
            <Link href={`/bookings/new/?bike=${bike.node?.uuid}`}>
              <a className="px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
                Jetzt buchen
              </a>
            </Link>
          </div>
        </div>
      )}
      {data?.bikes && !bike && <div>Das Rad konnte nicht gefunden werden</div>}
    </DefaultLayout>
  );
}

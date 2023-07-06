import * as React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useBikesQuery, SocialMediaAccountNodeEdge } from "generated/graphql";

import BackLink from "components/BackLink";
import DefaultLayout from "components/layout/DefaultLayout";
import SocialMediaAccounts from "components/pages/bike-details/social-media-accounts";

export default function BikeDetailPage() {
  const router = useRouter();
  const { slug } = router.query;

  const [{ data }] = useBikesQuery({ requestPolicy: "cache-first" });

  const bike = data?.bikes?.edges.find(e => e?.node?.slug === slug);
  const socialMediaAccounts = bike?.node?.socialMediaAccounts.edges;

  return (
    <DefaultLayout>
      <BackLink href="/bikes" />
      <div className="h-4" />
      {bike && (
        <div>
          <div className="flex space-x-8 mb-8">
            {bike.node?.logoUrl && (
              <img
                className="w-32 float-left"
                src={bike.node?.logoUrl}
                alt={bike.node?.name}
              />
            )}
            <div className="flex-1 prose">
              <h1>Flotte Flotte - {bike.node?.name}</h1>
            </div>
          </div>
          {socialMediaAccounts && (
            <div>
              <SocialMediaAccounts
                socialMediaAccounts={
                  socialMediaAccounts as SocialMediaAccountNodeEdge[]
                }
              />
            </div>
          )}
          <div className="prose max-w-full w-full">
            <div>
              {bike.node?.model && (
                <>
                  <h2>Model</h2>
                  <p>{bike.node?.model}</p>
                </>
              )}
            </div>
            {bike.node?.images.edges && (
              <div className="grid grid-cols-4 gap-8">
                {bike.node?.images.edges.map((imageNode, i) => (
                  <div key={`image-${i}`} className="h-48 w-48">
                    <img
                      src={imageNode?.node?.imageUrl!}
                      className="object-cover h-48 w-auto"
                    />
                  </div>
                ))}
              </div>
            )}
            {bike.node?.statusNote && (
              <>
                <h2>Status</h2>
                <div className="bg-teal-50 py-2 px-4 rounded-md border-teal-600 border text-teal-600">
                  {bike.node.statusNote}
                </div>
              </>
            )}
            {bike.node?.pickupStation?.locationCity && (
              <>
                <h2>Standort</h2>
                <p>{bike.node?.pickupStation?.locationCity}</p>
              </>
            )}
            {bike.node?.sponsors.edges && (
              <>
                <h2>Sponsoren</h2>
                <div className="grid grid-cols-3 gap-8">
                  {bike.node?.sponsors.edges.map(sponsor => (
                    <div
                      key={sponsor?.node?.id}
                      className="h-full flex justify-center items-center"
                    >
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href={sponsor?.node?.url || "#"}
                      >
                        <img
                          src={sponsor?.node?.logoUrl || ""}
                          alt={sponsor?.node?.name}
                        />
                      </a>
                    </div>
                  ))}
                </div>
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

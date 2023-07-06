import * as React from "react";
import {
  SocialMediaAccountAccountType,
  SocialMediaAccountNodeEdge,
} from "generated/graphql";

import Facebook from "./facebook";
import Mastodon from "./mastodon";
import Instagram from "./instagram";
import Twitter from "./twitter";
import Website from "./website";

type Props = {
  socialMediaAccounts?: SocialMediaAccountNodeEdge[];
};

const iconMapping: {
  [k in SocialMediaAccountAccountType]: React.ReactNode;
} = {
  WEBSITE: <Website />,
  MASTODON: <Mastodon />,
  TWITTER: <Twitter />,
  INSTAGRAM: <Instagram />,
  FACEBOOK: <Facebook />,
};

export default function SocialMediaAccounts({ socialMediaAccounts }: Props) {
  console.log(socialMediaAccounts);
  return (
    <div className="flex items-center space-x-4">
      {socialMediaAccounts?.map((edge, i) => (
        <div key={`sm-${i}`}>
          <a
            href={edge?.node?.url}
            title={edge?.node?.url}
            target="_blank"
            rel="noreferrer"
          >
            <div className="h-8 w-8 text-teal-500">
              {iconMapping[edge?.node?.accountType!]}
            </div>
          </a>
        </div>
      ))}
    </div>
  );
}

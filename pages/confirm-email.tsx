import * as React from "react";
import { useRouter } from "next/router";

import DefaultLayout from "components/layout/DefaultLayout";
import Alert from "components/Alert";
import { useVerifyEmailMutation } from "generated/graphql";
import { EMAIL_VERIFIED_KEY } from "lib/constants";

export default function ConfirmEmail() {
  const [token, setToken] = React.useState<string | null>(null);
  const router = useRouter();

  const [{ data, fetching }, verifyEmail] = useVerifyEmailMutation();

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const theToken = params.get("token");
    if (theToken) {
      setToken(theToken);
    }
  }, []);

  React.useEffect(() => {
    async function action() {
      // do the mutation
      if (token) {
        await verifyEmail({ token });
      }
    }
    action();
  }, [token, verifyEmail]);

  React.useEffect(() => {
    if (data?.verifyAccount?.success) {
      window.localStorage.setItem(EMAIL_VERIFIED_KEY, "true");
      setTimeout(() => {
        router.push("/bookings");
      }, 2000);
    }
  }, [data, router]);

  return (
    <DefaultLayout>
      <div className="mt-4">
        {fetching && !token && <p>Verifying your email...</p>}
        {token && !fetching && data?.verifyAccount?.success && (
          <Alert type="success" text="Email bestätigt, vielen Dank!" />
        )}
        {token && !fetching && !data?.verifyAccount?.success && (
          <Alert type="error" text="Email konnte nicht bestätigt werden." />
        )}
      </div>
    </DefaultLayout>
  );
}

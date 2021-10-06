import * as React from "react";
import { useRouter } from "next/router";

import DefaultLayout from "@components/layout/DefaultLayout";
import Alert from "@components/Alert";
import { useVerifyEmailMutation } from "@generated/graphql";

enum State {
  idle,
  success,
  error,
}

export default function ConfirmEmail() {
  const [token, setToken] = React.useState<string | null>(null);
  const [state, setState] = React.useState(State.idle);
  const router = useRouter();

  const [verifyEmail, { data, loading, error }] = useVerifyEmailMutation();

  console.log(data, error);

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
        await verifyEmail({ variables: { token } });
      }
    }
    action();
  }, [token, verifyEmail]);

  React.useEffect(() => {
    if (data?.verifyAccount?.success) {
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  }, [data, router]);

  return (
    <DefaultLayout>
      <div className="mt-4">
        {loading && !token && <p>Verifying your email...</p>}
        {token && !loading && data?.verifyAccount?.success && (
          <Alert type="success" text="Email bestätigt!" />
        )}
        {token && !loading && !data?.verifyAccount?.success && (
          <Alert type="error" text="Email konnte nicht bestätigt werden." />
        )}
      </div>
    </DefaultLayout>
  );
}

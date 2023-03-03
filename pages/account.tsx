import { AuthStatus, useAuth } from "context/auth";

import DefaultLayout from "components/layout/DefaultLayout";
import PageTitle from "components/PageTitle";
import DeleteAccount from "components/pages/account/DeleteAccount";

export default function Account() {
  const { authState, user } = useAuth();
  if (authState !== AuthStatus.authenticated) {
    return null;
  }
  return (
    <DefaultLayout>
      <PageTitle title="Konto" />
      {authState === AuthStatus.authenticated && (
        <div>
          Eingeloggt als <strong>{user?.me?.email}</strong>
        </div>
      )}
      <div className="h-12" />
      <div className="max-w-lg">
        <DeleteAccount />
      </div>
    </DefaultLayout>
  );
}

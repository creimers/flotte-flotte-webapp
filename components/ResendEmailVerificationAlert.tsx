import { useAuth } from "context/auth";
import Alert from "components/Alert";
import Spinner from "components/Spinner";
import { useResendActiviationEmailMutation } from "generated/graphql";
import { AuthStatus } from "context/auth";

export default function ResendEmailVerificationAlert() {
  const { user, authState } = useAuth();
  const [{ fetching }, resend] = useResendActiviationEmailMutation();
  if (user && user.me) {
    const { email } = user.me;
    return (
      <>
        {user?.me?.verified === false &&
          authState === AuthStatus.authenticated && (
            <div className="mb-2">
              <Alert
                type="warning"
                text={
                  <div className="flex flex-wrap items-center">
                    <div className="mr-1">
                      Bitte bestätige deine Email-Adresse, um den Este-Esel
                      buchen zu können.
                    </div>
                    <button
                      className="underline"
                      disabled={fetching}
                      onClick={() => resend({ email })}
                    >
                      Bestätigungs-Email erneut senden.
                    </button>
                    {fetching && (
                      <div className="h-4 w-4 ml-2">
                        <Spinner />
                      </div>
                    )}
                  </div>
                }
              />
            </div>
          )}
      </>
    );
  }
  return null;
}

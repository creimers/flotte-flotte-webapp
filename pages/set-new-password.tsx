import * as React from "react";
import { useRouter } from "next/router";
import { Formik, Field, Form, FormikHelpers, ErrorMessage } from "formik";

import DefaultLayout from "@components/layout/DefaultLayout";
import Alert from "@components/Alert";
import { usePasswordResetMutation } from "@generated/graphql";

interface IFormValues {
  newPassword1: string;
  newPassword2: string;
}

export default function SetNewPassword() {
  const [token, setToken] = React.useState<string | null>(null);
  const router = useRouter();

  const [resetPassword, { data, loading, error }] = usePasswordResetMutation();

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const theToken = params.get("token");
    if (theToken) {
      setToken(theToken);
    }
  }, []);

  async function handleSubmit(
    values: IFormValues,
    { resetForm }: FormikHelpers<IFormValues>
  ) {
    const variables = {
      newPassword1: values.newPassword1,
      newPassword2: values.newPassword2,
      token: token || "",
    };
    const response = await resetPassword({ variables });
    resetForm();
    window.scrollTo(0, 0);
    if (response.data?.passwordReset?.success) {
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }
  }

  return (
    <DefaultLayout>
      <div className="flex flex-col justify-center pt-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 mb-6 text-center text-3xl font-extrabold text-gray-900">
            Neues Passwort wählen
          </h2>

          {error ||
            (data?.passwordReset?.errors && (
              <Alert
                type="error"
                text="Das neue Passwort konnte nicht gespeichert werden."
              />
            ))}
          {data?.passwordReset?.success && (
            <Alert type="success" text="Das neue Passwort wurde gespeichert!" />
          )}
        </div>

        <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 sm:rounded-lg sm:px-10">
            <Formik
              initialValues={{
                newPassword1: "",
                newPassword2: "",
              }}
              onSubmit={handleSubmit}
            >
              {({ values }) => (
                <Form className="space-y-6">
                  <div>
                    <label
                      htmlFor="newPassword1"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Neues Passwort
                    </label>
                    <div className="mt-1">
                      <Field
                        required
                        name="newPassword1"
                        type="password"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      <ErrorMessage
                        name="newPassword1"
                        component="div"
                        className="text-red-600 text-xs"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="newPassword2"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Neues Passwort bestätigen
                    </label>
                    <div className="mt-1">
                      <Field
                        required
                        name="newPassword2"
                        type="password"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      <ErrorMessage
                        name="newPassword2"
                        component="div"
                        className="text-red-600 text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-500"
                      disabled={
                        loading ||
                        values.newPassword1 !== values.newPassword2 ||
                        !values.newPassword1 ||
                        !values.newPassword2
                      }
                    >
                      Passwort speichern
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

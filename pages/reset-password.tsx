import * as React from "react";

import { Formik, Field, Form, FormikHelpers, ErrorMessage } from "formik";

import Alert from "@components/Alert";
import DefaultLayout from "@components/layout/DefaultLayout";

import { useSendPasswordResetEmailMutation } from "@generated/graphql";

interface Values {
  email: string;
}

export default function Login() {
  const [mutate, { error, data, loading }] =
    useSendPasswordResetEmailMutation();

  async function handleSubmit(
    values: Values,
    { resetForm }: FormikHelpers<Values>
  ) {
    const variables = {
      email: values.email,
    };
    await mutate({ variables });
    resetForm();
    window.scrollTo(0, 0);
  }
  return (
    <DefaultLayout>
      <div className="flex flex-col justify-center pt-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 mb-6 text-center text-3xl font-extrabold text-gray-900">
            Passwort zurücksetzen
          </h2>

          {error ||
            (data?.sendPasswordResetEmail?.errors && (
              <Alert
                type="error"
                text="Das Passwort konnte nicht zurückgesetzt werden."
              />
            ))}
          {data?.sendPasswordResetEmail?.success && (
            <Alert
              type="success"
              text="Wir haben dir eine Email zum Zurücksetzen des Passworts geschickt."
            />
          )}
        </div>

        <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 sm:rounded-lg sm:px-10">
            <Formik
              initialValues={{
                email: "",
              }}
              onSubmit={handleSubmit}
            >
              <Form className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email-Adresse
                  </label>
                  <div className="mt-1">
                    <Field
                      required
                      name="email"
                      type="email"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-600 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-500"
                    disabled={loading}
                  >
                    Jetzt zurücksetzen
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

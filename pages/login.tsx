import * as React from "react";

import { useRouter } from "next/router";
import { Formik, Field, Form, FormikHelpers, ErrorMessage } from "formik";

import Alert from "@components/Alert";
import DefaultLayout from "@components/layout/DefaultLayout";
import { AuthStatus, useAuth } from "@context/auth";

import { useLoginMutation } from "@generated/graphql";
import { JWT_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@lib/constants";

interface Values {
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const [loginMutation, { error, data, loading }] = useLoginMutation();
  const { setAuthState } = useAuth();

  const registrationSucceeded = data?.tokenAuth?.token;
  const registrationFailed =
    (!registrationSucceeded && !loading && data) || error;

  async function handleSubmit(
    values: Values,
    { resetForm }: FormikHelpers<Values>
  ) {
    const variables = {
      email: values.email,
      password: values.password,
    };
    const resp = await loginMutation({ variables });
    const token = resp.data?.tokenAuth?.token;
    const refreshToken = resp.data?.tokenAuth?.refreshToken;
    if (token && refreshToken) {
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
      localStorage.setItem(JWT_TOKEN_KEY, token);
      setAuthState(AuthStatus.authenticated);
      resetForm();
      router.push("/bookings");
    }
    window.scrollTo(0, 0);
  }
  return (
    <DefaultLayout>
      <div className="flex flex-col justify-center pt-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 mb-6 text-center text-3xl font-extrabold text-gray-900">
            Anmelden
          </h2>

          {registrationFailed && (
            <Alert type="error" text="Login-Daten stimmen nicht." />
          )}
        </div>

        <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 sm:rounded-lg sm:px-10">
            <Formik
              initialValues={{
                email: "",
                password: "",
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
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Passwort
                  </label>
                  <div className="mt-1">
                    <Field
                      required
                      name="password"
                      type="password"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-600 text-xs"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Passwort vergessen?
                    </a>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-500"
                    disabled={loading}
                  >
                    Einloggen
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

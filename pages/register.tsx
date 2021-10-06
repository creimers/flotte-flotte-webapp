import * as React from "react";

import { Formik, Field, Form, FormikHelpers, ErrorMessage } from "formik";

import Alert from "@components/Alert";
import DefaultLayout from "@components/layout/DefaultLayout";

import { useRegisterMutation } from "@generated/graphql";

enum RegisterState {
  idle,
  loading,
  error,
  success,
}

interface Values {
  firstName: string;
  lastName: string;
  email: string;
  password1: string;
  password2: string;
  agreeToTerms: boolean;
}

export default function Register() {
  const [registerMutation, { error, data, loading }] = useRegisterMutation();

  console.log(error, data);

  const registrationSucceeded = data?.register?.success === true;
  const registrationFailed =
    (!registrationSucceeded && !loading && data) || error;

  async function handleSubmit(
    values: Values,
    { resetForm, setErrors }: FormikHelpers<Values>
  ) {
    const variables = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password1: values.password1,
      password2: values.password2,
    };
    const resp = await registerMutation({ variables });
    const success = resp.data?.register?.success === true;
    if (success) {
      resetForm();
    } else {
      const errors = resp.data?.register?.errors;
      let formikErrors: { [key: string]: string } = {};
      for (const key in errors) {
        formikErrors[key] = errors[key][0]["message"];
      }
      console.log(formikErrors);
      setErrors(formikErrors);
    }
    window.scrollTo(0, 0);
  }
  return (
    <DefaultLayout>
      <div className="flex flex-col justify-center pt-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 mb-6 text-center text-3xl font-extrabold text-gray-900">
            Registrieren
          </h2>
          <p>
            Um den Este-Esel ausleihen zu können, musst du dich bitte kurz
            registrieren.
          </p>
          {registrationSucceeded && (
            <Alert
              type="success"
              text="Bitte bestätige jetzt deine Email-Adresse."
            />
          )}
          {registrationFailed && (
            <Alert type="error" text="Registrierung fehlgeschlagen." />
          )}
        </div>

        <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 sm:rounded-lg sm:px-10">
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                password1: "",
                password2: "",
                agreeToTerms: false,
              }}
              onSubmit={handleSubmit}
            >
              {({ values }) => (
                <Form className="space-y-6">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Vorname
                    </label>
                    <div className="mt-1">
                      <Field
                        required
                        name="firstName"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Nachname
                    </label>
                    <div className="mt-1">
                      <Field
                        required
                        name="lastName"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

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
                        name="password1"
                        type="password"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      <ErrorMessage
                        name="password1"
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
                      Passwort wiederholen
                    </label>
                    <div className="mt-1">
                      <Field
                        required
                        name="password2"
                        type="password"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      <ErrorMessage
                        name="password2"
                        component="div"
                        className="text-red-600 text-xs"
                      />
                    </div>
                  </div>
                  <label>
                    <Field type="checkbox" name="agreeToTerms" /> Ich habe die
                    Nutzungsbedingungen gelesen und stimme diesen zu.
                  </label>
                  {/* <div className="flex items-center justify-between">
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Passwort vergessen?
                  </a>
                </div>
              </div> */}

                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-500"
                      disabled={!values.agreeToTerms || loading}
                    >
                      Jetzt registrieren
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

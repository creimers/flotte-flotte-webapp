import * as React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useDeleteAccountMutation } from "generated/graphql";
import Button from "components/Button";
import { useAuth } from "context/auth";
import Alert from "components/Alert";

const formSchema = z.object({
  password: z.string().min(1),
});

type FormSchema = z.infer<typeof formSchema>;

export default function DeleteAccount() {
  const [{ fetching }, deleteAccount] = useDeleteAccountMutation();
  const { logout } = useAuth();
  let [isOpen, setIsOpen] = React.useState(false);
  let [error, setError] = React.useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: { password: "" },
  });

  function closeModal() {
    reset();
    setError(false);
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  async function handleDelete(formData: FormSchema) {
    // await cancelBooking({ bookingUuid: booking.uuid });
    const response = await deleteAccount({ password: formData.password });
    if (response.data?.deleteAccount?.success === true) {
      closeModal();
      logout();
      router.push("/");
    } else {
      setError(true);
    }
  }

  //   console.log({ data, error });

  return (
    <>
      <div className="w-64 mt-8">
        <Button text="Konto löschen" emphasis="negative" onClick={openModal} />
      </div>
      <Transition appear show={isOpen} as={React.Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-30 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black/70" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Konto löschen
                </Dialog.Title>
                <div className="space-y-4 pt-2">
                  <div>
                    <p className="text-sm text-gray-500">
                      Um dein Flotte-Flotte Konto und alle damit verknüpften
                      Daten zu löschen gib bitte dein Passwort ein:
                    </p>
                  </div>
                  <form
                    onSubmit={handleSubmit(handleDelete)}
                    className="space-y-4"
                  >
                    {!error ? (
                      <input
                        aria-labelledby="fieldName"
                        {...register("password")}
                        type="password"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Password"
                      />
                    ) : (
                      <Alert type="error" text="Das Passwort stimmt nicht." />
                    )}

                    <div className="flex space-x-4">
                      <Button
                        text="Abbrechen"
                        onClick={closeModal}
                        emphasis="neutral"
                        disabled={fetching}
                        type="button"
                      />
                      <Button
                        text="Konto löschen"
                        loading={fetching}
                        disabled={fetching || !isDirty || error}
                        emphasis="negative"
                        type="submit"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

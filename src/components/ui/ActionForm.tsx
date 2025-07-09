"use client";
import React, { useActionState } from "react";

const initialValue = {
  message: "",
};

type LoginState = {
  message: string;
};

type ActionFormProps = {
  action: (
    prevState: LoginState,
    formData: FormData
  ) => Promise<{
    message: string;
  }>;
  children: (state: LoginState) => React.ReactNode;
};

const ActionForm = ({ action, children }: ActionFormProps) => {
  const [state, formAction] = useActionState(action, initialValue);

  return (
    <form action={formAction}>
      {typeof children === "function" ? children(state) : null}
    </form>
  );
};
export default ActionForm;

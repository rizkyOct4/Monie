"use client";

import Register from "./form-register";
import Login from "./form-login";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

const ModalAuth = () => {
  const [state, setState] = useState(false);
  const redirect = useSearchParams().get("redirect");

  return (
    <>
      {redirect && (
        <div className="w-full h-full flex justify-center items-center">
          {!state ? (
            <Register setState={setState} />
          ) : (
            <Login setState={setState} redirect={redirect}/>
          )}
        </div>
      )}
    </>
  );
};

export default ModalAuth;

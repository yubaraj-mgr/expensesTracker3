import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { verifyEmail } from "../helper/axiosHelper";

const VerifyEmail = () => {
  const [queryParams] = useSearchParams();
  const emailCode = queryParams.get("c");
  const email = queryParams.get("e");
  useEffect(() => {
    (() => {
      verifyEmail({ email, emailCode });
    })();
  }, []);
  return <div>verifyEmail</div>;
};

export default VerifyEmail;

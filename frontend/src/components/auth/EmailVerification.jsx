import React, { useState } from "react";
import Container from "../user/Container";
import Title from "../../form/Title";
import FormInput from "../../form/FormInput";
import Submit from "../../form/Submit";

// const OTP_LENGTH = 6;
const EmailVerification = ({ OTP_LENGTH = 6 }) => {
  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(""));
  return (
    <div className="fixed inset-0 bg-primary -z-20 flex justify-center items-center">
      <Container>
        <form action="" className="bg-secondary rounded p-6 ">
          <div>
            {" "}
            <Title>Please Enter The Otp to verify your account</Title>
            <p className="text-center text-dark-subtle">
              Otp has been sent to your account
            </p>
          </div>
          <div className="flex justify-center items-center space-x-4 mb-4">
            {otp.map((_, i) => {
              return (
                <input
                  type="number"
                  key={i}
                  className="w-12 h-12 border-2 rounded border-dark-subtle focus:border-white bg-transparent outline-none text-center text-white font-semibold text-xl spin-button-none"
                />
              );
            })}
          </div>
          <Submit value={"Send Link"} />
        </form>
      </Container>
    </div>
  );
};

export default EmailVerification;

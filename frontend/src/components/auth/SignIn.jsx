import React from "react";
import Container from "../user/Container";
import Title from "../../form/Title";
import FormInput from "../../form/FormInput";

const SignIn = () => {
  return (
    <div className="fixed inset-0 bg-primary -z-20 flex justify-center items-center">
      <Container>
        <form action="" className="bg-secondary rounded p-6 w-72 space-y-6 ">
          <Title>Sign In</Title>
          <FormInput
            label={"Email"}
            placeholder={"anshu@gmail.com"}
            name={"email"}
          />
          <FormInput
            label={"Password"}
            placeholder={"****"}
            name={"password"}
          />
        </form>
      </Container>
    </div>
  );
};

export default SignIn;

import React from "react";
import Container from "../user/Container";
import Title from "../../form/Title";
import FormInput from "../../form/FormInput";
import Submit from "../../form/Submit";
import { Link } from "react-router-dom";
import CustomLink from "../CustomLink";

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
          <Submit value={"Sign In"} />
          <div className="flex justify-between">
            <CustomLink to={"/auth/forget-password"}>
              Forget Password
            </CustomLink>
            <CustomLink to={"/auth/signup"}>Sign up</CustomLink>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default SignIn;

import React from "react";
import Container from "../user/Container";
import FormInput from "../../form/FormInput";
import Title from "../../form/Title";
import CustomLink from "../CustomLink";
import Submit from "../../form/Submit";

const ForgetPassword = () => {
  return (
    <div className="fixed inset-0 bg-primary -z-20 flex justify-center items-center">
      <Container>
        <form action="" className="bg-secondary rounded p-6 w-96 space-y-6 ">
          <Title>Please Enter Your Email</Title>
          <FormInput
            label={"Email"}
            placeholder={"anshu@gmail.com"}
            name={"email"}
          />

          <Submit value={"Send Link"} />
          <div className="flex justify-between">
            <CustomLink to={"/auth/signin"}>Sign In</CustomLink>
            <CustomLink to={"/auth/signup"}>Sign up</CustomLink>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default ForgetPassword;

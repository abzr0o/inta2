import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BaseLayout from "../../layout/BaseLayout";
import CenterLayout from "../../layout/CenterLayout";
import styles from "../../styles/login.module.scss";
import { Controller, useForm } from "react-hook-form";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { useDispatch } from "react-redux";
import { login } from "../../utils/reducers/auth/auth";
import Link from "next/link";
function Login() {
  const store = useSelector((store: any) => store.authUser);
  const dispath: any = useDispatch();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [loaded, setloadeed] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (store.isloggedin) {
      router.push("/");
    } else {
      setloadeed(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.isloggedin]);
  const onSubmit = (data: { email: string; password: string }) => {
    const a = dispath(login(data));
  };
  if (!loaded) return <div></div>;
  return (
    <BaseLayout>
      <CenterLayout>
        <div className={styles.loginCard}>
          <h1>Welcome to login page</h1>
          <div className={styles.formCard}>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <Label for="email">email</Label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input id="email" type="email" {...field} />
                  )}
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">password</Label>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <Input id="passowrd" type="password" {...field} />
                  )}
                />
              </FormGroup>
              <Button color="primary">LOGIN</Button>
            </Form>
            <div className="divider black"></div>
            <div>
              new to us ? <Link href="/signup">sign up here</Link>
            </div>
          </div>
        </div>
      </CenterLayout>
    </BaseLayout>
  );
}

export default Login;

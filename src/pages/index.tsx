import * as z from "zod";
import React from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Logo from "@assets/STEAM Cup+.png";
import styles from "@styles/authentication.module.css";
import { loginSchema } from "@utils/schema/authentication";
import { useRouter } from "next/router";

type FormData = z.infer<typeof loginSchema>;

export default function Home() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSignUpClicked = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    router.push("/sign-up");
  };

  const onSubmit = (data: FormData) => {
    console.log(data);
    // const response = await fetch('/api/submit', {
    //   method: 'POST',
    //   body: formData,
    // })

    // // Handle response if necessary
    // const data = await response.json()
    // // ...
  };

  return (
    <main className={styles.main}>
      <div>
        <Image
          className={styles.logo}
          src={Logo}
          alt="Robotic Steam Cup"
          priority
        />
      </div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputBox}>
          <input
            {...register("username", { required: true })}
            type="text"
            id="username"
            name="username"
            autoComplete="off"
            placeholder="Username"
          />
          {errors?.username && (
            <p className={styles.error}>{errors?.username?.message}</p>
          )}
        </div>
        <div className={styles.inputBox}>
          <input
            {...register("password", { required: true })}
            type="text"
            id="password"
            name="password"
            autoComplete="off"
            placeholder="Password"
          />
          {errors?.password && (
            <p className={styles.error}>{errors?.password?.message}</p>
          )}
        </div>
        <div className={styles.redirection}>
          <button onClick={onSignUpClicked}>
            Have you sign up yet? What are you waiting for
          </button>
        </div>
        <button className={styles.submit_btn} type="submit">
          Login
        </button>
      </form>
    </main>
  );
}

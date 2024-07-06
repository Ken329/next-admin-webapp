import * as z from "zod";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Logo from "@assets/STEAM Cup+.png";
import styles from "@styles/authentication.module.css";
import { signUpSchema } from "@utils/schema/authentication";

type FormData = z.infer<typeof signUpSchema>;

export default function Home() {
  const router = useRouter();
  const [matchedPassword, setMatchedPassword] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onBackClicked = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    router.push("/");
  };

  const onSubmit = (data: FormData) => {
    const passwordMatched = data.password === data.confirmPassword;
    setMatchedPassword(passwordMatched);

    if (passwordMatched) {
      console.log(data);
      // const response = await fetch('/api/submit', {
      //   method: 'POST',
      //   body: formData,
      // })

      // // Handle response if necessary
      // const data = await response.json()
      // // ...
    }
  };

  return (
    <main className={styles.main}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.redirection}>
          <button onClick={onBackClicked}>Back to Login</button>
        </div>
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
        <div className={styles.inputBox}>
          <input
            {...register("confirmPassword", { required: true })}
            type="text"
            id="confirmPassword"
            name="confirmPassword"
            autoComplete="off"
            placeholder="Confirm password"
          />
          {errors?.confirmPassword && (
            <p className={styles.error}>{errors?.confirmPassword?.message}</p>
          )}
          {!matchedPassword && (
            <p className={styles.error}>
              Password is not matched, please check
            </p>
          )}
        </div>
        <button className={styles.submit_btn} type="submit">
          Login
        </button>
      </form>
      <div>
        <Image
          className={styles.logo}
          src={Logo}
          alt="Robotic Steam Cup"
          priority
        />
      </div>
    </main>
  );
}

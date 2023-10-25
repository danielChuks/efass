"use client";
import styles from "./index.module.scss";
import EfassLogo from "../../components/Images/Frame.png";
import NeptuneLogo from "../../components/Images/NeptuneLogo.png";
import Image from "next/image";
import CustomInput from "@/components/Input/index";
import InputGroup from "@/components/Input/index";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CustomButton, SettingsButton } from "../../components/Button";

export const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");

  const router = useRouter();

  const handleInputchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const navigateOtp = () => {
    if (!data.email || !data.password) {

      setError(true);
      setErrorText("Invalid email or password");
      // console.log("otp");
    } else {
      setError(false);
      setErrorText('');
      router.push("/");
    }
    console.log(setErrorText)
};
  return (
    <div className={styles["background"]}>
      <div className={styles["login-logo"]}>
        <Image src={EfassLogo} alt="efass logo" width={245} height={136} />
      </div>

      <div className="login-layout">
        <div className={styles["login-field"]}>
          <Image
            className={styles["form-logo"]}
            src={NeptuneLogo}
            alt="Neptune logo"
            width={198}
            height={64}
          />
          <form className={styles["form"]}>
            <div className={styles["header"]}>Log In</div>
            <InputGroup
              type="text"
              label="Username"
              placeholder=""
              value={data.email}
              name="email"
              handleChange={handleInputchange}
            />
            <InputGroup
              type="password"
              label="Password"
              value={data.password}
              name="password"
              placeholder=""
              handleChange={handleInputchange}
            />
            <SettingsButton
              text={"Login"}
              handleAction={navigateOtp}
            />
          </form>
        </div>
        <div className={styles["footer"]}>2023 &copy; eFASS by Neptune Software Group.</div>
      </div>
    </div>
  );
};

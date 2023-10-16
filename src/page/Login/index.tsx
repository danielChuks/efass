import styles from "./index.module.scss";
import EfassLogo from "../../components/Images/Frame.png";
import NeptuneLogo from "../../components/Images/NeptuneLogo.png";
import Image from "next/image";
import CustomInput from "@/components/Input/index";

export const Login = () => {
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
          <CustomInput label="Username" type="text" name="username" />
          <CustomInput label="Password" type="password" name="password" />
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="footer">2023      eFASS by Neptune Software Group.</div>
    </div>
    </div>
  );
};

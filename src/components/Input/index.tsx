import React from 'react';
import styles from "./index.module.scss";

type CustomInputProps = {
  label: string;
  type: string;
  name: string;
};

const CustomInput: React.FC<CustomInputProps> = ({ label, type, name }) => {
  return (
    <div className={styles["input"]}>
      <label>{label}</label>
      <input type={type} name={name} />
    </div>
  );
};

export default CustomInput;

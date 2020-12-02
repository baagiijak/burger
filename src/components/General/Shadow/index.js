import React from "react";

import css from "./style.module.css";

const Shadow = (props) =>
  props.show ? (
    <div onClick={props.darahad} className={css.Shadow}></div>
  ) : null;

export default Shadow;

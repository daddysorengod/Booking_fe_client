import { Alert, Snackbar } from "@mui/material";
import React from "react";

const ToastSnankBar = (props:any) => {
  return (

      <Snackbar open={props.open} autoHideDuration={6000} onClose={props.onClose}>
        <Alert onClose={props.handleCloseAlert} severity="error" sx={{ width: "100%" }}>
          {props.message}
        </Alert>
      </Snackbar>
  );
};

export default ToastSnankBar;

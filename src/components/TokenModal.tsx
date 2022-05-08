import { Box, TextField } from "@mui/material";
import React from "react";
import ModalForm from "../common/ModalForm";

const TokenModal = () => {
  return (
    <ModalForm>
      <Box
        sx={{
          width: 500,
          maxWidth: "100%",
        }}
      >
        <TextField fullWidth label="fullWidth" id="fullWidth" />
      </Box>
    </ModalForm>
  );
};

export default TokenModal;

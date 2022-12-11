import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "calc(100% - 40px)",
  maxWidth: 750,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// CODE FROM MATERIAL UI TABLES
// I CREATED A COMPONENT WITH THE MODAL AND MADE ITS CHILDREN DYNAMIC
// I CHANGE ITS CHILDREN SO I CAN RENDER TWO TYPES OF MODAL

export default function ModalComponent({
  children,
  open,
  onClose,
}: {
  children: React.ReactNode;
  open: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div>
      <Modal
        open={open}
        onClose={() => onClose(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{children}</Box>
      </Modal>
    </div>
  );
}

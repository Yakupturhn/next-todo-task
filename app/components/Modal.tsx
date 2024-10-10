import React from "react";

interface ModalProps {
  children: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({ children, open }: ModalProps) => {
  return (
    <div>
      <dialog id="my_modal_3" className={`modal ${open ? "modal-open" : ""}`}>
        <div className="modal-box">{children}</div>
      </dialog>
    </div>
  );
};

export default Modal;

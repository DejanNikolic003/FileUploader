import { useState } from "react";
import Button from "./Button";

function Modal({ name, activeModal, setActiveModal, children, buttonText }) {
  const toggleShow = () => {
    setActiveModal(activeModal === name ? null : name);
  };
  const show = activeModal === name;

  return (
    <>
      <Button text={buttonText} onClick={() => toggleShow()} />
      {show && (
        <div className="absolute inset-0 z-[1] h-screen w-full transition-all duration-200">
          <div className="absolute inset-0 h-screen w-full bg-zinc-800 opacity-50"></div>
          <div className="relative z-[2] flex h-full w-full items-center justify-center">
            <div className="max-w-md flex-1 rounded-md bg-white p-2 shadow-md">
              <button type="button" onClick={() => toggleShow()}>
                X
              </button>
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;

import ReactDOM from "react-dom";
import { MouseEventHandler, ReactNode, useEffect, useMemo } from "react";

type Props = {
  handleClose: MouseEventHandler<HTMLElement>;
  children: ReactNode;
};

export default function Modal(props: Props) {
  const { handleClose, children } = props;

  const containerElement = useMemo(() => document.querySelector("#modal-root"), []);
  const bodyElement = useMemo(() => document.querySelector("body"), []);

  useEffect(() => {
    if (bodyElement === null) {
      return undefined;
    }

    bodyElement.classList.add("modal-active");

    return () => bodyElement.classList.remove("modal-active");
  }, [bodyElement]);

  return ReactDOM.createPortal(
    <div
      className="Modal__overlay"
      onClick={handleClose}
      onKeyDown={() => {}}
      role="button"
      tabIndex={0}
    >
      <button className="Modal__close-button" type="button" onClick={handleClose}>
        &times;
      </button>
      <div
        className="Modal__body"
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
        onKeyDown={() => {}}
        role="button"
        tabIndex={0}
      >
        {children}
      </div>
    </div>,
    containerElement as HTMLDivElement,
  );
}

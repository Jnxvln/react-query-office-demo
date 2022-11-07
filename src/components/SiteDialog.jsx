import { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

export default function SiteDialog({
  title,
  content,
  activatorLabel,
  activatorIcon,
  dialogApproveLabel,
  dialogRejectLabel,
  onApprove,
  onReject,
  isSubmitButton,
  onSubmit,
}) {
  const [visible, setVisible] = useState(false);

  const onHide = (e) => {
    setVisible(false);
  };

  const handleOnApprove = (e) => {
    // setVisible(false);
    onApprove();
  };

  const handleOnReject = (e) => {
    // setVisible(false);
    onReject();
  };

  const header = () => (
    <header>
      <i className="pi pi-info-circle" style={{ marginRight: "0.6em" }} />
      {title}
    </header>
  );

  const footer = () => (
    <footer>
      <Button
        label={dialogRejectLabel || "Cancel"}
        onClick={handleOnReject}
        icon="pi pi-times"
        className="p-button-text"
        tabIndex={-1}
      />
      {isSubmitButton ? (
        <Button
          type="submit"
          label={dialogApproveLabel || "OK"}
          onClick={handleOnApprove}
          icon="pi pi-check"
        />
      ) : (
        <Button
          type="button"
          label={dialogApproveLabel || "OK"}
          onClick={handleOnApprove}
          icon="pi pi-check"
        />
      )}
    </footer>
  );

  return (
    <div>
      <Button
        label={activatorLabel}
        icon={activatorIcon}
        iconPos="left"
        className="p-button-sm"
        onClick={() => setVisible(true)}
      />

      <Dialog
        header={header}
        footer={footer}
        visible={visible}
        style={{ width: "50vw" }}
        onHide={onHide}
        modal
        blockScroll
      >
        {content ? content : <p>No content provided.</p>}
      </Dialog>
    </div>
  );
}

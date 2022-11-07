import { useState } from "react";
import { useFormik } from "formik";
import { classNames } from "primereact/utils";
import SiteDialog from "../SiteDialog";
// PrimeReact Components
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import styles from "../../styles/Posts.module.scss";

function PostForm() {
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({});

  const onApprove = (e) => {
    console.log("Post Form APPROVING");
  };

  const onReject = (e) => {
    console.log("Post Form REJECTING");
  };

  //   const onSubmit = (e) => {
  //     e.preventDefault();
  //   };

  const formik = useFormik({
    initialValues: {
      title: "",
      body: "",
    },
    validate: (data) => {
      let errors = {};

      if (!data.title) {
        errors.title = "Title is required";
      }

      if (!data.body) {
        errors.body = "Body is required";
      }

      return errors;
    },
    onSubmit: (data) => {
      setFormData(data);
      formik.resetForm();
    },
  });

  const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = (name) => {
    return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
  };

  const DialogContent = () => (
    <div className="card">
      <form onSubmit={formik.handleSubmit} style={{ padding: "1.5em" }}>
        <div className="field" style={{ marginBottom: "2em" }}>
          <span className="p-float-label">
            <InputText
              id="postform-title"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              style={{ width: "100%" }}
              className={classNames({ "p-invalid": isFormFieldValid("title") })}
              autoFocus
              required
            />
            <label htmlFor="postform-title">Title</label>
          </span>
          {getFormErrorMessage("title")}
        </div>

        <div className="field">
          <span className="p-float-label">
            <InputTextarea
              id="postform-body"
              name="body"
              value={formik.values.body}
              onChange={formik.handleChange}
              rows={4}
              style={{ width: "100%" }}
              className={classNames({ "p-invalid": isFormFieldValid("body") })}
              required
            />
            <label htmlFor="postform-body">Body</label>
          </span>
          {getFormErrorMessage("body")}
        </div>
      </form>
    </div>
  );

  return (
    <div>
      <Button
        label="New Post"
        icon="pi pi-plus"
        iconPos="left"
        className="p-button-sm"
        onClick={() => setVisible(true)}
      />

      <SiteDialog
        title="Dialog Title"
        content={<DialogContent />}
        activatorLabel="Click Me"
        activatorIcon="pi pi-pencil"
        dialogApproveLabel="Save"
        dialogRejectLabel="Cancel"
        onApprove={onApprove}
        onReject={onReject}
        isSubmitButton={true}
        onSubmit={formik.handleSubmit}
      />
    </div>
  );
}

export default PostForm;

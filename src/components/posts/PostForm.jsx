import { useState } from "react";
import { Dialog } from "primereact/dialog";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// PrimeReact Components
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
// Data
import { createPost } from "../../api/posts/postApi";
import { toast } from "react-toastify";
import styles from "../../styles/Posts.module.scss";

function PostForm() {
  const initialState = {
    title: "",
    body: "",
  };
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const { title, body } = formData;

  // Access the client
  const queryClient = useQueryClient();

  // Mutations
  const mutationAddPost = useMutation({
    mutationFn: () => createPost(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      onCancel();
      toast.success("Post created!");
    },
    onError: (error) => toast.error(error.message),
  });

  const onCancel = (e) => {
    setVisible(false);
    setFormData(initialState);
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    mutationAddPost.mutate();
  };

  const header = () => {
    return (
      <header>
        <h3 style={{ margin: 0 }}>Dialog Title</h3>
      </header>
    );
  };

  const footer = () => {
    return (
      <div>
        <Button
          label="Cancel"
          icon="pi pi-times"
          onClick={() => onCancel()}
          className="p-button-text"
          tabIndex={-1}
        />

        <Button
          type="submit"
          form="postForm"
          label="Save"
          disabled={mutationAddPost.isLoading}
          icon="pi pi-save"
        />
      </div>
    );
  };

  return (
    <div>
      <Button
        label="New Post"
        icon="pi pi-plus"
        iconPos="left"
        className="p-button-sm"
        disabled={mutationAddPost.isLoading}
        onClick={() => setVisible(true)}
      />

      <Dialog
        visible={visible}
        header={header}
        footer={footer}
        onHide={onCancel}
        style={{ minWidth: "50vw" }}
      >
        <form id="postForm" name="postForm" onSubmit={onSubmit} style={{ padding: "1.5em" }}>
          {/* TITLE */}
          <div className="field" style={{ marginBottom: "2em" }}>
            <span className="p-float-label">
              <InputText
                id="postform-title"
                name="title"
                value={title}
                onChange={onChange}
                style={{ width: "100%" }}
                autoFocus
                required
              />
              <label htmlFor="postform-title">
                Title <strong style={{ color: "red" }}>*</strong>
              </label>
            </span>
          </div>

          {/* BODY */}
          <div className="field">
            <span className="p-float-label">
              <InputTextarea
                id="postform-body"
                name="body"
                value={body}
                onChange={onChange}
                rows={4}
                style={{ width: "100%" }}
                required
              />
              <label htmlFor="postform-body">
                Body <strong style={{ color: "red" }}>*</strong>
              </label>
            </span>
          </div>
        </form>
      </Dialog>
    </div>
  );
}

export default PostForm;

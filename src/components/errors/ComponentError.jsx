// import styles from "../../styles/Errors.module.scss"
import styles from "../../styles/Errors.module.scss"
import { useRef, useEffect } from 'react';
import { Messages } from 'primereact/messages';
import { Message } from 'primereact/message';

export default function ComponentError ({ error }) {
  const errorMessage = useRef(null);

  useEffect(() => {
    errorMessage.current.show([
      { severity: 'error', content: (
        <div><i className="pi pi-thumbs-down-fill" style={{ marginRight: '0.5em' }}/>Error Loading: <strong>{error.message}</strong></div>
      ), sticky: true }
  ]);
  })

  return (
    <div className={styles.error}>
      <div className={styles.title}>Error Loading Posts</div>
      <Messages ref={errorMessage} />
    </div>
  )
}
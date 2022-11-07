import { ProgressSpinner } from "primereact/progressspinner";

export default function Spinner() {
  return (
    <div style={{ textAlign: "center" }}>
      <ProgressSpinner
        style={{ width: "50px", height: "50px" }}
        strokeWidth="8"
        fill="var(--surface-ground)"
        animationDuration=".5s"
      />
    </div>
  );
}

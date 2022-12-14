import { Menubar } from "primereact/menubar";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();

  const items = [
    {
      label: "Home",
      command: () => navigate("/"),
    },
    {
      label: "About",
      command: () => navigate("/about"),
    },
    {
      label: "Posts",
      command: () => navigate("/posts"),
    },
  ];

  return (
    <div>
      <Menubar model={items} />
    </div>
  );
}

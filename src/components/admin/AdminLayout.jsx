import Sidebar from "./Sidebar";
import "./adminLayout.css";

const AdminLayout = ({ children }) => {

  return (
    <div className="adminLayout">

      <Sidebar />

      <div className="adminContent">
        {children}
      </div>

    </div>
  );
};

export default AdminLayout;
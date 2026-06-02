import { useContext, useEffect, useState } from "react";
import api from "../../api/api";
import "../../styles/dashboard.css";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";



const Dashboard = () => {
  const [stats, setStats] = useState({});

  const { user } = useContext(AuthContext);

  
  useEffect(() => {
    fetchStats();
  }, []);
  
  const fetchStats = async () => {
    try {
      const res = await api.get("/admin/stats");
      setStats(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  
  if (!user?.isAdmin) {
  return <Navigate to="/" />;
  }
  return (
    <AdminLayout>
    <div className="dashboard">

      <h1>Admin Dashboard</h1>

      <div className="cards">

        <div className="card">
          <h2>{stats.users}</h2>
          <p>Users</p>
        </div>

        <div className="card">
          <h2>{stats.houses}</h2>
          <p>Houses</p>
        </div>

        <div className="card">
          <h2>{stats.bookings}</h2>
          <p>Bookings</p>
        </div>

        <div className="card">
          <h2>KES {stats.revenue}</h2>
          <p>Revenue</p>
        </div>

      </div>

    </div>
    </AdminLayout>
  );
};

export default Dashboard;
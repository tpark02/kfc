import PrivateRoute from "../components/PrivateRoutes";
import Layout from "./Layout";

const PrivateLayout = () => (
  <PrivateRoute>
    <Layout /> {/* your current layout with NavBar etc */}
  </PrivateRoute>
);

export default PrivateLayout;
import { Routes, Route } from 'react-router-dom'
import TablesPage from '../pages/TablesPage';
import OrdersPage from '../pages/OrdersPage';
import MenuPage from '../pages/MenuPage';

function AppRoutes(props) {
  return (
    <Routes>
      
      <Route path='tables' index element={<TablesPage {...props} />} />
            
      <Route path='orders' index element={<OrdersPage {...props} />} />
            
      <Route path='menu' index element={<MenuPage {...props} />} />      
   
    </Routes>
  );
}
export default AppRoutes;

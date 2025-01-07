import { Routes, Route } from 'react-router-dom'


// import HomePage from '../pages/Homepage';
// import LoginPage from '../pages/LoginPage';
// import BitcoinRatesPage from '../pages/BitcoinRatesPage';
// import PostsPage from "../pages/PostsPage";
// import { Post, PostList } from '../components/PostList'

function AppRoutes(props) {
  return (
    <Routes>
      
      {/* <Route path='home' index element={<HomePage {...props} />} />
      
      <Route path="login" element={<LoginPage {...props} />} />
      
      <Route path="bitcoinrates" element={<BitcoinRatesPage {...props} />} />
      
      <Route path="posts" element={<PostsPage {...props} />} > */}
        {/* <Route index element={<PostList />} /> */}
        {/* dynamic param taken from route, stored in variable called id */}
        {/* <Route path=":id" element={<Post />} />
      </Route> */}
   
    </Routes>
  );
}
export default AppRoutes;

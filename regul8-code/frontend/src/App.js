import logo from './logo.svg';
import './App.css';
import Sidebar from './components/Sidebar';
import DashboardArea from './components/DashboardArea';
import ChatBox from './components/ChatBox';

function App() {
  return (
    <div className=" d-flex m-0 p-0 mainContainer ">

      <div className="col-md-1 p-0  ">
      <Sidebar />
      </div>
      
      <div className="col-md-6 p-0  overflowBox">
        
        <DashboardArea/>
      </div>
      <div className='col-md-5 p-0 overflowBox'>
      <ChatBox />

      </div>
    
  </div>
  );
}

export default App;

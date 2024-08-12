import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './Header';
import AddTenantForm from './AddTenantForm';

function App() {
  return (
    <div className='parent-div'>
      <div className='header'>
        <Header/>
      </div>
      <div className='tenant-section'> 
        <div className='add-tenant-form'>
          <AddTenantForm/>
        </div>
      </div>
    </div>
    
  );
}

export default App;

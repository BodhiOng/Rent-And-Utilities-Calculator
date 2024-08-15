import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './Header';
import AddTenantForm from './AddTenantForm';
import TenantList from './TenantList';
import { useState } from 'react';

function App() {
  const [tenants, setTenants] = useState([]);

  const handleAddTenant = (tenant) => {
    setTenants([...tenants, tenant]);
  }


  return (
    <div className='parent-div'>
      <div className='header'>
        <Header/>
      </div>
      <div className='tenant-section'> 
        <div className='add-tenant-form'>
          <AddTenantForm onAddTenant={handleAddTenant}/>
        </div>
        <div className='tenant-list'>
          <TenantList tenants={tenants}/>
        </div>
      </div>
    </div>
  );
}

export default App;

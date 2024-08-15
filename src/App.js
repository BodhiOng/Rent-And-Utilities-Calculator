import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './Header';
import AddTenantForm from './AddTenantForm';
import TenantList from './TenantList';
import { useEffect, useRef, useState } from 'react';

function App() {
  const [tenants, setTenants] = useState([]);
  const [formHeight, setFormHeight] = useState(0);
  const formRef = useRef(null);

  const handleAddTenant = (tenant) => {
    setTenants([...tenants, tenant]);
  }

  useEffect(() => {
    if (formRef.current) {
      setFormHeight(formRef.current.clientHeight)
    }
  }, []);

  return (
    <div className='parent-div'>
      <div className='header'>
        <Header/>
      </div>
      <div className='tenant-section'> 
        <div className='add-tenant-form' ref={formRef}>
          <AddTenantForm onAddTenant={handleAddTenant}/>
        </div>
        <div className='tenant-list' style={{ height : `${formHeight}px` }}>
          <TenantList tenants={tenants}/>
        </div>
      </div>
    </div>
  );
}

export default App;

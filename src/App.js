import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './Header';
import AddTenantForm from './AddTenantForm';
import TenantList from './TenantListForm';
import { useEffect, useRef, useState } from 'react';
import TenantListForm from './TenantListForm';

function App() {
  const [tenants, setTenants] = useState(() => {
    const savedTenants = localStorage.getItem('tenants');
    return savedTenants ? JSON.parse(savedTenants) : [];
  });

  const [formHeight, setFormHeight] = useState(0);
  const formRef = useRef(null);
  
  const handleAddTenant = (tenant) => {
    const newTenants = [...tenants, tenant];
    setTenants(newTenants);
    localStorage.setItem('tenants', JSON.stringify(newTenants));
  }

  const handleDeleteTenant = (tenantId) => {
    const updatedTenants = tenants.filter(tenant => tenant.id !== tenantId);
    setTenants(updatedTenants);
    localStorage.setItem('tenants', JSON.stringify(updatedTenants))
  };

  useEffect(() => {
    if (formRef.current) {
      setFormHeight(formRef.current.clientHeight)
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tenants', JSON.stringify(tenants))
  }, [tenants]);

  return (
    <div className='parent-div'>
      <div className='header'>
        <Header/>
      </div>
      <div className='tenant-section'> 
        <div className='add-tenant-form' ref={formRef}>
          <AddTenantForm onAddTenant={handleAddTenant}/>
        </div>
        <div className='tenant-list-form' style={{ height : `${formHeight}px` }}>
          <TenantListForm tenants={tenants} onDeleteTenant={handleDeleteTenant}/>
        </div>
      </div>
    </div>
  );
}

export default App;

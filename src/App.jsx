import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Header from './Header';
import AddTenantForm from './AddTenantForm';
import TenantListForm from './TenantListForm';
import MonthlyExpenses from './MonthlyExpenses';
import ReceiptForm from './ReceiptForm';

import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function App() {
  // State to manage tenants, initialized from localStoage if available
  const [tenants, setTenants] = useState(() => {
    const savedTenants = localStorage.getItem('tenants');
    return savedTenants ? JSON.parse(savedTenants) : [];
  });

  // State to manage expenses, initialized from localStoage if available
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem('expenses')
    return savedExpenses ? JSON.parse(savedExpenses) : {
      rent: 0,
      water: 0,
      wifi: 0,
      electricity: 0,
    };
  });

  // State to store dimensions of the form elements
  const [formHeight, setFormHeight] = useState(0);
  const [formWidth, setFormWidth] = useState(0);
  const [receiptFormHeight, setReceiptFormHeight] = useState(0);

  // References to the form elements to measure their dimensions
  const formRef = useRef(null);
  const monthlyExpensesRef = useRef(null);
  const receiptFormRef = useRef(null);

  // Function to add a new tenant
  const handleAddTenant = (tenant) => {
    const newTenant = {
      ...tenant, 
      id:uuidv4(), // Generate a unique ID for each tenant
      daysStayed: 30 // Default value for days stayed
    };
    const newTenants = [...tenants, newTenant]; // Add new tenant to the list
    setTenants(newTenants);
    localStorage.setItem('tenants', JSON.stringify(newTenants)); // Save updated tenants to localStorage
  }

  // Function to delete a tenant
  const handleDeleteTenant = (tenantId) => {
    const updatedTenants = tenants.filter(tenant => tenant.id !== tenantId);
    setTenants(updatedTenants);
    localStorage.setItem('tenants', JSON.stringify(updatedTenants)); // Save updated tenants to localStorage
  };

  // Function to update the days stayed for a specific tenant
  const handleUpdatedDays = (tenantId, days) => {
    const updatedTenants = tenants.map(tenant =>
      tenant.id === tenantId ? {...tenant, daysStayed: parseInt(days,10) } : tenant
    );
    setTenants(updatedTenants);
    localStorage.setItem('tenants', JSON.stringify(updatedTenants)); // Save updated tenants to localStorage
  }

  // Function to handle the submission of expenses
  const handleExpensesSubmit = (submittedExpenses) => {
      setExpenses(submittedExpenses);
    };

  // useEffect to update form components' dimensions on window resize
  useEffect(() => {
    const updateDimensions = () => {
      if (formRef.current) {
        setFormHeight(formRef.current.clientHeight);
        setFormWidth(formRef.current.clientWidth);
      }
      if (monthlyExpensesRef.current && receiptFormRef.current) {
        setReceiptFormHeight(monthlyExpensesRef.current.clientHeight);
      }
    }

    updateDimensions();

    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);
    
  // useEffect to save tenants to localStorage whenever they are updated
  useEffect(() => {
    localStorage.setItem('tenants', JSON.stringify(tenants));
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
        <div className='tenant-list-form' 
          style={{ 
            height : `${formHeight}px`, 
            width : `${formWidth}px` 
          }}
        >
          <TenantListForm 
            tenants={tenants} 
            onDeleteTenant={handleDeleteTenant}
            onUpdateDays={handleUpdatedDays}
          />
        </div>
      </div>
      <div className='bills-and-receipt'>
        <div className='monthly-expenses-div-app' 
          style={{ 
            width : `${formWidth}px` 
          }} 
          ref={monthlyExpensesRef}
        >
          <MonthlyExpenses onSubmitExpenses={handleExpensesSubmit} />        
        </div>
        <div className='receipt-form-div-app' 
          style={{ 
            height : `${receiptFormHeight}px`, 
            width : `${formWidth}px` 
          }} 
          ref={receiptFormRef}
        >
          <ReceiptForm
            key={JSON.stringify(expenses)} // Ensure re-render when expenses change
            tenants={tenants}
            totalRent={parseFloat(expenses.rent) || 0}
            totalWifi={parseFloat(expenses.wifi) || 0}
            totalWater={parseFloat(expenses.water) || 0}
            totalElectricity={parseFloat(expenses.electricity) || 0}
          />
        </div>
      </div> 
    </div>
  );
}

export default App;
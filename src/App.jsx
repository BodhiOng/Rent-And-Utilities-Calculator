import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './Header';
import AddTenantForm from './AddTenantForm';
import TenantListForm from './TenantListForm';
import MonthlyExpenses from './MonthlyExpenses';
import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ReceiptForm from './ReceiptForm';

function App() {
  const [tenants, setTenants] = useState(() => {
    const savedTenants = localStorage.getItem('tenants');
    return savedTenants ? JSON.parse(savedTenants) : [];
  });

  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem('expenses')
    return savedExpenses ? JSON.parse(savedExpenses) : {
      rent: 0,
      water: 0,
      wifi: 0,
      electricity: 0,
    };
  });

  const [formHeight, setFormHeight] = useState(0);
  const [formWidth, setFormWidth] = useState(0);
  const [receiptFormHeight, setReceiptFormHeight] = useState(0);
  const [totalRent, setTotalRent] = useState(0);
  const [totalElectricity, setTotalElectricity] = useState(0);

  const formRef = useRef(null);
  const monthlyExpensesRef = useRef(null);
  const receiptFormRef = useRef(null);

  const handleAddTenant = (tenant) => {
    const newTenant = {
      ...tenant, 
      id:uuidv4(), 
      daysStayed: 30
    };
    const newTenants = [...tenants, newTenant];
    setTenants(newTenants);
    localStorage.setItem('tenants', JSON.stringify(newTenants));
  }

  const handleDeleteTenant = (tenantId) => {
    const updatedTenants = tenants.filter(tenant => tenant.id !== tenantId);
    setTenants(updatedTenants);
    localStorage.setItem('tenants', JSON.stringify(updatedTenants));
  };

  const handleUpdatedDays = (tenantId, days) => {
    const updatedTenants = tenants.map(tenant =>
      tenant.id === tenantId ? {...tenant, daysStayed: parseInt(days,10) } : tenant
    );
    setTenants(updatedTenants);
    localStorage.setItem('tenants', JSON.stringify(updatedTenants));
  }

  const getAllData = () => {
    const tenantInfo = tenants.map((tenant, index) => 
      `Tenant ${index + 1}:\nName: ${tenant.tenantName}\nRoom Type: ${tenant.roomType}\nDays Stayed: ${tenant.daysStayed}`
    ).join('\n\n');
  
    const expensesInfo = `
      Rent: ${expenses.rent} MYR
      Water: ${expenses.water} MYR
      WiFi: ${expenses.wifi} MYR
      Electricity: ${expenses.electricity} MYR
    `;
  
    const allData = `Tenants Information:\n${tenantInfo}\n\nMonthly Expenses:\n${expensesInfo}`;
  
    alert(allData);
  };
  
  const handleExpensesChange = (id, value) => {
    setExpenses(prevExpenses => ({
      ...prevExpenses,
      [id]: parseFloat(value) || 0,
    }));
  };

  useEffect(() => {
    if (formRef.current) {
      setFormHeight(formRef.current.clientHeight);
    }
  }, []);
  
  useEffect(() => {
    if (formRef.current) {
      setFormWidth(formRef.current.clientWidth);
    }
  }, []);

  useEffect(() => {
    if (monthlyExpensesRef.current && receiptFormRef.current) {
      setReceiptFormHeight(monthlyExpensesRef.current.clientHeight);
    }
  }, [formWidth, formHeight]);
  
  useEffect(() => {
    localStorage.setItem('tenants', JSON.stringify(tenants));
  }, [tenants]);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  return (
    <div className='parent-div'>
      <div className='header'>
        <Header/>
      </div>
      <div className='tenant-section'> 
        <div className='add-tenant-form' ref={formRef}>
          <AddTenantForm onAddTenant={handleAddTenant}/>
        </div>
        <div className='tenant-list-form' style={{ height : `${formHeight}px`, width : `${formWidth}px` }}>
          <TenantListForm 
            tenants={tenants} 
            onDeleteTenant={handleDeleteTenant}
            onUpdateDays={handleUpdatedDays}
          />
        </div>
      </div>
      <div className='bills-and-receipt'>
        <div className='monthly-expenses-div-app' style={{ width : `${formWidth}px` }} ref={monthlyExpensesRef}>
          <MonthlyExpenses onChangeExpenses={handleExpensesChange} />        
        </div>
        <div className='receipt-form-div-app' style={{ height : `${receiptFormHeight}px`, width : `${formWidth}px` }} ref={receiptFormRef}>
          <ReceiptForm
            tenants={tenants}
            totalRent={expenses.rent}
            totalWifi={expenses.wifi}
            totalWater={expenses.water}
            totalElectricity={expenses.electricity}
          />
        </div>
      </div> 
      <button onClick={getAllData} className="btn btn-primary">Get All Data</button>
    </div>
  );
}

export default App;
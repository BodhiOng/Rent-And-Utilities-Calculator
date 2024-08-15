import { useState } from 'react';
import './MonthlyExpenses.css';

function MonthlyExpenses() {
    const [monthlyRent, setMonthlyRent] = useState(0);
    const [monthlyWaterBill, setMonthlyWaterBill] = useState(0);
    const [monthlyWifiBill, setMonthlyWifiBill] = useState(0);
    const [monthlyElectricityBill, setMonthlyElectricityBill] = useState(0);
    
    return(
        <form>
            <div className='expenses-title'>
                <p className='expenses-title-text'>Input your apartment unit's monthly expenses below (in Malaysian Ringgits)</p>
            </div>
            <div className='utilities-section'>
                <div className='form-group'>
                    <label htmlFor='monthlyRent'>Rent</label>
                    <input
                        type='text'
                        className='form-control'
                        id='monthlyRent'
                        value={monthlyRent}
                        onChange={(e) => setMonthlyRent(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='monthlyWaterBill'>Water</label>
                    <input
                        type='text'
                        className='form-control'
                        id='monthlyWaterBill'
                        value={monthlyWaterBill}
                        onChange={(e) => setMonthlyWaterBill(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='monthlyWifiBill'>Wifi</label>
                    <input
                        type='text'
                        className='form-control'
                        id='monthlyWifiBill'
                        value={monthlyWifiBill}
                        onChange={(e) => setMonthlyWifiBill(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='monthlyElectricityBill'>Electricity</label>
                    <input
                        type='text'
                        className='form-control'
                        id='monthlyElectricityBill'
                        value={monthlyElectricityBill}
                        onChange={(e) => setMonthlyElectricityBill(e.target.value)}
                    />
                </div>
            </div>
        </form>
    );
}

export default MonthlyExpenses;

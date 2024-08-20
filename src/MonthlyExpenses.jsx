import { useState } from 'react';
import './MonthlyExpenses.css';

function MonthlyExpenses({ onSubmitExpenses }) {
    const [expenses, setExpenses] = useState({
        rent: '',
        water: '',
        wifi: '',
        electricity: '',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setExpenses(prevExpenses => ({
            ...prevExpenses,
            [id]: value 
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const parsedExpenses = {
            rent: parseFloat(expenses.rent) || 0,
            water: parseFloat(expenses.water) || 0,
            wifi: parseFloat(expenses.wifi) || 0,
            electricity: parseFloat(expenses.electricity) || 0,
        };
        onSubmitExpenses(parsedExpenses);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='expenses-title'>
                <p className='expenses-title-text'>Input your apartment unit's<br /> monthly expenses (in MYR)</p>
            </div>
            <div className='utilities-section'>
                {['rent', 'water', 'wifi', 'electricity'].map((item, index) => (
                    <div key={index} className='form-group'>
                        <label htmlFor={item}>{item.charAt(0).toUpperCase() + item.slice(1)}:</label>
                        <input
                            type='number'
                            className='form-control'
                            id={item}
                            value={expenses[item]}
                            onChange={handleChange}
                        />
                    </div>
                ))}
            </div>
            <div className="button-div">
                <button type="submit" className="btn btn-dark custom-button">Submit</button>
            </div>        
        </form>
    );
}

export default MonthlyExpenses;

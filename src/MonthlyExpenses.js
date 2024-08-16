import { useState } from 'react';
import './MonthlyExpenses.css';

function MonthlyExpenses() {
    const [expenses, setExpenses] = useState({
        rent: 0,
        water: 0,
        wifi: 0,
        electricity: 0
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setExpenses(prevExpenses => ({
            ...prevExpenses,
            [id]: value
        }));
    };

    return (
        <form>
            <div className='expenses-title'>
                <p className='expenses-title-text'>Input your apartment unit's<br /> monthly expenses below<br /> (in Malaysian Ringgits)</p>
            </div>
            <div className='utilities-section'>
                {['rent', 'water', 'wifi', 'electricity'].map((item, index) => (
                    <div key={index} className='form-group'>
                        <label htmlFor={item}>{item.charAt(0).toUpperCase() + item.slice(1)}</label>
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

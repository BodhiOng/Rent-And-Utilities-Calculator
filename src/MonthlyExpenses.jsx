import { useState } from 'react';
import './MonthlyExpenses.css';

function MonthlyExpenses({ onSubmitExpenses }) {
    // State to manage the input values for each expense type
    const [expenses, setExpenses] = useState({
        rent: '',
        water: '',
        wifi: '',
        electricity: '',
    });

    // Function to handle changes in the input fields
    const handleChange = (e) => {
        const { id, value } = e.target; // Destructure id and value from the event target
        setExpenses(prevExpenses => ({
            ...prevExpenses,
            [id]: value // Update the corresponding expense field in the state
        }));
    };

    // Function to handle the form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        const parsedExpenses = {
            rent: parseFloat(expenses.rent) || 0, // Convert the rent input to a float or 0 if empty
            water: parseFloat(expenses.water) || 0, // Convert the water input to a float or 0 if empty
            wifi: parseFloat(expenses.wifi) || 0, // Convert the wifi input to a float or 0 if empty
            electricity: parseFloat(expenses.electricity) || 0, // Convert the electricity input to a float or 0 if empty
        };
        onSubmitExpenses(parsedExpenses); // Pass the parsed expenses to the parent component
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='expenses-title'>
                <p className='expenses-title-text'>
                    Input your apartment unit's<br /> monthly expenses (in MYR)
                </p>
            </div>
            <div className='utilities-section'>
                {['rent', 'water', 'wifi', 'electricity'].map((item, index) => (
                    <div key={index} className='form-group'>
                        <label htmlFor={item}>{item.charAt(0).toUpperCase() + item.slice(1)}:</label>
                        <input
                            type='number'
                            className='form-control'
                            id={item} // Set the id to match the expense type
                            value={expenses[item]} // Bind the input value to the state
                            onChange={handleChange} // Handle changes to the input field
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
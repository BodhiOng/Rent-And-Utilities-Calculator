import "./AddTenantForm.css";

function AddTenantForm() {
    return(
        <form>
            <div className='form-group'>
                <label htmlFor='tenantName'>Name</label>
                <input type='text' className='form-control' id='tenantName' placeholder='Input your name here...'/>
            </div>
            <div className='form-group'>
                <label htmlFor='roomType'>Room Type</label>
                <select className='form-control' id='roomType'>
                    <option>Small</option>
                    <option>Medium</option>
                    <option>Master</option>
                </select>

            </div>
        </form>
    );
}

export default AddTenantForm;
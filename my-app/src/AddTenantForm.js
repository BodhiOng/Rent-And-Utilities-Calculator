import "./AddTenantForm.css";

function AddTenantForm() {
    return(
        <form>
            <div className='title'>
                <p className='title-text'>Add new tenant</p>
            </div>
            <div className='form-group'>
                <label htmlFor='tenantName'>Name</label>
                <input type='text' className='form-control' id='tenantName' placeholder='Input your name here'/>
            </div>
            <div className='form-group'>
                <label htmlFor='roomType'>Room Type</label>
                <select className='form-control' id='roomType'>
                    <option value='' disable selected>Select your room type</option>
                    <option value='small'>Small</option>
                    <option value='medium'>Medium</option>
                    <option value='master'>Master</option>
                </select>
            </div>
            <div className="button-div">
                <button type="submit" className="btn btn-dark custom-button">Submit</button>
            </div>
        </form>
    );
}

export default AddTenantForm;
import './TenantListForm.css';

function TenantListForm({ tenants, onDeleteTenant, onUpdateDays }) {
    return (
        <div className='tenant-list-wrapper'>
            <div className='list-title'>
                <p className='list-title-text'>Tenant list</p> {/* Title for the tenant list */}
            </div>
            <div className="tenant-days">
                {tenants.length > 0 ? ( // Check if there are any tenants
                    tenants.map((tenant) => ( // Map over the tenant array to display each tenant
                        <div key={tenant.id} className="tenant-item">
                            <div className="tenant-info">
                                <p>{tenant.tenantName}, {tenant.roomType} room</p> {/* Display tenant name and room type */}
                                <input
                                    type="number"
                                    className="days-input"
                                    value={tenant.daysStayed ?? 30} // Default days stayed to 30 if not set
                                    onChange={(e) => onUpdateDays(tenant.id, e.target.value)} // Update days stayed on change
                                    min="0" // Minimum value for days stayed
                                    max="31" // Maximum value for days stayed
                                />
                                <button
                                    className="btn btn-danger custom-button"
                                    onClick={() => onDeleteTenant(tenant.id)} // Call onDeleteTenant function with tenant id
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className='blank-message'>No tenants added yet.</p> // Message when no tenants are present
                )}
                {tenants.length > 0 && (
                    <p className="notice-text">*You can set the tenant's staying period using the customizable number boxes</p> // Notice about customizable input
                )}
            </div>
        </div>
    );
}

export default TenantListForm;
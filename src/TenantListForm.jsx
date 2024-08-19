import './TenantListForm.css';

function TenantListForm({ tenants, onDeleteTenant, onUpdateDays }) {
    return(
        <div className='tenant-list-wrapper'>
            <div className='list-title'>
                <p className='list-title-text'>Tenant list</p>
            </div>
            <div className="tenant-days">
            {tenants.length > 0 ? (
                tenants.map((tenant) => (
                <div key={tenant.id} className="tenant-item">
                    <div className="tenant-info">
                        <p>{tenant.tenantName}, {tenant.roomType} room</p>
                        <input
                            type="number"
                            className="days-input"
                            value={tenant.daysStayed || 30} 
                            onChange={(e) => onUpdateDays(tenant.id, e.target.value)}
                            min="0"
                            max="31" 
                        />
                        <button
                            className="btn btn-danger custom-button"
                            onClick={() => onDeleteTenant(tenant.id)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
                ))
            ) : (
                <p>No tenants added yet.</p>
            )}
            <p className="notice-text">*You can set the tenant's staying period using the customizable number boxes</p>            </div>
        </div>
    );
}

export default TenantListForm;
import './TenantListForm.css';

function TenantListForm({ tenants, onDeleteTenant }) {
    return(
        <div className='tenant-list-wrapper'>
            <div className='list-title'>
                <p className='list-title-text'>Tenant list</p>
            </div>
            <div className='tenant-list-container'>
                {tenants.length > 0 ? (
                    <ul>
                        {tenants.map((tenant, index) => (
                            <li key={index}>
                                {tenant.tenantName} - {tenant.roomType}
                                <button
                                    className='delete-button'
                                    onClick={() => onDeleteTenant(tenant.id)}
                                >
                                    Delete
                                </button>
                            </li>
                            
                        ))}
                    </ul>
                ) : (
                    <p className='empty-list-message'>No tenants available.</p>
                )}
            </div>
        </div>
    );
}

export default TenantListForm;
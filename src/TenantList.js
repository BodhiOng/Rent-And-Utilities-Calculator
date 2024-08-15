import './TenantList.css';

function TenantList({ tenants }) {
    return(
        <div className='tenant-list-div'>
            <div className='list-title'>
                <p className='list-title-text'>Tenant list</p>
            </div>
            <div className='tenant-list-container'>
                <ul>
                    {tenants.map((tenant, index) => (
                        <li key={index}>{tenant.tenantName} - {tenant.roomType}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default TenantList;
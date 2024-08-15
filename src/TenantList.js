import './TenantList.css';

function TenantList({ tenants }) {
    return(
        <div className='tenant-list-container'>
            <h2>Tenant List</h2>
            <ul>
                {tenants.map((tenant, index) => (
                    <li key={index}>{tenant.tenantName} - {tenant.roomType}</li>
                ))}
            </ul>
        </div>
    );
}

export default TenantList;
import './ReceiptForm.css';

function ReceiptForm({ tenants, totalRent, totalWifi, totalWater, totalElectricity }) {

    const getRoomWeight = (roomType) => {
        switch (roomType) {
            case 'Small':
                return 1;
            case 'Medium':
                return 1.5;
            case 'Master':
                return 2;  
            default:
                return 0;        
        }
    };

    const calculateRentShares = () => {
        const totalWeight = tenants.reduce((sum, tenant) => sum + getRoomWeight(tenant.roomType), 0);
    
        return tenants.map((tenant) => {
            const roomWeight = getRoomWeight(tenant.roomType);
            const rentShare = (roomWeight / totalWeight) * totalRent;
            return { ...tenant, rentShare };
        });
    };

    const calculateUtilityShares = (totalUtility) => {
        const tenantCount = tenants.length;
        return tenantCount > 0 ? totalUtility / tenantCount : 0;
    };

    const calculateElectricityShares = () => {
        const totalDays = tenants.reduce((sum, tenant) => sum + tenant.daysStayed, 0);

        return tenants.map((tenant) => {
            const electricityShare = (tenant.daysStayed / totalDays) * totalElectricity;
            return { ...tenant, electricityShare };
        });
    };

    const rentShares = calculateRentShares();
    const waterShare = calculateUtilityShares(totalWater);
    const wifiShares = calculateUtilityShares(totalWifi);
    const electricityShares = calculateElectricityShares();

    return(
        <div className='receipt-form'>
            <div className='title'>
                <p className='title-text'>Receipt</p>
            </div>
            <textarea className='receipt-text-area'>
                {tenants.length > 0 ? (
                        tenants.map((tenant, index) => {
                            const tenantRentShare = rentShares.find(t => t.id === tenant.id)?.rentShare || 0;
                            const tenantElectricityShare = electricityShares.find(t => t.id === tenant.id)?.electricityShare || 0;
                            return (
                                `Tenant ${index + 1}:\n` +
                                `Name: ${tenant.tenantName}\n` +
                                `Room Type: ${tenant.roomType}\n` +
                                `Days Stayed: ${tenant.daysStayed}\n` +
                                `Rent Share: ${tenantRentShare.toFixed(2)} MYR\n` +
                                `Electricity Share: ${tenantElectricityShare.toFixed(2)} MYR\n` +
                                `Water Share: ${waterShare.toFixed(2)} MYR\n\n`
                            );
                        }).join('')
                    ) : (
                        "Add new tenants as desired, press submit to add after inputting tenant's name and room type. Ensure the tenant list is accurate before proceeding. Input your apartment unit's monthly expenses in the currency unit of Malaysian Ringgits. Once you've filled all input boxes of rent, wifi, electricity, and water; press submit on that form too. The receipt with calculated split will be displayed here."
                    )}            
            </textarea>
            <button>📄 Copy</button>
        </div>
    );
}

export default ReceiptForm;
import { useEffect, useState } from 'react';
import './ReceiptForm.css';

function ReceiptForm({ tenants, totalRent, totalWifi, totalWater, totalElectricity }) {
    const [rentShares, setRentShares] = useState([]);
    const [electricityShares, setElectricityShares] = useState([]);
    const [waterShare, setWaterShare] = useState(0);
    const [wifiShare, setWifiShare] = useState(0);

    useEffect(() => {
        setRentShares(calculateRentShares());
        setElectricityShares(calculateElectricityShares());
        setWaterShare(calculateUtilityShares(totalWater));
        setWifiShare(calculateUtilityShares(totalWifi));
    }, [tenants, totalRent, totalWifi, totalWater, totalElectricity]);

    const getRoomWeight = (roomType) => {
        switch (roomType) {
            case 'Small': return 1;
            case 'Medium': return 1.5;
            case 'Master': return 2;  
            default: return 0;        
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

    const copyToClipboard = () => {
        const receiptContent =  (
            tenants.map((tenant, index) => {
                const tenantRentShare = rentShares.find(t => t.id === tenant.id)?.rentShare || 0;
                const tenantElectricityShare = electricityShares.find(t => t.id === tenant.id)?.electricityShare || 0;
                return (
                    `***TENANT ${index + 1}***\n` +
                    `Name: ${tenant.tenantName}\n` +
                    `Room Type: ${tenant.roomType}\n` +
                    `Days Stayed: ${tenant.daysStayed}\n` +
                    `Rent Share: ${tenantRentShare.toFixed(2)} RM\n` +
                    `Electricity Share: ${tenantElectricityShare.toFixed(2)} RM\n` +
                    `Water Share: ${waterShare.toFixed(2)} RM\n` +
                    `Wi-Fi Share: ${wifiShare.toFixed(2)} RM\n\n`
                );
            }).join('')
        )

        navigator.clipboard.writeText(receiptContent)
            .then(() => alert('Receipt copied to clipboard!'))
            .catch(err => console.error('Failed to copy!', err));
    };


    return (
        <div className='receipt-form'>
            <div className='title'>
                <p className='title-text'>Receipt</p>
            </div>
            <textarea className='receipt-text-area' value={
                tenants.length > 0 ? (
                    tenants.map((tenant, index) => {
                        const tenantRentShare = rentShares.find(t => t.id === tenant.id)?.rentShare || 0;
                        const tenantElectricityShare = electricityShares.find(t => t.id === tenant.id)?.electricityShare || 0;
                        return (
                            `***TENANT ${index + 1}***\n` +
                            `Name: ${tenant.tenantName}\n` +
                            `Room Type: ${tenant.roomType}\n` +
                            `Days Stayed: ${tenant.daysStayed}\n` +
                            `Rent Share: ${tenantRentShare.toFixed(2)} RM\n` +
                            `Electricity Share: ${tenantElectricityShare.toFixed(2)} RM\n` +
                            `Water Share: ${waterShare.toFixed(2)} RM\n` +
                            `Wi-Fi Share: ${wifiShare.toFixed(2)} RM\n\n`
                        );
                    }).join('')
                ) : (
                    "Add new tenants as desired, press submit to add after inputting tenant's name and room type. Ensure the tenant list is accurate before proceeding. Input your apartment unit's monthly expenses in the currency unit of Malaysian Ringgits. Once you've filled all input boxes of rent, wifi, electricity, and water; press submit on that form too. The receipt with calculated split will be displayed here."
                )
            } readOnly />
            <button onClick={copyToClipboard}>📄 Copy</button>
        </div>
    );
}

export default ReceiptForm;
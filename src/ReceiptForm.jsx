import { useEffect, useState } from 'react';
import './ReceiptForm.css';

function ReceiptForm({ tenants, totalRent, totalWifi, totalWater, totalElectricity }) {
    // State to hold the calculated rent and electricity shares for each tenant
    const [rentShares, setRentShares] = useState([]);
    const [electricityShares, setElectricityShares] = useState([]);
    const [waterShare, setWaterShare] = useState(0);
    const [wifiShare, setWifiShare] = useState(0);

    // useEffect to calculate and set the shares when tenants or expenses change
    useEffect(() => {
        setRentShares(calculateRentShares());
        setElectricityShares(calculateElectricityShares());
        setWaterShare(calculateUtilityShares(totalWater));
        setWifiShare(calculateUtilityShares(totalWifi));
    }, [tenants, totalRent, totalWifi, totalWater, totalElectricity]);

    // Function to determine the weight of each room type
    const getRoomWeight = (roomType) => {
        switch (roomType) {
            case 'Small': return 1;
            case 'Medium': return 1.5;
            case 'Master': return 2;
            default: return 0; // Return 0 if the room type is unrecognized
        }
    };

    // Function to calculate rent shares based on room weights
    const calculateRentShares = () => {
        // Calculate total weight by summing up the weights of all tenants' rooms
        const totalWeight = tenants.reduce((sum, tenant) => sum + getRoomWeight(tenant.roomType), 0);
    
        // Calculate each tenant's share of the rent based on their room's weight
        return tenants.map((tenant) => {
            const roomWeight = getRoomWeight(tenant.roomType);
            const rentShare = (roomWeight / totalWeight) * totalRent;
            return { ...tenant, rentShare }; // Return tenant object with added rentShare
        });
    };

    // Function to calculate utility shares (water and wifi) evenly among tenants
    const calculateUtilityShares = (totalUtility) => {
        const tenantCount = tenants.length;
        return tenantCount > 0 ? totalUtility / tenantCount : 0; // Divide total utility by number of tenants
    };

    // Function to calculate electricity shares based on days stayed
    const calculateElectricityShares = () => {
        // Calculate total days stayed by summing up all tenants' days
        const totalDays = tenants.reduce((sum, tenant) => sum + tenant.daysStayed, 0);

        // Calculate each tenant's share of the electricity based on days stayed
        return tenants.map((tenant) => {
            const electricityShare = (tenant.daysStayed / totalDays) * totalElectricity;
            return { ...tenant, electricityShare }; // Return tenant object with added electricityShare
        });
    };

    // Function to copy the receipt content to the clipboard
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

        navigator.clipboard.writeText(receiptContent) // Copy the receipt content to the clipboard
            .then(() => alert('Receipt copied to clipboard!')) // Alert user on successful copy
            .catch(err => console.error('Failed to copy!', err)); // Log error if copy fails
    };

    return (
        <div className='receipt-form'>
            <div className='title'>
                <p className='title-text'>Receipt</p>
            </div>
            <textarea 
                className='receipt-text-area' 
                value={
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
                        // Placeholder text when no tenants are added
                        "Add new tenants as desired, press submit to add after inputting tenant's name and room type. Ensure the tenant list is accurate before proceeding. Input your apartment unit's monthly expenses in the currency unit of Malaysian Ringgits. Once you've filled all input boxes of rent, wifi, electricity, and water; press submit on that form too. The receipt with calculated split will be displayed here."
                    )
                } 
                readOnly 
            />
            <button onClick={copyToClipboard}>📄 Copy</button> {/* Button to trigger copy function */}
        </div>
    );
}

export default ReceiptForm;
import './ReceiptForm.css';

function ReceiptForm() {
    return(
        <div className='receipt-form'>
            <div className='title'>
                <p className='title-text'>Receipt</p>
            </div>
            <textarea className='receipt-text-area'>
                Add new tenants as desired, press submit to add after inputting tenant's name and room type. Ensure the tenant list is accurate before proceeding. Input your apartment unit's monthly expenses in the currency unit of Malaysian Ringgits. Once you've filled all input boxes of rent, wifi, electricity, and water; press submit on that form too. The receipt with calculated split will be displayed here.
            </textarea>
            <button>📄 Copy</button>
        </div>
    );
}

export default ReceiptForm;
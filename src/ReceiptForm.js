import './ReceiptForm.css';

function ReceiptForm() {
    return(
        <div className='receipt-form'>
            <div className='title'>
                <p className='title-text'>Receipt</p>
            </div>
            <textarea className='receipt-text-area'>
                Submit new tenants (if you haven't done it) and apartment unit's monthly expenses
            </textarea>
            <button>Copy</button>
        </div>
    );
}

export default ReceiptForm;
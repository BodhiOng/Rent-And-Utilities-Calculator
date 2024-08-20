# Rent and utilities calculator

This a rent and utilities calculator app to manage tenants, track monthly expenses, and generate receipts for singular apartment unit. This app allows users to easily input and manage tenant information, calculate shared expenses, and generate a receipt.

## Features

- Add, delete, and update tenant information.
- Input monthly expenses (rent, water, Wi-Fi, electricity).
- Automatically calculate rent and utility shares for each tenant.
- Generate a receipt that can be copied to the clipboard.

## Live Demo

You can try the live demo of the app here at: [Rent And Utilities Calculator](https://bodhiong.github.io/Rent-And-Utilities-Calculator/).

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone [https://github.com/yourusername/yourrepo.git](https://github.com/BodhiOng/Rent-And-Utilities-Calculator.git)
   cd Rent-And-Utilities-Calculator
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

## Usage

This application consists of several forms that allow you to manage tenant information and calculate shared expenses. Below is a brief explanation of each form and its functionality.

### 1. Add Tenant Form

**Component:** `AddTenantForm`

The **Add Tenant Form** allows you to add a new tenant to the system.

- **Fields:**
  - **Name:** Input the tenant's name in the text field.
  - **Room Type:** Select the room type from the dropdown menu:
    - **Small**
    - **Medium**
    - **Master**

- **Submission:** Click the **Submit** button to add the tenant. The form will clear the input fields after submission.

### 2. Tenant List Form

**Component:** `TenantListForm`

The **Tenant List Form** displays a list of added tenants and allows you to manage their stay duration and delete tenants.

- **Features:**
  - Displays each tenant’s name and room type.
  - Provides an input field to set the number of days the tenant has stayed (default is 30).
  - **Delete Button:** Click the **Delete** button to remove a tenant from the list.

- **Notice:** If there are no tenants added, a message will prompt you to add tenants.

### 3. Monthly Expenses Form

**Component:** `MonthlyExpenses`

The **Monthly Expenses Form** allows you to input the monthly expenses for the apartment unit.

- **Fields:**
  - **Rent:** Enter the monthly rent amount.
  - **Water:** Enter the monthly water bill.
  - **WiFi:** Enter the monthly WiFi bill.
  - **Electricity:** Enter the monthly electricity bill.

- **Submission:** Click the **Submit** button to submit the expenses.

### 4. Receipt Form

**Component:** `ReceiptForm`

The **Receipt Form** displays a calculated receipt for each tenant based on their stay and shared expenses.

- **Features:**
  - Shows each tenant's share of rent, electricity, water, and Wi-Fi based on their room type and days stayed.
  - **Copy Button:** Click the **Copy** button to copy the receipt content to the clipboard.

- **Placeholder Text:** When no tenants are added, a message guides you through the process of adding tenants and entering expenses.

### Notes

- Ensure that all input fields are filled out correctly before submitting any forms.
- The receipt will only be generated after you have added tenants and submitted the monthly expenses.

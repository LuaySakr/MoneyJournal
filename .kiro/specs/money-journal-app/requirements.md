# Money Journal Requirements Document

## Introduction

Money Journal is a React Native mobile application that empowers users to manage their personal finances effectively. The application enables comprehensive transaction tracking, intelligent budget management, detailed financial analytics, and secure user authentication. Built with Firebase backend infrastructure, Money Journal provides a seamless, secure platform for users to monitor income and expenses, set spending goals, and gain insights into their financial behavior.

## Glossary

- **User**: An individual who has created an account in Money Journal and uses the application
- **Transaction**: A financial record representing either income (money received) or expense (money spent)
- **Category**: A classification for transactions (e.g., Food, Transportation, Salary, Bonus)
- **Budget**: A spending limit set by a User for a specific Category over a defined period
- **Budget_Period**: The timeframe for a budget (Monthly, Quarterly, Yearly)
- **Balance**: The sum of all income minus all expenses for a given Category or the entire account
- **Report**: A summary view of financial data over a specified time period
- **Analytics_Dashboard**: A visual interface displaying financial metrics, charts, and summaries
- **Authentication_System**: The secure mechanism for User login and account management
- **Firestore_Database**: The cloud database service used to persist Transaction, Budget, and User data
- **Spending_Limit**: The maximum amount allowed for a Category within a Budget_Period
- **Account**: A User's profile and associated financial data in Money Journal
- **Session**: An active period during which a User is logged into the application
- **Transaction_Status**: The state of a transaction (Pending, Completed, Archived)
- **Financial_Summary**: Aggregate data showing total income, total expenses, and net balance for a period

## Requirements

### Requirement 1: User Authentication and Account Management

**User Story:** As a new user, I want to create a secure account, so that I can safely store my financial data in Money Journal.

#### Acceptance Criteria

1. WHEN a user opens the application and is not authenticated, THE Authentication_System SHALL present a login screen
2. WHEN a user enters an email and password on the login screen and clicks "Sign Up", THE Authentication_System SHALL validate that the email is unique
3. IF the email is already registered, THEN THE Authentication_System SHALL display an error message: "This email is already in use"
4. WHEN a user enters a valid email and password, THE Authentication_System SHALL create a new User account in Firestore_Database
5. WHEN account creation is successful, THE Authentication_System SHALL log the user into the application automatically
6. THE Authentication_System SHALL store the User's account credentials securely using Firebase Authentication

---

### Requirement 2: User Login

**User Story:** As an existing user, I want to log in with my credentials, so that I can access my financial data securely.

#### Acceptance Criteria

1. WHEN a user enters a registered email and correct password on the login screen, THE Authentication_System SHALL authenticate the user
2. IF the entered credentials are incorrect, THEN THE Authentication_System SHALL display an error message: "Invalid email or password"
3. WHEN authentication succeeds, THE Authentication_System SHALL retrieve the User's account data from Firestore_Database and present the Home screen
4. THE Authentication_System SHALL maintain the user's Session until the user explicitly logs out or the Session expires

---

### Requirement 3: User Logout

**User Story:** As a logged-in user, I want to log out of my account, so that I can ensure my account remains secure when I am not using the application.

#### Acceptance Criteria

1. WHEN a user taps the logout button in the application menu, THE Authentication_System SHALL clear the user's Session
2. WHEN logout is complete, THE Authentication_System SHALL present the login screen
3. THE Authentication_System SHALL remove all locally cached user data upon logout

---

### Requirement 4: Create Transactions

**User Story:** As a user, I want to create a financial transaction record, so that I can track my income and expenses.

#### Acceptance Criteria

1. WHEN a user taps the "Add Transaction" button on the Home screen, THE Transaction_Manager SHALL display a transaction creation form
2. WHEN the user enters a description, amount, and selects a Category, THE Transaction_Manager SHALL validate that the amount is a positive number
3. IF the amount is zero or negative, THEN THE Transaction_Manager SHALL display an error: "Amount must be greater than zero"
4. WHEN the user selects a transaction type (Income or Expense), THE Transaction_Manager SHALL store the Transaction in Firestore_Database with the Transaction_Status of "Completed"
5. WHEN a transaction is created, THE Transaction_Manager SHALL associate the transaction with the current User's account
6. WHEN transaction creation is successful, THE Transaction_Manager SHALL update the User's Balance and refresh the Home screen display

---

### Requirement 5: View Transactions

**User Story:** As a user, I want to view a list of all my transactions, so that I can monitor my financial activity.

#### Acceptance Criteria

1. WHEN a user navigates to the Transactions screen, THE Transaction_Viewer SHALL retrieve all Transactions associated with the current User from Firestore_Database
2. WHEN transactions are retrieved, THE Transaction_Viewer SHALL display them in reverse chronological order (newest first)
3. THE Transaction_Viewer SHALL display for each transaction the description, amount, Category, type (Income or Expense), and date
4. WHEN a user taps a transaction in the list, THE Transaction_Viewer SHALL display the full transaction details
5. THE Transaction_Viewer SHALL display the total count of transactions retrieved

---

### Requirement 6: Edit Transactions

**User Story:** As a user, I want to edit a transaction, so that I can correct errors or update information.

#### Acceptance Criteria

1. WHEN a user opens the transaction details screen and taps the edit button, THE Transaction_Editor SHALL display an editable transaction form
2. WHEN the user modifies the transaction details and taps "Save", THE Transaction_Editor SHALL validate the updated information
3. IF validation fails, THEN THE Transaction_Editor SHALL display specific error messages for each invalid field
4. WHEN validation succeeds, THE Transaction_Editor SHALL update the Transaction in Firestore_Database
5. WHEN the transaction is updated, THE Transaction_Editor SHALL recalculate the User's Balance and refresh all affected screens

---

### Requirement 7: Delete Transactions

**User Story:** As a user, I want to delete a transaction, so that I can remove incorrect or unwanted records.

#### Acceptance Criteria

1. WHEN a user opens the transaction details screen and taps the delete button, THE Transaction_Manager SHALL display a confirmation dialog: "Are you sure you want to delete this transaction?"
2. WHEN the user confirms the deletion, THE Transaction_Manager SHALL remove the Transaction from Firestore_Database
3. WHEN the transaction is deleted, THE Transaction_Manager SHALL recalculate the User's Balance and update all affected views
4. THE Transaction_Manager SHALL log the deletion action for audit purposes

---

### Requirement 8: Set Budget

**User Story:** As a user, I want to create a budget for a spending category, so that I can set spending limits and manage my finances proactively.

#### Acceptance Criteria

1. WHEN a user navigates to the Budget Management screen and taps "Create Budget", THE Budget_Manager SHALL display a budget creation form
2. WHEN the user selects a Category, enters a Spending_Limit, and selects a Budget_Period, THE Budget_Manager SHALL validate the Spending_Limit is a positive number
3. IF the Spending_Limit is zero or negative, THEN THE Budget_Manager SHALL display an error: "Spending limit must be greater than zero"
4. WHEN all required fields are valid, THE Budget_Manager SHALL store the Budget in Firestore_Database associated with the User's account
5. WHEN a budget is created, THE Budget_Manager SHALL calculate current spending in that Category and display the Budget on the Budget Management screen

---

### Requirement 9: View Budgets

**User Story:** As a user, I want to view all my budgets, so that I can monitor my spending limits and progress.

#### Acceptance Criteria

1. WHEN a user navigates to the Budget Management screen, THE Budget_Viewer SHALL retrieve all Budgets associated with the current User from Firestore_Database
2. WHEN budgets are retrieved, THE Budget_Viewer SHALL display each budget with the Category, Spending_Limit, Budget_Period, and current spending amount
3. FOR each budget, THE Budget_Viewer SHALL calculate and display the percentage of the Spending_Limit that has been consumed
4. WHEN current spending exceeds the Spending_Limit, THE Budget_Viewer SHALL highlight the budget in red and display a warning indicator
5. WHEN current spending is within 80% of the Spending_Limit, THE Budget_Viewer SHALL highlight the budget in yellow as a caution indicator
6. WHEN current spending is below 80% of the Spending_Limit, THE Budget_Viewer SHALL display the budget with a green indicator

---

### Requirement 10: Edit Budgets

**User Story:** As a user, I want to edit an existing budget, so that I can adjust my spending limits based on changing circumstances.

#### Acceptance Criteria

1. WHEN a user taps a budget on the Budget Management screen, THE Budget_Editor SHALL display the budget details in an editable form
2. WHEN the user modifies the Spending_Limit and taps "Save", THE Budget_Editor SHALL validate the new limit is a positive number
3. IF validation fails, THEN THE Budget_Editor SHALL display an error message
4. WHEN validation succeeds, THE Budget_Editor SHALL update the Budget in Firestore_Database
5. WHEN a budget is updated, THE Budget_Editor SHALL recalculate budget status and refresh the Budget Management screen

---

### Requirement 11: Delete Budgets

**User Story:** As a user, I want to delete a budget, so that I can remove budgets that are no longer needed.

#### Acceptance Criteria

1. WHEN a user opens a budget and taps the delete button, THE Budget_Manager SHALL display a confirmation dialog: "Are you sure you want to delete this budget?"
2. WHEN the user confirms deletion, THE Budget_Manager SHALL remove the Budget from Firestore_Database
3. WHEN a budget is deleted, THE Budget_Manager SHALL refresh the Budget Management screen
4. THE Budget_Manager SHALL NOT delete associated Transactions when a budget is deleted

---

### Requirement 12: Budget Period Configuration

**User Story:** As a user, I want to set different budget periods (Monthly, Quarterly, Yearly), so that I can align budgets with my financial planning timeframe.

#### Acceptance Criteria

1. WHEN a user creates or edits a budget, THE Budget_Manager SHALL present options for Budget_Period (Monthly, Quarterly, Yearly)
2. WHEN a user selects a Budget_Period, THE Budget_Manager SHALL define the period boundaries (start and end dates)
3. FOR Monthly budgets, THE Budget_Manager SHALL define the period as calendar month
4. FOR Quarterly budgets, THE Budget_Manager SHALL define the period as calendar quarter (Q1: Jan-Mar, Q2: Apr-Jun, Q3: Jul-Sep, Q4: Oct-Dec)
5. FOR Yearly budgets, THE Budget_Manager SHALL define the period as calendar year
6. WHEN calculating current spending for a budget, THE Budget_Manager SHALL include only Transactions within the Budget_Period date range

---

### Requirement 13: Financial Summary Report

**User Story:** As a user, I want to view a summary of my financial activity for a specific period, so that I can understand my overall financial position.

#### Acceptance Criteria

1. WHEN a user navigates to the Reports screen, THE Report_Generator SHALL display a Financial_Summary for the current month by default
2. WHEN the user selects a custom date range, THE Report_Generator SHALL generate a Financial_Summary for the selected period
3. THE Financial_Summary SHALL display total income, total expenses, and net balance (income minus expenses)
4. THE Financial_Summary SHALL display the date range for which the summary was generated
5. THE Report_Generator SHALL retrieve all Transactions for the User within the selected period from Firestore_Database and calculate the summary values

---

### Requirement 14: Category-Based Financial Report

**User Story:** As a user, I want to see a breakdown of my spending by category, so that I can understand where my money is being spent.

#### Acceptance Criteria

1. WHEN a user views the Reports screen, THE Report_Generator SHALL display spending broken down by Category
2. FOR each Category, THE Report_Generator SHALL display total amount spent in that Category for the selected period
3. FOR each Category, THE Report_Generator SHALL display the percentage of total expenses that Category represents
4. WHEN a user taps a Category in the report, THE Report_Generator SHALL display all Transactions in that Category for the period
5. THE Report_Generator SHALL include only Expense transactions in category breakdown calculations

---

### Requirement 15: Analytics Dashboard

**User Story:** As a user, I want to view an analytics dashboard with visualizations of my financial data, so that I can quickly understand trends and patterns in my finances.

#### Acceptance Criteria

1. WHEN a user navigates to the Analytics screen, THE Analytics_Dashboard SHALL display multiple financial visualizations
2. THE Analytics_Dashboard SHALL display a pie chart showing expense distribution by Category
3. THE Analytics_Dashboard SHALL display a line chart showing income and expense trends over time (last 12 months)
4. THE Analytics_Dashboard SHALL display a bar chart comparing spending to budget for each Category with an active budget
5. WHEN a user selects a custom date range on the Analytics screen, THE Analytics_Dashboard SHALL recalculate and redisplay all visualizations for that period
6. THE Analytics_Dashboard SHALL display the current month's financial summary (total income, total expenses, net balance) at the top of the screen

---

### Requirement 16: Default Categories

**User Story:** As a new user, I want to have predefined spending categories, so that I can quickly categorize transactions without creating custom categories.

#### Acceptance Criteria

1. WHEN a new User account is created, THE Category_Manager SHALL automatically create a default set of categories: Food, Transportation, Utilities, Entertainment, Healthcare, Shopping, Salary, Bonus, Other Income, Other
2. THE Category_Manager SHALL store these default categories in Firestore_Database associated with the User's account
3. WHEN a user creates a transaction or budget, THE Category_Manager SHALL display these default categories as available options
4. THE default categories SHALL be available for all Users and SHALL NOT be deleted

---

### Requirement 17: Input Validation for Transactions

**User Story:** As a user, I want the application to validate my transaction inputs, so that I can ensure data quality and prevent errors.

#### Acceptance Criteria

1. WHEN a user submits a transaction creation or edit form, THE Validator SHALL check that all required fields (description, amount, category, type) are filled
2. IF any required field is empty, THEN THE Validator SHALL display an error: "All fields are required"
3. WHEN a user enters an amount, THE Validator SHALL verify it is a valid decimal number
4. IF the amount is not a valid number, THEN THE Validator SHALL display an error: "Please enter a valid amount"
5. WHEN a user enters an amount, THE Validator SHALL verify it does not exceed 999,999.99
6. IF the amount exceeds the maximum, THEN THE Validator SHALL display an error: "Amount must not exceed 999,999.99"
7. THE Validator SHALL prevent submission of the form until all validation errors are resolved

---

### Requirement 18: Home Screen Display

**User Story:** As a logged-in user, I want to see a summary of my financial status on the Home screen, so that I can quickly understand my current financial position.

#### Acceptance Criteria

1. WHEN a user logs into Money Journal, THE Home_Screen SHALL display the current balance (total income minus total expenses)
2. THE Home_Screen SHALL display total income for the current month
3. THE Home_Screen SHALL display total expenses for the current month
4. THE Home_Screen SHALL display the recent transactions (last 5) in reverse chronological order
5. THE Home_Screen SHALL display active budgets and their current status (percentage of spending limit used)
6. WHEN the user pulls to refresh on the Home_Screen, THE Home_Screen SHALL reload data from Firestore_Database and update all displayed values

---

### Requirement 19: Transaction Search and Filter

**User Story:** As a user, I want to search and filter my transactions, so that I can quickly find specific financial records.

#### Acceptance Criteria

1. WHEN a user navigates to the Transactions screen, THE Transaction_Viewer SHALL provide a search field
2. WHEN a user enters text in the search field, THE Transaction_Viewer SHALL filter transactions by description in real-time
3. WHEN a user selects a Category filter, THE Transaction_Viewer SHALL display only transactions in the selected Category
4. WHEN a user selects a date range filter, THE Transaction_Viewer SHALL display only transactions within that date range
5. THE Transaction_Viewer SHALL allow combining multiple filters (category AND date range) simultaneously
6. THE Transaction_Viewer SHALL display the count of transactions matching the active filters

---

### Requirement 20: Budget Alert Notifications

**User Story:** As a user, I want to receive alerts when my spending approaches or exceeds budget limits, so that I can take corrective action.

#### Acceptance Criteria

1. WHEN a transaction is created and the Category has an active budget, THE Budget_Monitor SHALL calculate if current spending in that Category exceeds 80% of the Spending_Limit
2. IF spending reaches 80% of the Spending_Limit, THE Budget_Monitor SHALL display an in-app notification: "You have reached 80% of your [Category] budget"
3. WHEN a transaction is created and the Category has an active budget, THE Budget_Monitor SHALL calculate if current spending exceeds the Spending_Limit
4. IF spending exceeds the Spending_Limit, THE Budget_Monitor SHALL display an in-app notification: "You have exceeded your [Category] budget by [amount]"
5. THE Budget_Monitor SHALL check budget status daily at 8:00 AM and display any alerts for budgets exceeded or at 80% utilization

---

### Requirement 21: Data Persistence and Sync

**User Story:** As a user, I want my financial data to persist and sync across sessions, so that I can access my information reliably and consistently.

#### Acceptance Criteria

1. WHEN a user creates, edits, or deletes a transaction, THE Data_Persistence_Manager SHALL immediately save the changes to Firestore_Database
2. WHEN a user logs back into the application, THE Data_Persistence_Manager SHALL retrieve all User data from Firestore_Database
3. WHEN the application detects a network disconnection, THE Data_Persistence_Manager SHALL continue to function with locally cached data
4. WHEN the application reconnects to the network, THE Data_Persistence_Manager SHALL synchronize any local changes with Firestore_Database
5. IF a conflict is detected between local changes and server changes, THE Data_Persistence_Manager SHALL resolve the conflict by using the most recent timestamp as the source of truth

---

### Requirement 22: Data Security and Privacy

**User Story:** As a user, I want my financial data to be secure and private, so that I can trust Money Journal with sensitive financial information.

#### Acceptance Criteria

1. THE Authentication_System SHALL use Firebase Authentication to securely manage User credentials
2. ALL communication between the application and Firestore_Database SHALL be encrypted using TLS
3. WHEN a user logs out or deletes their account, THE Authentication_System SHALL securely remove all cached credentials from the device
4. WHEN Firestore_Database rules are configured, THE rules SHALL enforce that Users can only access their own data
5. THE application SHALL NOT store sensitive data (passwords, tokens) in device local storage; instead, THE application SHALL use secure storage mechanisms
6. WHEN a user deletes their account, THE Data_Manager SHALL remove all associated Transactions, Budgets, and Account data from Firestore_Database

---

### Requirement 23: Account Deletion

**User Story:** As a user, I want to delete my account, so that I can permanently remove my data from Money Journal.

#### Acceptance Criteria

1. WHEN a user navigates to Account Settings and taps "Delete Account", THE Account_Manager SHALL display a confirmation dialog with warning text: "This action is permanent and cannot be undone. All your financial data will be deleted."
2. WHEN the user confirms account deletion, THE Account_Manager SHALL require the user to re-enter their password for verification
3. IF the password is incorrect, THEN THE Account_Manager SHALL display an error and cancel the deletion process
4. WHEN the password is verified, THE Account_Manager SHALL delete the User account from Firebase Authentication
5. WHEN the User account is deleted, THE Account_Manager SHALL delete all associated Transactions, Budgets, and Account data from Firestore_Database
6. WHEN account deletion is complete, THE Account_Manager SHALL log the user out and present the login screen

---

### Requirement 24: Recurring Transactions

**User Story:** As a user, I want to create recurring transactions, so that I can automatically record regular income and expenses without manual entry.

#### Acceptance Criteria

1. WHEN a user creates a transaction and taps "Make Recurring", THE Recurring_Transaction_Manager SHALL display options for recurrence frequency (Daily, Weekly, Monthly, Yearly)
2. WHEN a user selects a recurrence frequency, THE Recurring_Transaction_Manager SHALL store the Recurring_Transaction configuration in Firestore_Database
3. WHEN the scheduled date for a recurring transaction arrives, THE Recurring_Transaction_Manager SHALL automatically create a new Transaction with the same details as the original
4. WHEN a user edits a recurring transaction, THE Recurring_Transaction_Manager SHALL update all future instances of that recurring transaction
5. WHEN a user deletes a recurring transaction, THE Recurring_Transaction_Manager SHALL display an option to delete only the current instance or all future instances

---

## Business Rules

1. **Transaction Integrity**: All transactions must have a valid amount, category, type (income/expense), and description. Transactions cannot be created without these required fields.

2. **Budget Period Continuity**: A User can have only one active budget per Category per Budget_Period. If a user attempts to create a second budget for the same Category and period, the system shall display an error.

3. **Category Consistency**: The default categories (Food, Transportation, Utilities, etc.) cannot be deleted or modified. Users can create custom categories, but default categories must always be available.

4. **Balance Calculation**: The User's account Balance is calculated as total income minus total expenses across all transactions. This calculation updates in real-time as transactions are created, edited, or deleted.

5. **Budget Monitoring**: Budget alerts are triggered when spending reaches 80% of the Spending_Limit (warning) or exceeds 100% of the Spending_Limit (critical alert).

6. **Data Ownership**: Users can only access and modify their own transactions and budgets. Cross-user data access is prohibited by Firestore_Database security rules.

7. **Authentication State**: Users remain authenticated until they explicitly log out or the system invalidates their session. Sessions shall have a maximum timeout of 30 days of inactivity.

8. **Transaction Immutability**: While transactions can be edited and deleted, the system shall maintain an audit log of all changes for compliance and user reference.

9. **Recurring Transaction Frequency**: Recurring transactions cannot be created with frequencies less than 1 day or more than 1 year. The next instance of a recurring transaction is calculated based on the previous instance's date.

10. **Amount Precision**: All monetary amounts are stored and displayed with two decimal places (cents). The system accepts amounts from 0.01 to 999,999.99.


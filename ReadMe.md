### 🏥 Inventory Management System

A fullstack CRUD application built with ASP.NET Core 9 API and SQLite database, featuring an Angular 20 frontend.
This web application is designed to manage inventory status for different supplies.

https://github.com/user-attachments/assets/5f4ed3e6-f2d0-4c13-9a55-acb7ff711140

### 🚀 Features

- **Item Management**: List all registered items with name, quantity in stock, and unit
- **Create New Items**: Add new items with name, initial quantity, threshold and unit
- **Edit Items**: Edit items with name, threshold and unit
- **Delete Items**: Remove items from inventory
- **Update Stock Balance**: Increase or decrease inventory balance (balance cannot go negative)
- **Low Stock Warning**: Color-coded warnings when an item's balance is below a defined threshold
- **Detailed Validation**: Input validation (required fields,unique item name, quantities cannot be negative, zero or letters etc..)

### 🛠️ Technology Stack

**Backend:**

- ASP.NET Core 9 Web API
- Entity Framework Core
- SQLite Database
- RESTful API with JSON communication

**Frontend:**

- Angular 20
- TypeScript
- HTML/CSS
- Responsive Design
- Bootstrap / Bootstrap Icons

🌐 SEO & Design Principles

This project follows modern SEO best practices, accessibility standards, and design principles to ensure usability and discoverability:
- **SEO (100/100)**: Semantic HTML structure, descriptive titles, meta tags, and clean URLs.
- **Accessibility (100/100)**: WCAG-compliant contrast, keyboard navigation, ARIA attributes, and screen reader support.
- **Best Practices (100/100)**: Secure HTTPS requests, responsive layout, mobile-friendly design.
- **Performance (54/100)**: Optimized for development setup; performance score is lower due to unminified assets and Angular dev server. In a production build, performance would be significantly improved.

<img width="450" height="150" alt="SEO-LightHouse" src="https://github.com/user-attachments/assets/601c58be-b11c-475f-99aa-8685b4a54f77" />

### 🔍 API Endpoints

- `GET /api/items` - Get all items
- `POST /api/items` - Create a new item
- `PUT /api/items/{id}` - Update an item
- `DELETE /api/items/{id}` - Delete an item
- `PATCH /api/items/{id}/adjust-balance` - Update item quantity

🔍 Assumptions

  - Single User System: No authentication or user management implemented
  - Local Database: SQLite database stored locally, not suitable for multi-user production environments
  - General inventory context: Designed for managing stock of any type of items
  - Local execution: The application runs locally on the developer's machine

🚀 Things That Can Be Done Later

   - Date Storage for Operations: Save timestamps for "ta bort" (removal) and "fyllning" (restocking) operations
   - Table Sorting: Implement sorting functionality for table columns (ascending/descending)
   - User Authentication: Add login/registration system for multi-user support
   - Cloud Database Integration: Migrate from SQLite to a cloud-based database solution
   - Advanced Search & Filtering: Add search functionality and advanced filtering options
   - Data Export/Import: Implement CSV/Excel export and import capabilities
   - Inventory Categories: Add category-based organization for better item management

### 📋 Prerequisites

Before running this application, make sure you have the following installed:

- [.NET 9 SDK](https://dotnet.microsoft.com/download/dotnet/9.0)
- [Entity Framework Core Tools](https://learn.microsoft.com/ef/core/cli/dotnet)  
  Install with: `dotnet tool install --global dotnet-ef`
- [Node.js](https://nodejs.org/) (version 18 or higher)
- [Angular CLI](https://angular.io/cli) (`npm install -g @angular/cli`)
- [Visual Studio](https://visualstudio.microsoft.com/) or [Visual Studio Code](https://code.visualstudio.com/)

### 🔧 Installation Instructions

#### 1. Clone the Repository

```bash
git clone https://github.com/gozzde09/Inventory-Management-LagerUgglan.git
cd Inventory-Management-LagerUgglan
```

#### 2. Backend Setup (ASP.NET Core API)

```bash
# Navigate to the backend project directory
cd backend

# Restore NuGet packages
dotnet restore

# Update database
dotnet ef database update

# Run the API
dotnet run
```

The API will be available at `https://localhost:5293` with Swagger-UI

#### 3. Frontend Setup (Angular)

```bash
# Navigate to the Angular project directory
cd frontend

# Install npm packages
npm install

# Run the Angular application
ng serve
```

The Angular application will be available at `http://localhost:4200`

### Usage

- Navigate to the Items page to view all registered items
- Use the "Add Item" form to register new items
- Update stock levels using the stock update form
- Update or remove item by the corresponding icons
- Monitor stock status colors: Green (sufficient), Yellow (low), Red (critical)

### 🗄️ Database Configuration

This application uses SQLite as the database. The database file will be automatically created in the project directory when you first run the application.

**Database Schema Assumptions:**

- Items table with columns: Id, Name, Quantity, Unit, CriticalStockThreshold
- Automatic database creation on first run
- Primary key auto-increment for item IDs

### 📁 Project Structure

```
Inventory-Management-ASPNET-Core/
├── backend/               # ASP.NET Core Web API
│   ├── Controllers/             # API Controllers
│   ├── Models/                  # Data Models
│   ├── Services/                # Services
│   └── Program.cs               # API Entry Point

├── frontend/              # Angular Frontend
│   ├── src/
│   │   ├── app/                 # Angular app
│   │   |   ├── components/      # Four components
│   │   |   ├── pages/           # Two pages
│   │   |   └── services/        # Service
│   └── package.json             # NPM Dependencies
└── README.md
```

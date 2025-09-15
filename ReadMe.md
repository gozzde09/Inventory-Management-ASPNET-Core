### 🏥 Inventory Management System

A fullstack CRUD application built with ASP.NET Core 9 API and SQLite database, featuring an Angular 20 frontend. 
This web application is designed to manage inventory status for different supplies.

### 🚀 Features

- **Item Management**: List all registered items with name, quantity in stock, and unit
- **Create New Items**: Add new items with name, initial quantity, threshold and unit
- **Edit Items**: Edit items with name, threshold and unit
- **Delete Items**: Remove items from inventory
- **Update Stock Balance**: Increase or decrease inventory balance (balance cannot go negative)
- **Low Stock Warning**: Color-coded warnings when an item's balance is below a defined threshold

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

### ⚠️ Assumptions and Limitations

1. **Single User System**: No authentication or user management implemented
2. **Local Database**: SQLite database stored locally, not suitable for multi-user production environments
3. **Basic Validation**: Input validation (required fields, quantities cannot be negative, zero or letters etc..)
4. **Swedish UI**: Interface supports basic localization
5. **General inventory context**: Designed for managing stock of any type of items
6. **Local execution**: The application runs locally on the developer's machine
7. **Unique item names**: Each inventory item must have a unique name

### 📋 Prerequisites

Before running this application, make sure you have the following installed:

- [.NET 9 SDK](https://dotnet.microsoft.com/download/dotnet/9.0)
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
The API will be available at `https://localhost:5293` wtih Swagger-view

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
- Monitor stock status colors: Green (sufficient), Yellow (low), Red (critical)

### 🗄️ Database Configuration

This application uses SQLite as the database. The database file will be automatically created in the project directory when you first run the application.

**Database Schema Assumptions:**
- Items table with columns: Id, Name, Quantity, Unit, riticalStockThreshold, Status
- Automatic database creation on first run
- Primary key auto-increment for item IDs

### 📁 Project Structure
```
Inventory-Management-ASPNET-Core/
├── backend/              # ASP.NET Core Web API
│   ├── Controllers/          # API Controllers
│   ├── Models/               # Data Models
│   ├── Services/             # Services
│   └── Program.cs            # API Entry Point
├── frontend/                # Angular Frontend
│   ├── src/
│   │   ├── app/             # Angular app
│   │   ├── components/      # Four components
│   │   ├── pages/           # Two pages
│   │   └── services/        # Service
│   └── package.json         # NPM Dependencies
└── README.md                
```

### 🔍 API Endpoints

- `GET /api/items` - Get all items
- `POST /api/items` - Create a new item
- `PUT /api/items/{id}` - Update an item
- `DELETE /api/items/{id}` - Delete an item
- `PATCH /api/items/{id}/adjust-balance` - Update item quantity




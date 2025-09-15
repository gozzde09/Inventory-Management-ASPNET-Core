# ﻿Lagerhantering för sjukvårdsmaterial

# Beskrivning

Denna webbapplikation är byggd för att hjälpa en låtsas vårdcentral att hålla koll på lagerstatus för sjukvårdsmaterial.

# Applikationen består av:

1- Backend: ASP.NET Core 9 Web API (CRUD för artiklar och endpoint för saldoändring).

2- Frontend: Angular 20 (lista artiklar, uppdatera antal och visa varningsindikatorer).

3- Databas: SQLite, kommunikation via JSON.

# Funktionalitet

1- Lista artiklar
Visa alla registrerade artiklar med namn, antal i lager och enhet.

2- Skapa artikel
Lägga till ny artikel med namn, initialt antal och enhet.

3- Uppdatera saldo
Öka eller minska lagersaldo. Saldo kan inte bli negativt.

4- Låg lager varning
Om en artikels saldo är under en definierad gräns visas en färgkodad varning.

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
├── frontend/             # Angular Frontend
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

## Svenska

### 🏥 Lagersystem för Vårdcentral

En fullstack CRUD-applikation byggd med ASP.NET Core 9 API och SQLite-databas, med en Angular 20 frontend.
Denna webbapplikation är designad för att hjälpa vårdcentraler att hantera lagerstatus för medicinska artiklar.

### 🚀 Funktioner

- **Artikelhantering**: Lista alla registrerade artiklar med namn, lagersaldo och enhet
- **Skapa nya artiklar**: Lägg till nya artiklar med namn, initialt antal, minimum värde och enhet
- **Redigera artiklar**: Ändra artikelns namn, tröskel och enhet
- **Ta bort artiklar**: Radera artiklar från lagret
- **Uppdatera lagersaldo**: Öka eller minska lagerbalansen (saldo kan inte bli negativt)
- **Låg lager-varning**: Färgkodade varningar när en artikels saldo är under en definierad gräns

### 🛠️ Teknikstack

**Backend:**

- ASP.NET Core 9 Web API
- Entity Framework Core
- SQLite-databas
- RESTful API med JSON-kommunikation

**Frontend:**

- Angular 20
- TypeScript
- HTML/CSS
- Responsiv design
- Bootstrap / Bootstrap-ikoner

### 🗄️ Databaskonfiguration

Denna applikation använder SQLite som databas. Databasfilen kommer automatiskt att skapas i projektmappen när du första gången kör applikationen.

**Antaganden om databasschema:**

- Items-tabell med kolumner: Id, Name, Quantity, Unit, CriticalStockThreshold, Status
- Automatisk databasskapande vid första körningen
- Primärnyckel auto-increment för artikel-ID:n

### ⚠️ Antaganden och Begränsningar

1. **Enanvändarsystem**: Ingen autentisering eller användarhantering implementerad
2. **Lokal databas**: SQLite-databas lagrad lokalt, inte lämplig för produktionsmiljöer med flera användare
3. **Grundläggande validering**: Kräver inmatning, kvantitet kan ej vara negativ, noll eller innehålla bokstäver
4. **Allmänt lagerhanteringssystem**: Designad för att hantera lager av alla typer av artiklar, inte begränsad till medicinska förråd
5. **Lokal körning**: Applikationen körs lokalt på utvecklarens maskin
6. **Unika artikelnamn**: Varje artikel i lagret måste ha ett unikt namn

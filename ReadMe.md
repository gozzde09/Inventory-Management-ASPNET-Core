# ﻿Lagerhantering för sjukvårdsmaterial

# Beskrivning

Denna webbapplikation är byggd för att hjälpa en låtsas vårdcentral att hålla koll på lagerstatus för sjukvårdsmaterial.

# Applikationen består av:

1- Backend: ASP.NET Core 9 Web API (CRUD för artiklar och endpoint för saldoändring).

2- Frontend: Angular 17 (lista artiklar, uppdatera antal och visa varningsindikatorer).

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

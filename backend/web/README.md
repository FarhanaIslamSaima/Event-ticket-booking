# 📘 Software Requirements Specification (SRS)

## 🎟️ Event Booking Web Application

---

## 1. Introduction

### 1.1 Purpose
The purpose of this document is to outline the software requirements for a web-based Event Booking Application. The system allows users to explore events and book tickets, while organizers can post and manage their events. Admins oversee the platform’s operations.

### 1.2 Scope
The application will support:
- User registration and login
- Event discovery and filtering
- Real-time ticket availability
- Booking and cancellation
- Payment gateway integration
- Organizer dashboard for managing events
- Admin panel for platform moderation

### 1.3 Definitions, Acronyms, and Abbreviations
- **Django** – Python-based web framework (backend)
- **React** – JavaScript library for building UI (frontend)
- **JWT** – JSON Web Token for authentication
- **REST API** – A standard way to exchange data between frontend and backend
- **CRUD** – Create, Read, Update, Delete

### 1.4 References
- Django Documentation
- React Documentation
- REST API Guidelines
- Tailwind CSS Docs

### 1.5 Overview
This document outlines the functional and non-functional requirements, system features, user roles, and constraints of the Event Booking App.

---

## 2. Overall Description

### 2.1 Product Perspective
This is a standalone web application. It does not depend on any existing software.

### 2.2 Product Functions
- Search and filter public events
- Display event details and ticket availability
- Ticket booking and cancellation
- Role-based access (User, Organizer, Admin)
- Organizer dashboard
- Admin dashboard for platform oversight

### 2.3 User Classes and Characteristics
- **User/Attendee** – Can search events, book tickets, cancel and manage bookings
- **Organizer** – Can create and manage events, view ticket sales
- **Admin** – Manages all users, events, and bookings; enforces platform rules

### 2.4 Operating Environment
- Backend: Django (Python 3.x)
- Frontend: React.js
- Database: PostgreSQL
- OS: Cross-platform
- Browser: Chrome, Firefox, Edge, Safari

### 2.5 Constraints
- Must follow RESTful architecture
- Responsive UI for mobile and desktop
- Secure user authentication and data handling
- Integration with at least one payment gateway (Stripe, SSLCommerz)

### 2.6 Assumptions and Dependencies
- Users and organizers have internet access
- Payment methods used are valid
- Organizers actively maintain event details
- SMS/email services are operational for notifications

---

## 3. Specific Requirements

### 3.1 Functional Requirements

| ID   | Description |
|------|-------------|
| FR1  | Users can register and log in |
| FR2  | Users can search and filter events |
| FR3  | Users can view event details and ticket availability |
| FR4  | Users can book tickets for events |
| FR5  | Payment is processed securely |
| FR6  | Booking confirmation is sent via email |
| FR7  | Users can cancel bookings and request refunds |
| FR8  | Organizers can create, update, or delete events |
| FR9  | Organizers can view bookings for their events |
| FR10 | Admin can manage all events, users, and bookings |

### 3.2 Non-Functional Requirements

| ID   | Description |
|------|-------------|
| NFR1 | The system should respond to any booking action in under 2 seconds |
| NFR2 | The UI should be mobile-friendly |
| NFR3 | Passwords must be encrypted and stored securely |
| NFR4 | The system should be available 99% of the time |
| NFR5 | All sensitive actions require authentication |

### 3.3 External Interface Requirements
- **Frontend**: React.js
- **Backend API**: Django REST Framework (DRF)
- **Database**: PostgreSQL
- **Payment API**: Stripe / SSLCommerz
- **Email/SMS**: SendGrid / Twilio

---

## 4. Appendices

- **A. Use Case Diagram**
  (User: Search → View → Book → Pay → Receive Ticket)
  (Organizer: Add/Edit/Delete Event → View Bookings)
  (Admin: Moderate Content → Manage Users & Events)

- **B. Entity-Relationship Diagram (ERD)**
  - Tables: User, Event, Booking, Payment, Ticket, Category

- **C. Sample UI Mockups**
  (Landing page, event list, booking form, organizer dashboard, admin panel)

- **D. Technologies**
  - React + Vite
  - Django + DRF
  - PostgreSQL
  - Tailwind CSS
  - JWT for authentication

- **E. [🗓️ Project Sprint Plan](./sprint-plan.md)** – Timeline and Agile sprint breakdown

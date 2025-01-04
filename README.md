# Complaint Management System  

A web application for users to submit complaints and for administrators to manage those complaints effectively. The system includes email notifications for updates and supports role-based functionality for users and admins.  

## Features  
### User Features  
- Submit complaints via a form with fields for title, description, category, and priority.  
- Receive email notifications upon complaint submission.  

### Admin Features  
- View all complaints in a table with details like title, category, priority, date submitted, and status.  
- Update the status of complaints (Pending, In Progress, Resolved).  
- Filter complaints by status or priority.  
- Receive email notifications when complaints are submitted or updated.  

### Additional Features  
- Email notifications implemented using NodeMailer.  
- Responsive UI design for mobile and desktop views.  
- JWT-based authentication for secure access (optional).  

## Tech Stack  
- **Frontend:** React.js  
- **Backend:** Node.js, Next.js  
- **Database:** MongoDB  
- **Email Notifications:** NodeMailer  

## Installation Instructions  

### Prerequisites  
- Node.js (v14+ recommended)  
- MongoDB instance (local or cloud-based, e.g., MongoDB Atlas)  

### Setup  
1. Clone the repository:  
   ```bash  
   git clone https://github.com/Saikiran6645/Complaint_Management_System.git  
   cd complaint-management-system

## Install dependencies for the backend and frontend:
    ```bash
     cd backend  
     npm install  
     cd ../frontend  
     npm install
## Configure environment variables:
    ```bash
      MONGO_URI=your_mongodb_connection_string  
      JWT_SECRET=your_jwt_secret_key  
      SMTP_USER=your_smtp_username  
      SMTP_PASS=your_smtp_password  
      ADMIN_EMAIL=admin_email_address@example.com 
  - while sending you need to add SMTP Host and SMTP Port
## Start the application:
    ```bash
    #Frontend:
      cd backend  
      npm run dev  
    #Backend:
      cd frontend  
       npm start  
## API Endpoints
  - User Endpoints
  - POST /complaints: Create a new complaint.
## Admin Endpoints
  - GET /complaints: View all complaints.
  - PUT /complaints/:id: Update complaint status or details.
  - DELETE /complaints/:id: Delete a complaint

## Live Demo  
The live version of the application is hosted [here](https://complaint-management-system-sa59.vercel.app/login).  


      


  

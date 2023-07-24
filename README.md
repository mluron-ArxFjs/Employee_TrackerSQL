# Employee_TrackerSQL
Module 12 Challenge (SQL)
## Table of Contents

*  [Description](#Description)
           <a name="Description"></a>
*  [Screenshots](#Screenshots)
          <a name="Screenshots"></a>
*  [Technologies-Used](#Technologies-Used)
          <a name="Technologies Used"></a>           
*  [Installation](#Installation)
          <a name="Installation"></a>          
*  [Usage-Information](#Usage-Information)
          <a name="Usage-Information"></a>        
*  [Contact](#Contact-me)
          <a name="Questions"></a> 
          

##  Description 
This application enables business owners to efficiently manage departments, roles, and employees within their company. The database is built with MySQL and seamlessly interacts with JavaScript through the sequelize dependency. By utilizing this approach, the need for complex and convoluted query statements is eliminated, despite the initial effort required for file structuring and table connections.
While coding this App, I became proficient in joining tables and manipulating data using the .map() function to achieve desired displays. Additionally, I deepened my understanding of the inquirer dependency and accessing specific object data.

##  Live Screen Recording & GitHub Repo link 
https://drive.google.com/file/d/1SEj024TQ-lN3wZYpJ250jYrjDMwjBUdM/view?usp=sharing
https://github.com/mluron-ArxFjs/Employee_TrackerSQL

## Technologies Used
This application leverages Node.js, JavaScript, and SQL to operate. It makes use of several dependencies from the node package manager (npm), including Express, mysql2, inquirer (v8.2.4), and asciiart-logo.

## Installation
Install the dependencies associated with this application using the terminal and the npm i command. Developers may need to install dependencies directly from the command line.

* To install express, run the command npm i express.
* To install mysql2, run the command npm i mysql2.
* To install asciiart-logo, run the command npm i asciiart-logo.
* To install Inquirer version 8.2.4, run the command npm i inquirer@8.2.4.


Once all the dependencies are installed, you need to create the database. Navigate to the "db" directory containing the "schema.sql" and "seeds.sql" files using the terminal. Then, open a MySQL shell and run the command source schema.sql to create the database and source seeds.sql to populate the tables.

Once the database has been seeded, you can run the command npm start from the root directory to start the application.

## Usage Information

The utilization of this application is highly intuitive. When initializing npm start, the user will be presented with options. These choices empower the user to perform tasks such as accessing and observing all Employee tables, adding new entries for Departments, Roles, or Employees into the database, or updating Employees Role or updating the Manager of a specific Employee.

In the event that the user chose to add or update information in the database, their chosen modifications will be immediately visible when they subsequently view the corresponding table that has been updated.


## Contact me
- [GitHub](https://github.com/mluron-ArxFjs)

- ![](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)mluron2@gmail.com

# MoviesApplication

Technologies used in the coding test
------------------------------------
Client: Angular 8.0.1
Server: ASP .Net Core 2.1
Database: Sql Server 2014
ORM: EF Db First

The technologies were selected according to the order of preference specified in the coding test. 

I considered Angular for developing the UI because it is a robust framework for creating responsive interfaces. One of its main features is two-way data binding 
along with the use of directives and dependency injection. It is also component oriented allowing reusability of functionalities. Besides, the programming 
style used in Angular and the application of TypeScript help writing cleaner code.

On the other hand, I selected ASP .Net Core because it is a lightweight framework which can be installed on multiple platforms. In addition, it supports
built-in dependy injection and currently it is compiting in the market as an open source project.


Installation instructions
-------------------------
1- After downloading the source code for both the client and the server, modify the connection string located in the appsettings.json file on the server 
2- Go to the folder MovieServices and build the server project using the command 'dotnet build'
3- Start the server by using 'dotnet run'. The server application should start in http://localhost:5000
4- Use 'npm install' for downloading the node modules to the project
5- Start the client by using the command 'ng serve'. The client application should start in http://localhost:4200

Design Patterns
---------------
The design patterns that were used in the coding tests are:

-Dependency Injection: Used in both client and server with the DI provided by both Angular and .Net Core.
-Repository Pattern: This pattern was used at the data access layer on the server.
-MVC using Angular.
-Layer oriented architecture.
-S.O.L.I.D principles: It was considered for both applications by using different layers, classes, interfaces and modules.

Assumptions
-----------
-The field code name should not accept any special characters.
-The field slug should not accept any special characters except dashes(-).
-According to the requirement 4.b. "...display the first duplicated Movie name in edit mode (based on alphabetical order descending)", the field considered for ordering is code name.
-All fields of a movie are required: Name, Gender, Slug, Code-name.
-Names can be duplicated when a movie is being created or updated, excluding the case when it is being updated due to conflicts.
-Movies in the table are displayed in no particular order.
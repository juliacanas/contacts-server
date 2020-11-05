# Contacts App
It is an application that allows to authenticate a user to access to his contact area. In this area his contacts will appear ordered alphabetically and paginated. The user can filter by initial letter or through the superior searchbar.
Each contact will show their connections that will appear on the right side, also ordered alphabetically and also with a searchbar to filter them.
By selecting a contact from this list of connections, their connections will be shown in turn, and so on, the path followed will appear in the breadcrumb being marked in the upper margin of the list.
The user has the possibility of logging out, entering in the user section in the upper right margin of the screen.


# Quick Start

Clone this repo:

`$ git clone https://github.com/juliacanas/contacts-server.git`

Install all necessary dependencies:

`$ npm install`

Finally run:

`$ npm start`

# Folder Structure

```bash
├── controllers
│   └── authController.js
├── data
│   ├── contacts.json
│   └── loginUsers.json
├── helpers
│   ├── jwt_helper.js
│   └── validation_schema.js
├── routes
│   ├── auth.js
│   └── contacts.js
├── package.json
├── package-lock.json
├── rest.http
└── server.js

```
# Important information

* In the **data folder** of the project, there is a json file called **loginUsers.json** There are 3 users mocked to be able to login to the application.
* I have created a **.env.example** file to share the environment variables as an example
* Once the server is started, you can test the routes using a file **rest.http** where the configuration of the routes is prepared. It is only necessary to fill in the necessary information for the requests.

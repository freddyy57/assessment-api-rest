# Assessment API REST
1.- Please first install all dependencies With the command:
```
npm install
```

*How to run the server?*
```
npm start

```

*Test*
```
npm run test

```
#How this Assessment API REST Works?
 *LOGIN*
 Method: POST

 *EndPoint Example:* http://localhost:3000/login

- You need to privide authorization credentials on the body of the request:
{
  "clientID": "clientID",
  "clientSecret": "ClientSecret"
}
Login provide us with double authentication, on the one hand the provider of the services and on the other the same AP Authorization

#*Get Clients*
*EndPoint Example:* http://localhost:3000/clients?page=3&limit=10

This page gives us clients paged the way we want. By default from 10 to 10, but if we change the values ​​of the parameters: page and limit we can move through the records obtaining the assigned values. We also provide the following values: -Next page (if any) -Previous page (If there is one) Number of records

#*Get Client By ID*
Method: GET

*EndPoint Example:* http://localhost:3000/clients/7c669276-b8a1-44ff-88d9-7a88a2bbfe94

This endpoint provides us with a particular client by providing the id of the client in the url path as last parameter

#*Get Clients By Name*
Method: GET

*EndPoint Example:* http://localhost:3000/clients/clientName/Britney

This endpoint provides us with clients with the same name, providing the name of the client in the url path as last parameter.

*Policies of a Particular Client*
Methos: GET

*EndPoint Example:* http://localhost:3000/clients/e8fd159b-57c4-4d36-9bd7-a59ca13057bb/policies

#*POSTAMN Documentation*
https://documenter.getpostman.com/view/3111381/TWDZFvHs





# NestJs-Types-Over-The-Wire
A clean way to send Dates, ObjectIds, and other types between front and back-end. 

### Problem We're Trying To Solve Here



## Usage

made with node v13.14.0

First install [nvm](https://github.com/nvm-sh/nvm), then run this in the root folder:
```
nvm use
```

The ___backend___ directory contains a NestJS project.

Start the backend server locally at `http:localhost:3000` by running this in the `backend` directory:
```
npm start
```


The ___frontend___ folder contains an Angular project.

Start the frontend server locally at `http:localhost:4200` by running this in the `frontend` directory:
```
npm start
```

<br/>

<br/>

Now, go to `http:localhost:4200` and click the button on the page.

Notice the response that's displayed on the page and that "isDate" is true. This means that our angular code is seeing it as a "Date" type everywhere in our code because we the "@Type" decorator is used to transform the string to a Date immediately when it comes back (in the map).

Notice how if we remove any of the @Type decorators in the `response.models` file then is shows "createdDate" as a string and not a date.

If we use the Decorators here then we immediately get a response with the types we want by doing this fancy mappage:
```
pipe(map(res => plainToClass(FirstResponse, res as Object)))
```

In the above code the "pipe(map(" is a somewhat ugly rxjs syntax for mapping over the response(s). 

The key thing to recognize is that the objects come as an object literal with string keys and string values, a "plain" as they say in the class-transformer library docs and api.

So, the "plainToClass" function takes a plain and returns a class instance whose property values are converted to the type you define in the @Type decorator's argument.

The `res as Object` is because "plainToClass" takes a plain old object. We plain is our response as that plain old object, but we need to make TypeScript happy by casting it as an Object rather than the "FirstResponse" type is it inferring.

Notice how in the console the date logged out on the console does not look like a string and the instance checks print out "true".



___









 scaffolded with the Nest cli using npm: 
```
nest new backend
```

The "frontend" folder contains an Angular project scaffolded with the Angular cli with routing and scss styles: 
```
ng new frontend
```
# Endpoints

## Signup

http://localhost:4000/api/user/signup

sample request body:

```sh
{
"firstname":"kalana",
"lastname":"hettiarachchi",
"username":"calculus",
"email":"kalana.hettiarachchi@immunify.me",
"password":"hello"
}
```

## Signin

http://localhost:4000/api/user/signup

sample request body:

```sh
{
"email":"kalana.hettiarachchi@immunify.me",
"password":"hello"
}
```

## User profile route

http://localhost:4000/api/user/profile

- in order to access this route first you need to sign in to your account using above signin API and get the token from the response.
- Then access this endpoint (http://localhost:4000/api/user/profile) by setting Authorization header with this token. (ex: Authorization: Bearer token )

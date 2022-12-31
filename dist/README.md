# Node.js Boilerplate

This is a boilerplate project for a Node.js server that includes a REST API and Socket server. The server can be configured via a `.env` file.

## Prerequisites

Before you begin, make sure that you have the following installed on your system:

- Node.js
- npm or yarn

## Installation

1. Clone the repository:

```
git clone https://github.com/user/nodejs-boilerplate.git
```


2. Install the dependencies:

```
npm install
or
yarn
```


3. Configure `.env` file in the root of the project and to configure the following properties

### Port
The port number of the REST API server, leaving it empty will disable all of the endpoints
*Default*: 3000

### Socket port
The port number of the socket server, leaving it empty will disable all of the endpoints.
*Default*: 3000

### Node ENV
A variable that you can use to specify specific code to run dependent on the environment it is being executed in
*Default*: development

### CORS
A comma separated list with urls from which the the server accept requests
*Default*: *



## Usage

To start the server, run the following command:


```
npm start
or
yarn start
``` 


The server will start listening on the specified port for HTTP requests and Socket connections.

## API Endpoints

The REST API has the following endpoints:

- `GET /`: Returns a "Api server running" message.
- `POST /test`: Accepts a message in the request body and returns a "Test successfull" message, it also emits a socket message to `test` with the same message.

## Socket Events

The Socket server has the following events:

- `connection`: Triggered when a client connects to the server.
- `test`: Returns the message that the client has send to the 'test' endpoint.

## License

Copyright © 2023 <Jeffrey Arts>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

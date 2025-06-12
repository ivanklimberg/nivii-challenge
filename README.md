# Nivii Challenge

## Setup Instructions

First you have to have Docker (>=v27.4.0) and docker-compose (>=v2.31.0) installed on your machine.
After that you should create 3 `.env` files:

the first one should be located on the root directory and should contain the following variables

```
DB_PASSWORD=testeo123 #ROOT USER DATABASE PASSWORD, PUTTING A RANDOM ONE SO IT WORKS OUT-OF-THE-BOX
DATABASE=nivii_challenge #DATABASE NAME SHOULD BE nivii_challenge TO MATCH THE DATABASE SCRIPTS UNDER db_scripts
```

the second one should be located on the `frontend` directory and should contain the following variables:

```
VITE_API_BASE_URL=http://localhost:5001 # PORT WHERE THE BACKEND APP WILL RUN
```

the third and last one should be located on the `backend` directory and should contain the following variables:

```
OPENAI_API_KEY= #YOUR OPEN API KEY

APP_NAME=nivii-challenge-api

DB_HOST=db # THE NAME OF CONTAINER WHERE THE DB IS LOCATED
DB_PORT=3306 # KEEP THE PORT 3306, THIS ONE WILL BE THE EXPOSED ONE BY THE DB CONTAINER
DB_USER=root # THE ROOT DB USER
DB_PASSWORD=testeo123 # THE ROOT DB PASSWORD, SAME AS THE FIRST .ENV
DATABASE=nivii_challenge # THE DATABASE NAME, SAME AS THE FIRST .ENV

LOG_LEVEL=INFO #CHANGE TO DEBUG FOR ADDITIONAL LOGS
```

After that run the following command:

```
docker compose up --build
```

This will:

- Create a container for the DB using MySQL (v8.0), create a database, based on the `.env` variable `DATABASE` of the root directory, and run the scripts in order inside db_scripts
- Create a container for the FrontEnd App (React v19.1.0 and Vite v6.3.5) and run it on the port `5173`
- Create a container for the BackEnd App (Python v3.11.6 slim) and run it on the port `5001`

## Design decisions

### Backend

I chose to build a simple 2 layered API using **Flask** with a blueprints directory that holds the resposability of managing status codes, basic validation of models and gluing everything related to the business logic.
Then a services directory managing everything that has to do with business logic and database logic. This was done to maintain the code simple.

In case the code gets more complex I would split the database logic into a separate repositories folder so it can be consumed by the services above, changing it to a 3 layer API.

I also implemented the following items to help debugging and ease maintenance:

- An abstract class, used as an interface, called `ai_request_service.py` to simplify changing the AI provider below. _The same should be done with the `db_access_service.py` in case the app gets more complex._
- Unified response format with `success` on every response to help the front manage responses accurately.
- Unified error catching on main using `@app.errorhandler(Exception)` to prevent unnecesary try...except on the code.
- Unified log for all requests on main using `@app.before_request`
- Enriched log with `EXECUTION_ID` to help follow up specific requests and error traces.
- Specific `DEBUG` logs with extra information to help debugging in case it's needed.

### Frontend

For the front app I chose React TS and Vite, with React Router for routing and Axios for requests. The division of responsibilities in here is:

- `api-consumer`: Directory containing everything related to API requests, with a baseAPI holding the configuration to simplify making requests.
- `helpers`: Static tools useful for implementation.
- `components`: Reusable components and Complex ones to encapsulate behavior.
- `interfaces`: Interfaces and Types to ensure the proper use of `Typescript`
- `routes`: Main components representing each one a differente page/route.

The app uses [Ant Design](https://ant.design/) as a component library to keep a clean and focused look, the idea is to keep the user focused on what matters on each page, without too many components distracting him/her.

## How would I scale it

### Code

- I would not have the API call directly into the AI model but instead **I would split them in 2 separate apps communicated by a Queuing System** (AWS SQS, Rabbit MQ, Apache Kafka, etc). This is done to ensure:

  - Requests not failing due to timeout for long queries
  - Requests not failing due to long processing on some complex prompt.
  - A decent retry loop
  - Division of responsability, helping horizontally scale which part needs to.

  **How will this happen?**

  1. The API will receive a request for a prompt, it will save it into the database , send a message to the queue and return the main identifier for that process.
  2. The Suscriber app, listening to that queue, will receive the message, execute the prompt and the query and update it into the DB.
  3. If the user is in the page of that request, the Front App will request every _N_ time news about that specific and once it's updated it will return the requested data to the user.

- For large datasets I would monitor the queries used, specifically the columns for the joins, group bys and where clauses, to add composite indexes.

### Infrastructure

- I would create multiple instances of the API and to ensure uptime for multiple users of the API, I would put them behind an **AWS Elastic Load Balancer**. All requests should be done to that ELB, ensuring that all requests are managed by the ELB and sent to different instance based on the available RAM and CPU usage.
- The database wouldn't be inside a container but on an **AWS Relational Database Service** with autoscaling and **Slow Query Log** enabled to improve the queries that are causing our database to have CPU/RAM peaks.

# AWS Lambda - TypeScript sample project

Experimental project using TypeScript and AWS Lambda to build serverless application which has three endpoints 
to fetch all items, fetch one item by its id value and create a new item. 

# For AWS environment, we need to install the following:
 - [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
 - [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html)
 - [Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
 - [Docker](https://docs.docker.com/engine/install/)

# Running locally

If you run `npm run build` from the project’s root, you should see the build folder, .aws-sam, created.

We will now start a local HTTP server to test our AWS Lambda function:
`sam local start-api`
The console should show that the function gets mounted in a Docker container before it runs

We can now go to browser and test endpoint which finds all items with [localhost:3000/api](localhost:3000/api)

# Generate GitHub Actions CI/CD pipeline

Run `sam pipeline init --bootstrap` and follow instructions to create GitHub Actions pipeline configuration
For CI/CD pipeline you have to have AWS credentials in GitHub. Look `pipeline.yaml` file which ones are needed

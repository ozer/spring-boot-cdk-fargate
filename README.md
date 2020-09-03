# Welcome to Dolap, Simple Rest API built with Spring Boot which then gets deployed to AWS Fargate.

### Examples
- Authentication with JWT
- Unit & Integration Tests
- Deploying Spring Boot App to AWS Fargate via CDK

### Deploy Plan
- CDK is being used to create a CloudFormation Template.
- Go to `dolap.ts` inside `cdk/bin`, see `account` and `region` base options.
- `Secrets` referenced in `dolap-stack.ts` inside `cdk/lib`, will be given by Secrets of the repository.
- To be able to deploy via GitHub Actions, you also need to set your `AWS Secrets`.
- Create an `IAM User` with `administrator` privileges. I haven't found an util to create a IAM privileges template depending on services you deploy via CDK.
- Therefore, It might best to try with a free tier account instead a real product acc at first.
- Put your `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_ACCOUNT` credentials to `Secrets` in settings in your repo. 
- `DO NOT FORGET TO SET YOUR SECRETS IN SECRETS SETTINGS OF THE REPO` If you aim to deploy via CDK to AWS via GitHub Actions.
- #### `IMPORTANT`
- I did not configure NAT Gateway to avoid extra bills as this is an open source thing.
- If you have security concerns with your app or it's real app, do not forget to put your stack behind a NAT Gateway in VPC Settings.

### How to Run Spring Boot App?
#### Quick Way
- Go to `application.properties` file in spring boot app and fill it with your credentials.

#### What If We have secrets?
- Navigate into dolap folder and then, find create .env file.
- Fill your secrets, have a look at `application.properties` it'll give you info about how to reference the secrets.
- Run `export $(cat .env | xargs)` and then, run `mvn spring-boot:run`.
- Optionally, you can run `SPRING_DATABASE_URL=url other-secrets mvn spring:boot run`.
- If you fill the credentials which work, your app should start successfully.
- The connection is tested with AWS RDS so, you can use it confidently. 


### Docker commands
- `docker build -t dolap .`
- `docker run -p 8080:8080 -e SPRING_DATASOURCE_URL=jdbc:postgresql://AWS-RDS-URL:5432/postgres -e SPRING_DATASOURCE_USERNAME=postgres -e SPRING_DATASOURCE_PASSWORD=password dolap`
- Note: We'll pass secrets in CI when we deploy, see above.

### Feel free to reach out to me or open an issue if you have any question or suggestion.
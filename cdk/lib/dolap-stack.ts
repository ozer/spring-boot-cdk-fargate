import {Stack, StackProps, Duration, Construct, App} from "@aws-cdk/core";
import {SubnetType, Vpc} from "@aws-cdk/aws-ec2";
import {AwsLogDriver, Cluster, ContainerImage, FargateService, FargateTaskDefinition} from "@aws-cdk/aws-ecs";
import {ApplicationLoadBalancer} from "@aws-cdk/aws-elasticloadbalancingv2";

export class DolapStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        // Virtual Private Cloud
        // @ts-ignore
        const vpc = new Vpc(this, "DolapVPC", {
            cidr: "11.180.0.0/16",
            maxAzs: 2,
            natGateways: 0,
            vpnGateway: false,
            subnetConfiguration: [
                {
                    name: "dolap-subnet-1",
                    subnetType: SubnetType.PUBLIC,
                },
            ],
        });

        // Cluster
        // @ts-ignore
        const cluster = new Cluster(this, "DolapCluster", {
            vpc,
            clusterName: "dolap-cluster",
        });

        // Application Load Balancers
        const dolapAPIALB = new ApplicationLoadBalancer(
            // @ts-ignore
            this,
            "DolapAPIALB",
            {
                vpc,
                internetFacing: true,
                loadBalancerName: "dolap-api-alb",
            }
        );

        // Image referencing, you could reference from ECR as well,
        // We want to simplify things as now.
        const dolapApiImage = ContainerImage.fromAsset("../dolap");

        // Task Definition
        const dolapAPITaskDefinition = new FargateTaskDefinition(
            // @ts-ignore
            this,
            "DolapAPITaskDefinition",
            {
                memoryLimitMiB: 2048,
                cpu: 1024,
            }
        );

        // Container Definition
        const dolapAPIContainer = dolapAPITaskDefinition.addContainer(
            'dolap-api-container',
            {
                image: dolapApiImage,
                environment: {
                    // GitHub Actions will get these from Secrets settings of the repository.
                    SPRING_DATASOURCE_URL: process.env?.SPRING_DATASOURCE_URL || ":(",
                    SPRING_DATABASE_USERNAME: process.env?.SPRING_DATASOURCE_USERNAME || ":(",
                    SPRING_DATABASE_PASSWORD: process.env?.SPRING_DATASOURCE_PASSWORD || ":("
                },
                cpu: 1024,
                memoryLimitMiB: 2048,
                logging: new AwsLogDriver({ streamPrefix: "dolap-api" }),
            }
        );

        // Our Spring Boot App runs on 8080 Port.
        dolapAPIContainer.addPortMappings({ containerPort: 8080 });

        // Fargate Service - We want only one task to be deployed as we want things to be simple.
        // @ts-ignore
        const dolapAPIService = new FargateService(this, "CSGraphQLAPIService", {
            cluster,
            serviceName: "DolapAPIService",
            taskDefinition: dolapAPITaskDefinition,
            desiredCount: 1,
            assignPublicIp: true,
        });

        // Load Balancer will listen port 80.
        const dolapAPIALBListener = dolapAPIALB.addListener(
            "DolapAPIALBListener",
            { port: 80 },
        );

        // Target Group
        // - Remember our health check endpoint was /health.
        // - Remember our spring boot api runs on port 8080.
        const graphQLApiTargetGroup = dolapAPIALBListener.addTargets(
            "DolapAPITargetGroup",
            {
                port: 80,
                targetGroupName: "dolap-api-tg-name",
                healthCheck: {
                    interval: Duration.seconds(60),
                    timeout: Duration.seconds(7),
                    port: "8080",
                    path: "/health",
                },
                targets: [
                    dolapAPIService.loadBalancerTarget({
                        containerName: 'dolap-api-container',
                        containerPort: 8080,
                    }),
                ],
            }
        );
        

    }
}
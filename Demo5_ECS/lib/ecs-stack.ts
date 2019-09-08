import cdk = require('@aws-cdk/cdk');

import ec2 = require('@aws-cdk/aws-ec2');
import ecs = require('@aws-cdk/aws-ecs');
import elbv2 = require('@aws-cdk/aws-elasticloadbalancingv2');

export class EcsStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.VpcNetwork(this,'VPC');

    // Create an ECS cluster
    const cluster = new ecs.Cluster(this, 'Cluster', {
      vpc,
    });

    // Add capacity to it
    cluster.addCapacity('Capacity', {
      instanceType: new ec2.InstanceType("t2.xlarge"),
      minCapacity: 1,
      desiredCapacity: 1
    });

    const taskDefinition = new ecs.Ec2TaskDefinition(this, 'TaskDef', {
      networkMode: ecs.NetworkMode.Bridge
    });

    const container = taskDefinition.addContainer("WSO2Container", {
      image: ecs.ContainerImage.fromDockerHub("sugupta/wso2am:2.5.0"),
      memoryLimitMiB: 2048,
      cpu: 1024
    });
    
    container.addPortMappings({
      containerPort: 9443,
      hostPort: 9443
    });   
    
    const service = new ecs.Ec2Service(this, 'Service', {
      cluster,
      taskDefinition,
      desiredCount: 1
    });

    const lb = new elbv2.ApplicationLoadBalancer(this, 'LB', { vpc, internetFacing: true });
    const listener = lb.addListener('Listener', { port: 443 });

    listener.addTargets('ECSHttps', {
      port: 9443,
      protocol: elbv2.ApplicationProtocol.Https,
      targets: [service],
      healthCheck: {
        path: '/services/Version',
        intervalSecs: 60,
      }
    });    
    listener.addCertificateArns('certificate',["arn:aws:acm:eu-west-1:905584838893:certificate/4d22ec6a-3937-4691-981a-ae768d4c248d"]);
  }
}

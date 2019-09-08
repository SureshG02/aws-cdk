# What is AWS CDK?
The AWS CDK is an infrastructure modeling framework that allows you to define your cloud resources. Compared to the declarative approach with YAML (or JSON), the CDK allows you to declare your infrastructure imperatively. The main language is TypeScript, but several other languages are also supported. The CDK is currently in developer preview.

Stack can be packaged as npm or jar and shared with other team. It’s built on top of aws cloudformation.
  
Demo1_LB: Creates a Load balancer and it’s security group via cloud formation.

Demo2_SNSAndSQS: Creates a stack with an SQS queue, SNS topic, subscribes the queue to the topic, and sets a CloudWatch metric and alarm on the SQS queue.

aws sqs send-message --queue-url "https://sqs.eu-west-1.amazonaws.com/905584838893/SnssqsDemoStack-HelloCdkQueueB56C77B9-1PCLA9GLJGQY6" --message-body "Hello-World"

Demo3_LambdaAndS3: Creates a stack with lambda function and s3 bucket. S3 bucket ObjectRemoval and ObjectDelete event is configured to invoke lambda function.

Demo4_ExportS3: Export S3 bucket from one stack to other stack.

Demo5_ECS: Creates a stack with ECS having service which runs WSO2 APIM product. Once stack is created go to Loadbalancer and check target health status. Once it's in healthy state hit https://LBDNSNAME/carbon it should launch login screen for WSO2 APIM.

References:
https://docs.aws.amazon.com/code-samples/latest/catalog/code-catalog-typescript-example_code-cdk.html

https://awslabs.github.io/aws-cdk/reference.html

https://docs.aws.amazon.com/CDK/latest/userguide/what-is.html

https://cdkworkshop.com/15-prerequisites.html

To perform this exercise, you’ll need the following:

AWS CLI

AWS Account and User

Node.js

IDE for TypeScript

AWS CDK Toolkit

You can skip any of these steps if you have these tools already installed on your machine.


 # Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template
 
mkdir aws-cdk && cd aws-cdk

cdk init --language typescript

npm run watch

cdk synth

cdk bootstrap (Run this command only once before you deploy your first app.)

cdk deploy


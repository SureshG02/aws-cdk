import cdk = require('@aws-cdk/cdk');

import s3 = require('@aws-cdk/aws-s3');
import lambda = require('@aws-cdk/aws-lambda');
import s3Event = require('@aws-cdk/aws-lambda-event-sources');


export class LambdaDemoStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    // The code that defines your stack goes here
    const bucket = new s3.Bucket(this,'MyDigiaBucket');
    const fn = new lambda.Function(this,'MyDigiaLambda',{
        code: lambda.Code.asset('lambda'),
        handler: 's3event.handler',
        runtime: lambda.Runtime.NodeJS810
    });
    fn.addEventSource(new s3Event.S3EventSource(bucket,{
        events: [s3.EventType.ObjectCreated, s3.EventType.ObjectRemoved]
    }))
  }
}

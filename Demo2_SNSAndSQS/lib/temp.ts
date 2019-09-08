import cdk = require('@aws-cdk/cdk');
import sns = require('@aws-cdk/aws-sns');
import sqs = require('@aws-cdk/aws-sqs');
import cloudwatch = require('@aws-cdk/aws-cloudwatch');

export class SnssqsDemoStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
     const queue = new sqs.Queue(this, 'MyCDKQueue',{
        visibilityTimeoutSec:300
     });

     const topic = new sns.Topic(this, 'MyCDKTopic', {
        displayName: 'MyCDK subscription topic'
    });

    topic.subscribeQueue(queue);

    const qMetric = queue.metric("ApproximateNumberOfVisibleMessage");

    //Raise an alarm when there are more than 2 messages available in last 2 seconds of 5 seconds.
    new cloudwatch.Alarm(this, 'Alarm',{
        metric: qMetric,
        evaluationPeriods: 5,
        threshold: 2,
        datapointsToAlarm:2 
    });   
  }
}

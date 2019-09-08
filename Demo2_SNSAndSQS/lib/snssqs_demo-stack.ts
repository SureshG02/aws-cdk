import cdk = require('@aws-cdk/cdk');

import cloudwatch = require('@aws-cdk/aws-cloudwatch');
import sns = require('@aws-cdk/aws-sns');
import sqs = require('@aws-cdk/aws-sqs');


export class SnssqsDemoStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const queue = new sqs.Queue(this, 'HelloCdkQueue', {
      visibilityTimeoutSec: 300
    });
    const topic = new sns.Topic(this, 'HelloCdkTopic');
    topic.subscribeQueue(queue);
    // Raise an alarm if we have more than 2 messages available for retrieval 
    // in two of the last five seconds
    const qMetric = queue.metric('ApproximateNumberOfMessagesVisible');
    new cloudwatch.Alarm(this, 'Alarm', {
      metric: qMetric,
      threshold: 2,
      evaluationPeriods: 5,
      datapointsToAlarm: 2,
    });
    
  }
}

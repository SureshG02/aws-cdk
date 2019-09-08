import cdk = require('@aws-cdk/cdk');
import s3 = require('@aws-cdk/aws-s3');

export class ExportDemoStack extends cdk.Stack {
  // Property that defines the stack you are exporting from
  public readonly myBucketImportProps: s3.BucketImportProps;

  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, 'MyFirstBucketCDK')
    this.myBucketImportProps = bucket.export();
    // The code that defines your stack goes here
  }
}

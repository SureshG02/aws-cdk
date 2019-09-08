import cdk = require('@aws-cdk/cdk');
import s3 = require('@aws-cdk/aws-s3');
//import MyCdkStackProps = require('./MyCdkStackProps');
import {MyCdkStackProps} from './MyCdkStackProps';

export class MyCdkStack extends cdk.Stack {
    constructor(scope: cdk.App, id: string, props: MyCdkStackProps) {
      super(scope, id);
  
      //const myOtherBucket = 
      s3.Bucket.import(this, "MyOtherBucket", props.theBucketImportProps);

      // Do something with myOtherBucket
    }
  }
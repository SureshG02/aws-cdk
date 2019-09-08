import s3 = require('@aws-cdk/aws-s3');

// Interface we'll use to pass the bucket's properties to another stack
export interface MyCdkStackProps {
    theBucketImportProps: s3.BucketImportProps;
}
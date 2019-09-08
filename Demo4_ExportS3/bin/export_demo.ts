#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/cdk');
import { ExportDemoStack } from '../lib/export_demo-stack';
import { MyCdkStack } from '../lib/MyCdkStack'

const app = new cdk.App();
const exportStack = new ExportDemoStack(app, 'ExportDemoStack');

new MyCdkStack(app, "MyCdkStack", {
    theBucketImportProps: exportStack.myBucketImportProps
  });
app.run();

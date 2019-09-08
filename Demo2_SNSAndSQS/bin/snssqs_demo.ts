#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/cdk');
import { SnssqsDemoStack } from '../lib/snssqs_demo-stack';

const app = new cdk.App();
new SnssqsDemoStack(app, 'SnssqsDemoStack');
app.run();

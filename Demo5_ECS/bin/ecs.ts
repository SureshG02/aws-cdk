#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/cdk');
import { EcsStack } from '../lib/ecs-stack';

const app = new cdk.App();
new EcsStack(app, 'EcsStack');
app.run();

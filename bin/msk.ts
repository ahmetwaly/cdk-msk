#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { MskStack } from '../lib/msk-stack';

const app = new cdk.App();
new MskStack(app, 'MskStack');

#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { SpringBootDolapStack } from '../lib/spring-boot-dolap-stack';

const app = new cdk.App();
new SpringBootDolapStack(app, 'SpringBootDolapStack');

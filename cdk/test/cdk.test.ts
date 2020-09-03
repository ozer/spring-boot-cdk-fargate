import { expect as expectCDK, haveResource } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as Cdk from '../lib/dolap-stack';

test('VPC Created', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new Cdk.DolapStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(haveResource("AWS::VPC",{
        VisibilityTimeout: 300
    }));
});
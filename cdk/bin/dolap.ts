#!/usr/bin/env node
import * as cdk from "@aws-cdk/core";
import { App } from "@aws-cdk/core";
import { DolapStack } from "../lib/dolap-stack";

const app = new App();

new DolapStack(app, "DolapStack", {
  stackName: "DolapStack",
  env: {
    region: "eu-central-1",
    account: process.env.AWS_ACCOUNT
  },
});

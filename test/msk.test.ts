import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import Msk = require('../lib/msk-stack');

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new Msk.MskStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});

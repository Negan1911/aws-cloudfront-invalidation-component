/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')
const AWS = require('aws-sdk')
const { Component, utils } = require('@serverless/core')

module.exports = class NextDeployment extends Component {
  async default(input) {
    const cloudfront = new AWS.CloudFront()
    const { stateRoot } = this.context.instance
    const cf_file = fs
      .readdirSync(stateRoot)
      .find((_) => _.endsWith('.CloudFront.json'))

    if (cf_file) {
      const cf = JSON.parse(fs.readFileSync(path.join(stateRoot, cf_file)))

      const invalidation = await cloudfront
        .createInvalidation({
          DistributionId: cf.id,
          InvalidationBatch: {
            CallerReference: utils.randomId(),
            Paths: {
              Quantity: input.paths.length,
              Items: input.paths,
            },
          },
        })
        .promise()

      return invalidation.Invalidation
    }

    throw new Error('No Cloudfront file found.')
  }
}

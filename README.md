# Invalidation Component
This component will invalidate a saved Cloudfront distribution when called, it's meant to be used with [@serverless/aws-cloudfront](git@github.com:serverless-components/aws-cloudfront.git)

# Usage
On your custom component, after making use of `@serverless/aws-cloudfront`, you can call this component in this way:

```js
  const cf_invalidate = await this.load('aws-cloudfront-invalidation-component')
  await cf_invalidate.default({ paths: ['/a/path', '/another/path'] })
```

That's it. We'll pick the distribution from the state that `@serverless/aws-cloudfront` left on the `.serverless/` folder.
A minimal repository for https://github.com/nestjs/graphql/issues/440

Run using `npm run start``

Go to localhost:3000/graphql

use this in the playground:

```
subscription subscribeToNewPost {
  subscribeToNewPost {
    id
    text
  }
}

mutation createPost {
  createPost(text: "Hello World") {
    id
    text
  }
}
```

When `createPost` mutation is called, the subscription returns

```
{
  "errors": [
    {
      "message": "Cannot read property 'find' of undefined",
      "locations": [
        {
          "line": 9,
          "column": 3
        }
      ],
      "path": [
        "subscribeToNewPost"
      ],
      "extensions": {
        "code": "INTERNAL_SERVER_ERROR",
        "exception": {
          "stacktrace": [
            "TypeError: Cannot read property 'find' of undefined",
            "    at PostResolver.resolve (/Users/petr/Projects/Applifting/subscription-problem-minimal-repo/dist/post/post.resolver.js:55:37)",
            "    at field.resolve (/Users/petr/Projects/Applifting/subscription-problem-minimal-repo/node_modules/graphql-extensions/dist/index.js:133:26)",
            "    at resolveFieldValueOrError (/Users/petr/Projects/Applifting/subscription-problem-minimal-repo/node_modules/graphql/execution/execute.js:467:18)",
            "    at resolveField (/Users/petr/Projects/Applifting/subscription-problem-minimal-repo/node_modules/graphql/execution/execute.js:434:16)",
            "    at executeFields (/Users/petr/Projects/Applifting/subscription-problem-minimal-repo/node_modules/graphql/execution/execute.js:275:18)",
            "    at executeOperation (/Users/petr/Projects/Applifting/subscription-problem-minimal-repo/node_modules/graphql/execution/execute.js:219:122)",
            "    at executeImpl (/Users/petr/Projects/Applifting/subscription-problem-minimal-repo/node_modules/graphql/execution/execute.js:104:14)",
            "    at execute (/Users/petr/Projects/Applifting/subscription-problem-minimal-repo/node_modules/graphql/execution/execute.js:64:63)",
            "    at mapSourceToResponse (/Users/petr/Projects/Applifting/subscription-problem-minimal-repo/node_modules/graphql/subscription/subscribe.js:75:33)",
            "    at /Users/petr/Projects/Applifting/subscription-problem-minimal-repo/node_modules/graphql/subscription/mapAsyncIterator.js:76:20"
          ]
        }
      }
    }
  ],
  "data": null
}
```

However, if you remove the requestScoped service from PostResolver...

```
(...)
@Resolver('Post')
export class PostResolver {
  constructor(
    private readonly postService: PostService,
    // private readonly requestScopedService: RequestScopedService,
  ) {}

  (...)
```

It works.

```
{
  "data": {
    "subscribeToNewPost": {
      "id": "abc",
      "text": "blah"
    }
  }
}
```

This makes it effectively impossible to use filter and resolve methods when the Resolver injects a request-scoped provider, even if that is not a provider you need in the context of the resolve/filter method.

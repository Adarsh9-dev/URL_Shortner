# URL Shortener

## Scalable URL Shortener Project Requirement

## Phase I

URL shortening is used to create shorter aliases for long URLs. We call these shortened aliases "short links." Users are redirected to the original URL when they hit these short links. Short links save a lot of space when displayed, printed, messaged, or tweeted. Additionally, users are less likely to mistype shorter URLs.

For example, if we shorten the following URL through TinyURL:

https://babeljs.io/blog/2020/10/15/7.12.0#class-static-blocks-12079httpsgithubcombabelbabelpull12079-12143httpsgithubcombabelbabelpull12143

We would get:

https://tinyurl.com/y4ned4ep

The shortened URL is nearly one-fifth the size of the actual URL.

Some of the use cases for URL shortening are to optimize links shared across users, easy tracking of individual links, and sometimes hiding the affiliated original URLs.

### Deployed on https://urlconvertor.netlify.app

### Key points
- Create a group database `groupXDatabase`. You can clean the db you previously used and reuse that.
- This time each group should have a *single git branch*. Coordinate amongst yourselves by ensuring every next person pulls the code last pushed by a team mate. Your branch will be checked as part of the demo. Branch name should follow the naming convention `project/urlShortnerGroupX`
- Follow the naming conventions exactly as instructed. The backend code will be integrated with the front-end application, which means any mismatch in the expected request body will lead to failure in successful integration.

### Models
- Url Model
{ urlCode: { mandatory, unique, lowercase, trim }, longUrl: {mandatory, valid url}, shortUrl: {mandatory, unique} }

### POST /url/shorten
- Create a short URL for an original URL received in the request body.
- The baseUrl must be the application's baseUrl. Example: if the originalUrl is http://abc.com/user/images/name/2, then the shortened URL should be http://localhost:3000/xyz
- Return the shortened unique URL. Refer to the [URL shorten response](#url-shorten-response) for the response structure.
- Ensure the same response is returned for an original URL every time.
- Return HTTP status 400 for an invalid request.

### GET /:urlCode
- Redirect to the original URL corresponding to the `urlCode`.
- Use a valid HTTP status code meant for a redirection scenario.
- Return a suitable error for a URL not found.
- Return HTTP status 400 for an invalid request.

## Testing 
- To test these APIs, create a new collection in Postman named "Project 2 Url Shortener".
- Each API should have a new request in this collection.
- Each request in the collection should be rightly named, e.g., "URL Shorten", "Get URL", etc.
- Each member of each team should have their tests in a running state.

## Phase II

Consider that Twitter has this trend where a famous person with a wide following posts a link, and the link gets frequented by millions within a day.

So, in our application, we would want to implement caching so that a newly created link is cached for 24 hours. When a person uses a short URL, the long URL should be retrieved from the cache in the first 24 hours of that URL being created.

- Use caching while fetching the shortened URL to minimize DB calls.
- Implement what makes sense




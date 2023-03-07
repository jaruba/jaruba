There is a github action that triggers `./index.js` every week (monday at 14:00 UTC), which is responsible for updating the data for the [jaruba.dev](https://jaruba.dev) web page (more specifically the github / reddit / stackoverflow data and age).

The builder commits the `../web/index.html` file to the repo, which in turn triggers another github action that updates the static website.

Notes:
- GitHub stars are retrieved from the GitHub API
- GitHub followers are retrieved from the GitHub API
- Reddit karma is retrieved from the Reddit API
- Reddit followers are **currently hardcoded**, as this data is not public, nor available in the API
- StackOverflow reputation is retrieved from the StackExchange API
- StackOverflow top overall percentage is **currently hardcoded**, (can be seen on the StackOverflow [user page](https://stackoverflow.com/users/2769366/jaruba)), as this data is not available in the StackExchange API and we are avoiding web scraping

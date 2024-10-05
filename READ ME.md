# MOSHCLUB APP
An app for the members of the mosh club - similar to a book club but for people hard as scaffolding, with eyeliner and fishnets.

## User Stories
### MVC

An app where you can post reviews, see the ranking, view data about the reviewers

**I want to be able to be able to see the rankings for the albums**
- GetAlbumsByID endpoint 👍
> Bonus: Formats in the correct order for search by slap, zest or stick

**I want the see information related to a specific album**
- GetAlbumById endpoint 👍
- GetReviewedAlbums data

**I want to be able to post reviews**
- PostReview Endpoint 👍
- GetUnreviewedAlbumsByUser
> Bonus: Patch and Delete Review

**I want to be able to add Albums**
- SearchAlbum endpoint 👍
- MODERATOR - Set Album Selector
- PostNewAlbumID endpoint

**I want to be the ranking of other myself and other users**
- GetUserByID

**Error Handling**
- I want the site to tell me when stuff goes wrong.
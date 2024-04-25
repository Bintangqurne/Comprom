API Documentation

1. Register User

Endpoint: POST /register
Headers: N/A
Request Body:
fullName (string, required) - Full name of the user.
id (string, required) - User ID.
email (string, required) - User's email.
2. User Login

Endpoint: POST /login
Headers: N/A
Request Body:
access_token (string, required) - User's access token.
3. Get All Users

Endpoint: GET /users
Headers:
Authorization (string, required) - User's access token.
Response:
fullName (string) - Full name of the user.
email (string) - Email of the user.
password (string) - Password of the user.
image (string) - URL of user's image.
status (string) - User's status.
address (string) - User's address.
description (string) - User's description.

4. Get Current User

Endpoint: GET /users/me
Headers:
Authorization (string, required) - User's access token.
Response:
fullName (string) - Full name of the user.
email (string) - Email of the user.
status (string) - User's status.
image (string) - URL of user's image.
address (string) - User's address.
description (string) - User's description.
5. Get User by ID

Endpoint: GET /users/:id
Headers:
Authorization (string, required) - User's access token.
Response:
fullName (string) - Full name of the user.
email (string) - Email of the user.
password (string) - Password of the user.
image (string) - URL of user's image.
status (string) - User's status.
address (string) - User's address.
description (string) - User's description.
6. Update User Profile

Endpoint: PUT /users/:id
Headers:
Authorization (string, required) - User's access token.
Request Body:
fullName (string) - Full name of the user.
email (string) - Email of the user.
address (string) - User's address.
description (string) - User's description.
7. Get All Posts

Endpoint: GET /post
Headers:
Authorization (string, required) - User's access token.
Response:
id (number) - Post ID.
title (string) - Post title.
imageUrl (string) - URL of the post image.
description (string) - Post description.
UserId (number) - ID of the user who created the post.
createdAt (string) - Timestamp of post creation.
updatedAt (string) - Timestamp of post update.
User (object) - User details:
id (number) - User ID.
image (string) - URL of user's image.
fullName (string) - Full name of the user.
status (string) - User's status.
description (string) - User's description.
address (string) - User's address.
Likes (array) - Array of objects representing likes:
id (number) - Like ID.
UserId (number) - ID of the user who liked.
PostId (number) - ID of the liked post.
8. Get User's Posts

Endpoint: GET /mypost
Headers:
Authorization (string, required) - User's access token.
Response:
Same structure as /post endpoint.
9. Add a Post

Endpoint: POST /add
Headers:
Authorization (string, required) - User's access token.
Request Body:
title (string, required) - Post title.
imageUrl (string, required) - URL of the post image.
description (string, required) - Post description.
10. Update a Post

Endpoint: PUT /post/:id
Headers:
Authorization (string, required) - User's access token.
Request Body:
title (string) - Updated post title.
imageUrl (string) - Updated URL of the post image.
description (string) - Updated post description.
11. Like a Post

Endpoint: POST /like/:PostId
Headers:
Authorization (string, required) - User's access token.
Request Body:
UserId (number) - ID of the user liking the post.
PostId (number) - ID of the liked post.
12. Get All Likes

Endpoint: GET /like
Headers:
Authorization (string, required) - User's access token.
Response:
id (number) - Like ID.
UserId (number) - ID of the user who liked.
PostId (number) - ID of the liked post.
createdAt (string) - Timestamp of like creation.
updatedAt (string) - Timestamp of like update.
Global Error Handling

500 Internal Server Error: Internal server error.
404 Not Found: Data not found.
401 Unauthorized: Unauthorized access.
JsonWebTokenError: Invalid Token.
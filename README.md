# Travel Guru

![img](/Users/lucyquinn/Desktop/Coding/Ironhack/PROJECTS/Project 3/Travel Guru/Vintage-World-Map.jpg)

## Description

A web app with the intention for users to be able to log and keep a record of all of their travel memories and find travel inspiration.  The user can create travel posts detailing their own personal advice on the location and also they can search for other travellers' posts by country/city and save these to their favourites page.  They can create Travel Logs (similar to a travel journal), which are exclusive to that user only. The user can edit and delete their profile and their travel posts and they can also remove their favorites and their travel logs.  

Travel experiences should never be forgotten!

## User Stories

- **Landing Page** - As a user I would like to be welcomed by a beautiful image setting the scene for travel and further information providing the user with a "sneek peek" to what the website is about. I would also like to have call to action buttons leading to both the sign up and the login pages. 
- **Sign Up** - As a user I would like to be able to sign up.
- **Login** - As a user I would like to be able to login so that I can create travel posts and also search for travel posts of other travellers, add them to my favorites, as well as create my own personal travel log.
- **Logout** - As a user I would like to log out of my account so that no-one will have access to it and redirect to the login page.
- **Profile** - As a user I would like to be able to see my profile.
- **EditProfile** - As a user I would like to be able to edit my profile and delete it.
- **DashBoard** - As a user I would like to be to search for travel posts by country or city.
- **My Travel Posts** - As a user I would like to be able to create a travel post, view all of my travel posts that I have created and to be able to edit/delete them.
- **My Favorite Travel Posts** - As a user I would like to be able to favorite other users' travel posts, add them to my favorites page and delete them.
- **My Travel Logs** - As a user I would like to be able to create a travel log, view and delete them.

## Backlog

- See other users' profiles
- Delete confirmation pages for travel posts.
- CSS styling component
- Rating travel posts
- Add/edit diary entries - only visible to current user.
- Change password.
- Delete comments

## Client / Frontend:

| Path                                 | Component                 | Permissions                | Behaviour                                                    |
| ------------------------------------ | ------------------------- | -------------------------- | ------------------------------------------------------------ |
| `/`                                  | LandingPage               | Public `<Route>`           | Landing Page                                                 |
| `/signup`                            | Signup                    | anon only `<AnonRoute>`    | Signup form, link to login, navigate to homepage after signup. |
| `/login`                             | Login                     | anon only `<AnonRoute>`    | Login form, link to signup, navigate to homepage after login. |
| `/dashboard`                         | Dashboard                 | user only `<PrivateRoute>` | Search for travel posts by country/city.                     |
| `/postDetails/:postId`               | PostDetails               | user only `<PrivateRoute>` | See the specific travel post page.                           |
| `/profile/:userId`                   | Profile                   | user only `<PrivateRoute>` | Shows your profile page.                                     |
| `/editProfile/:userId`               | EditProfile               | user only `<PrivateRoute>` | Edit your profile.                                           |
| `/deleteProfileConfirmation/:userId` | DeleteProfileConfirmation | user only `<PrivateRoute>` | Delete your profile reconfirmation.                          |
| `/myPosts/:userId`                   | MyPosts                   | user only `<PrivateRoute>` | Shows all your travels posts.                                |
| `/createPost`                        | CreatePost                | user only `<PrivateRoute>` | Create a travel post.                                        |
| `/editPost/:postId`                  | EditPost                  | user only `<PrivateRoute>` | Edit a specific travel post.                                 |
| `/favoritePosts/:userId`             | MyFavorites               | user only `<PrivateRoute>` | Shows all your favorite travel posts.                        |
| `/travelLogs`                        | TravelLog                 | user only `<PrivateRoute>` | Shows all your Travel Logs.                                  |
| `/createTravelLogs`                  | CreateTravelLog           | user only `<PrivateRoute>` | Create a travel log.                                         |

## Components

- LandingPage
- Signup
- Login
- Dashboard
- PostDetails
- Profile
- EditProfile
- DeleteProfileConfirmation
- MyPosts
- CreatePost
- EditPost
- MyFavorites
- TravelLog
- CreateTravelLog

## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()

# Server / Backend

## Models

User model

```
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  nationality: { type: String },
  description: { type: String, maxlength: 600 },
  myFavoriteTrip: { type: String },
  image: { type: String, default: 'https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?b=1&k=6&m=1223671392&s=612x612&w=0&h=5VMcL3a_1Ni5rRHX0LkaA25lD_0vkhFsb1iVm1HKVSQ=' },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  myPosts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  favorites: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  myTravelLog: [{ type: Schema.Types.ObjectId, ref: "TravelLog" }]
},
  {
    timestamps: {
      createdAt: 'create_at',
      updatedAt: 'updated_at'
    }
  }

```

Post model

```
 {
        title: { type: String, required: true },
        country: { type: String, required: true },
        city: { type: String, required: true },
        description: { type: String, required: true, maxlength: 600 },
        image: { type: String, default: 'https://www.irantravelingcenter.com/wp-content/plugins/all-in-one-video-gallery/public/assets/images/placeholder-image.png' },
        postAuthor: { type: Schema.Types.ObjectId, ref: "User" },
        comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
        rating: { type: Number }
    },
    {
        timestamps: {
            createdAt: 'create_at',
            updatedAt: 'updated_at'
        }
    }
```

Comment model

```
    {
        description: { type: String, required: true, maxlength: 250 },
        commentAuthor: { type: Schema.Types.ObjectId, ref: "User" },
        post: { type: Schema.Types.ObjectId, ref: "Post" }
    },
    {
        timestamps: {
            createdAt: 'create_at',
            updatedAt: 'updated_at'
        }
    }
```

TravelLog model (backlog)

```
{
    title: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    description: { type: String, required: true },
    travelLogAuthor: { type: Schema.Types.ObjectId, ref: "User" }
},
    {
        timestamps: {
            createdAt: 'create_at',
            updatedAt: 'updated_at'
        }
    }
```



## API Endpoints (backend routes)

| HTTP Method | URL                                     | Request Body                                                 | Success status | Error Status | Description                                                  |
| ----------- | --------------------------------------- | ------------------------------------------------------------ | -------------- | ------------ | ------------------------------------------------------------ |
| GET         | `/auth/me`                              |                                                              | 200            | 401          | Check if user is logged in on every reload.                  |
| POST        | `/auth/signup`                          | {name, username,  email, password, image}                    | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session. |
| POST        | `/auth/login`                           | {username, password}                                         | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session. |
| GET         | `/auth/logout`                          |                                                              | 204            | 400          | Logs out the user.                                           |
| GET         | `/api/dashboard`                        |                                                              | 200            | 400          | Search for travel posts by country/city and display them.    |
| GET         | `/api/profile/:userId`                  |                                                              | 200            | 404          | Displays user profile.                                       |
| PUT         | `/api/editProfile/:userId`              | {name, username, nationality, myFavoriteTrip, description, image} | 200            | 404          | Edit profile.                                                |
| DELETE      | `/api/deleteProfileConfirmaton/:userId` |                                                              | 200            | 404          | Delete user profile account.                                 |
| GET         | `/api/post/:postId`                     |                                                              | 200            | 400          | Displays the selected travel post.                           |
| GET         | `/api/myPosts/:userId`                  |                                                              | 200            | 404          | Displays user's travel posts.                                |
| POST        | `/api/createPost`                       | {title, country, city, image, description}                   | 201            | 404          | Create travel post.                                          |
| PUT         | `/api/editPost/:postId`                 | {title, country, city, image, description}                   | 200            | 400          | Update travel post information.                              |
| DELETE      | `/api/deletePost/:postId`               |                                                              | 200            | 404          | Delete specific travel post.                                 |
| GET         | `/api/favoritePosts/:userId`            |                                                              | 200            | 404          | Displays user's favorite travel posts.                       |
| POST        | `/api/favoritePost/add/:postId/:userId` |                                                              | 200            | 404          | Add selected travel post to users' favorites.                |
| DELETE      | `/api/deleteFavorite/:favoritePostId`   |                                                              | 200            | 404          | Delete specific favorite post.                               |
| POST        | `/api/createComment/:postId`            | {description}                                                | 201            | 404          | Create a comment.                                            |
| GET         | `/api/travelLogs`                       |                                                              | 200            | 404          | Display the travelLogs.                                      |
| POST        | `/api/createTravelLog`                  | {title, country, city, description}                          | 201            | 404          | Create a travelLog.                                          |
| DELETE      | `/api/deleteTravelLog/:travelLogId`     |                                                              | 200            | 404          | Delete specific Travel Log.                                  |
| POST        | `/api/upload`                           | {image}                                                      | 200            | 404          | Upload image.                                                |



## Links

### Trello

[Link to your trello board](https://trello.com/b/KYujgK2d/travel-guru)

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/Lucy-Quinn/Client-Travel-Guru)

[Server repository Link](https://github.com/Lucy-Quinn/Server-Travel-Guru)

[Deployed App Link](https://travel-guru-iqpy.onrender.com)

### Slides

The URL to the presentation slides.

[Slides Link](https://docs.google.com/presentation/d/12rIX7fATtci4SrPKmXqkX-RDFTb45-fKOVrztC1gnn8/edit?usp=sharing)

### Collaboration

This project was created by:

- Lucy Quinn - [GitHub](https://github.com/Lucy-Quinn)
- Jaime Pinto - [GitHub](https://github.com/JaimePintoP)


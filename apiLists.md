# Dev-tinder-api

authRouter
- POST /signup - Done
- POST /login - Done
- POST /logout - Done

profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/editPassword

connectionRouter
- POST /request/send/interested/:userId - Done
- POST /request/send/ignored/:userId -Done
- POST /request/review/accepted/:requestId - Done
- POST /request/review/rejected/:requestId - Done

userRouter
- GET /user/connections - Done
- GET /user/requests/received - Done
- GET /user/feed - Gets you the profile of other users on platform

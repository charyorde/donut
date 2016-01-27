var uasToken = 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJmYzU4MTAzMC0xMDg0LTQ0ZTAtYTI3OC04ZDRiNmIyNmQxNzciLCJzdWIiOiJ1c2VyYWNjb3VudCIsImF1dGhvcml0aWVzIjpbImNsaWVudHMucmVhZCIsInNjaW0udXNlcmlkcyIsImNsaWVudHMuc2VjcmV0IiwidWFhLnJlc291cmNlIiwic2NpbS5tZSIsIm9wZW5pZCIsInVhYS5hZG1pbiIsInNjaW0ucmVhZCIsInBhc3N3b3JkLndyaXRlIiwiY2xvdWRfY29udHJvbGxlci5yZWFkIiwiY2xvdWRfY29udHJvbGxlci53cml0ZSIsIm9hdXRoLmFwcHJvdmFscyIsImNsaWVudHMud3JpdGUiLCJzY2ltLndyaXRlIl0sInNjb3BlIjpbImNsaWVudHMucmVhZCIsInNjaW0udXNlcmlkcyIsImNsaWVudHMuc2VjcmV0IiwidWFhLnJlc291cmNlIiwic2NpbS5tZSIsIm9wZW5pZCIsInVhYS5hZG1pbiIsInNjaW0ucmVhZCIsInBhc3N3b3JkLndyaXRlIiwiY2xvdWRfY29udHJvbGxlci5yZWFkIiwiY2xvdWRfY29udHJvbGxlci53cml0ZSIsIm9hdXRoLmFwcHJvdmFscyIsImNsaWVudHMud3JpdGUiLCJzY2ltLndyaXRlIl0sImNsaWVudF9pZCI6InVzZXJhY2NvdW50IiwiY2lkIjoidXNlcmFjY291bnQiLCJhenAiOiJ1c2VyYWNjb3VudCIsImdyYW50X3R5cGUiOiJjbGllbnRfY3JlZGVudGlhbHMiLCJyZXZfc2lnIjoiNmY5ZTc0ZTkiLCJpYXQiOjE0NDE4MDg3MzAsImV4cCI6MTc1NzE2ODczMCwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3VhYS9vYXV0aC90b2tlbiIsInppZCI6InVhYSIsImF1ZCI6WyJ1c2VyYWNjb3VudCIsImNsaWVudHMiLCJzY2ltIiwidWFhIiwib3BlbmlkIiwicGFzc3dvcmQiLCJjbG91ZF9jb250cm9sbGVyIiwib2F1dGgiXX0.2Jph1VptEYftfOFi8fbH6XIL2EKllHkWMm1WB5Xz_Ok'

exports.ingredients = {
  "v4.1.1": [
    {
      login: {
        "id": "C8A2FF0D-AF7E-4B38-8C3D-1EDB993CE59D",
        "serviceName": "uas",
        "feature": "user login",
        "method": "POST",
        "path": "/v1/authenticate",
        "requestParams": {username: 'charyorde', password: 'sexylook'},
        "expectedResponse": [
          'sessionid',
          'username',
          'legacyuser',
          'userid',
          'verified',
          'fullname',
          'access_token',
          'refresh_token',
          'token_expiry',
          'email'
        ],
        "bearerToken": uasToken,
        "enabled": true
      }
      /*"logout": {
      
      },
      "getFriends": {
        "id": "B36F7945-5ED9-4731-B3EB-9EBEB122DDE5",
        "serviceName": "socialgraph",
        "method": "GET",
        "path": "/friends",
        "requestParams": "charyorde?page=1&size=",
        "expectedResponse": {},
        "bearerToken": "",
        "enabled": true
      },
      "findFriend": {
      
      }*/
    }
  ]
}

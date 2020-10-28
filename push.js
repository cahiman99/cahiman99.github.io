var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BC2zSMbfRalWzjV__EX1ugHj9A7q7_YceIlTcF4nk6HDk80vF2MF36rqem--XDuXQLTU4wHjrCVqp4N7x23TnXI",
   "privateKey": "Il0NPj45sPdStfLL80CxMeB1sx6T9NigTPLSokNfzIY"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/cgAXzgImkrE:APA91bG5F4ZZQurGtCSZX9-7Q2aWRdhr_dHmGhRp4hAiAZnaxvvsYTpwam2mdxzlsf5BNLzZEql9LMa08J4ALL5Qdc0c4ff-7TEciKMgPAN85jH0EJiwrLBXPiA4bDm2H9Sbn0G_6t29",
   "keys": {
       "p256dh": "BANlNBnc8QtjYLBGa6qAGdwnzzngy6AWMtMvd1UpydTn3QbVsfMdTKoj09w93fjczjz//Q9yFHdc9agnVzyCUAA=",
       "auth": "4uF86lmhhTHEaqaFeWSEsA=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '601677733400',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);


const socketio = require("socket.io");
const chats = [
  {
    type: "text",
    text: "Hello Steve",
    from: "jid_1109",
    sender_name: "Michel Slatter",
    to: "jid_1111",
  },
  {
    type: "text",
    text: "Hi Michael",
    from: "jid_1111",
    sender_name: "Steve Jobs",
    to: "jid_1109",
  },
  {
    type: "text",
    text: "Check this below destination",
    from: "jid_1109",
    sender_name: "Michel Slatter",
    to: "jid_1111",
  },
  {
    attachment: [
      {
        type: "image",
        payload: {
          url: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Dszpics1.jpg",
        },
        caption: "Chennai",
      },
    ],
    type: "image",
    from: "jid_1109",
    sender_name: "Michel Slatter",
    to: "jid_1111",
  },
  {
    type: "text",
    text: "Can  you send few more",
    from: "jid_1111",
    sender_name: "Steve Jobs",
    to: "jid_1109",
  },
  {
    type: "text",
    text: "Here are few more travel destinations around europe, united states of america, japan, southern america, south africa, congo, sri lanka, west indies, green land and australia",
    from: "jid_1109",
    sender_name: "Michel Slatter",
    to: "jid_1111",
  },
  {
    attachment: [
      {
        type: "image",
        payload: {
          url: "https://upload.wikimedia.org/wikipedia/commons/8/8f/Bachalpsee_reflection.jpg",
        },
        caption: "Japan",
      },
      {
        type: "image",
        payload: {
          url: "https://upload.wikimedia.org/wikipedia/commons/5/57/Galunggung.jpg",
        },
        caption:
          "southern america, northern america, western america, eastern america",
      },
      {
        type: "image",
        payload: {
          url: "https://upload.wikimedia.org/wikipedia/commons/7/73/KERALA_-_32.jpg",
        },
        caption: "Kerala",
      },
      {
        type: "image",
        payload: {
          url: "https://upload.wikimedia.org/wikipedia/commons/b/be/Top_of_Atmosphere.jpg",
        },
        caption: "",
      },
    ],
    type: "image",
    from: "jid_1109",
    sender_name: "Michel Slatter",
    to: "jid_1111",
  },
];
const io = new socketio.Server(5001, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  let index = 0;
  setInterval(() => {
    if (index < chats.length) {
      socket.emit("hello from server", JSON.stringify(chats));
      index = index + 1;
    }
  }, 5000);

  socket.on("hello from client", (msg) => {
    chats.push(JSON.parse(msg));
  });
});

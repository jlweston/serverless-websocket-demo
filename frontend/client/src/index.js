const socket = new WebSocket("wss://to-be-populated-during-build");

socket.addEventListener("open", () => {
  console.log("Connected!");
});

// Listen for messages
socket.addEventListener("message", ({ data }) => {
  const payload = JSON.parse(data);
  console.log("Message from server ", payload);

  if (payload.type === "message") {
    const { message, sender } = payload.data;
    var item = document.createElement("li");
    item.textContent = `${sender} - ${message}`;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
  }
});

var form = document.getElementById("form");
var input = document.getElementById("input");

// send messages
form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (input.value) {
    var item = document.createElement("li");
    item.id = "own";
    item.textContent = `Me - ${input.value}`;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);

    socket.send(JSON.stringify({ type: "message", data: input.value }));
    input.value = "";
  }
});

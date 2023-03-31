// This is a simple turbowarp extension that adds useful tools for scratch cloud multiplayer such as room Id's

// Define the extension object
const extension = {};

// Define the name and description of the extension
extension.name = "Cloud Multiplayer Tools";
extension.description = "Adds useful tools for scratch cloud multiplayer such as room Id's";

// Define the blocks for the extension
extension.blocks = [
  {
    opcode: "getRoomId", // The unique identifier for this block
    blockType: "reporter", // The type of block (reporter, command, etc.)
    text: "room id", // The text on the block
    func: "getRoomId" // The name of the function to execute when the block is run
  },
  {
    opcode: "joinRoom",
    blockType: "command",
    text: "join room [ID]",
    arguments: {
      ID: {
        type: "string", // The type of the argument (string, number, boolean, etc.)
        defaultValue: "" // The default value of the argument
      }
    },
    func: "joinRoom"
  },
  {
    opcode: "leaveRoom",
    blockType: "command",
    text: "leave room",
    func: "leaveRoom"
  }
];

// Define the functions for the blocks
extension.getRoomId = function () {
  // Return the current room id or an empty string if not in a room
  return this.runtime.ioDevices.cloud.get("roomId") || "";
};

extension.joinRoom = function (args) {
  // Join a room with the given id or create a new one if it doesn't exist
  const id = args.ID;
  if (id) {
    this.runtime.ioDevices.cloud.set("roomId", id);
  } else {
    this.runtime.ioDevices.cloud.set("roomId", this.generateRandomId());
  }
};

extension.leaveRoom = function () {
  // Leave the current room and clear the room id
  this.runtime.ioDevices.cloud.set("roomId", "");
};

// Define a helper function to generate a random room id
extension.generateRandomId = function () {
  // Return a random string of 8 alphanumeric characters
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < 8; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
};

// Register the extension with turbowarp
Scratch.extensions.register(extension);

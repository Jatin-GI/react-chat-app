import { useSocket } from "@/context/SocketContext";
import { useState, useRef, useEffect } from "react";
import { GrAttachment } from "react-icons/gr";
import { RiEmojiStickerLine } from "react-icons/ri";
import { IoSendOutline } from "react-icons/io5";
import EmojiPicker from "emoji-picker-react";
import { useAppStore } from "@/store";

const MessageBar = () => {
  const emojiRef = useRef();

  const socket = useSocket();
  const { selectedChatType, selectedChatData, userInfo } = useAppStore();

  const [message, setmessage] = useState("");
  const [emojiPickerOpen, setemojiPickerOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setemojiPickerOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emojiRef]);

  const handleAddEmoji = (emoji) => {
    setmessage((msg) => msg + emoji.emoji);
  };

  const handleSendMessage = async () => {
    if (selectedChatType === "contact") {
      socket.emit("sendMessage", {
        sender: userInfo.id,
        content: message,
        recipient: selectedChatData._id,
        messageType: "text",
        fileUrl: undefined,
      });
    }
    setmessage("");
  };

  return (
    <div className=" bg-[#1c1d25] flex justify-center items-center px-8 mb-3 gap-6">
      <div className="flex-1 flex bg-[#2a2b33] rounded-md items-center gap-3 pr-5">
        <input
          type="text"
          className="flex-1 p-3 bg-transparent rounded-md focus:border-none focus:outline-none w-1 "
          placeholder="Enter Message"
          value={message}
          onChange={(e) => setmessage(e.target.value)}
        />
        <button className="text-neutral-500 focus:border-none focus:outline-white focus:text-white duration-300 transition-all">
          <GrAttachment className="text-2xl" />
        </button>
        <div className="relative">
          <button
            className="text-neutral-500 focus:border-none focus:outline-white focus:text-white duration-300 transition-all"
            onClick={() => setemojiPickerOpen(true)}
          >
            <RiEmojiStickerLine className="text-2xl" />
          </button>
          <div className="absolute bottom-16 right-0" ref={emojiRef}>
            <EmojiPicker
              theme="dark"
              open={emojiPickerOpen}
              autoFocusSearch={false}
              onEmojiClick={handleAddEmoji}
            />
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="bg-[#8417ff] rounded-md flex items-center justify-center p-3 focus:border-none hover:bg-[#741bda] focus:bg-[#741bda] focus:outline-white focus:text-white duration-300 transition-all"
        onClick={handleSendMessage}
      >
        <IoSendOutline className="text-xl" />
      </button>
    </div>
  );
};

export default MessageBar;

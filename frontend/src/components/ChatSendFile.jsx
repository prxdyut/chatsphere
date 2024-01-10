import React, { Component, useContext, useEffect, useState } from "react";
import axios from "axios";
import { BsPaperclip, BsXLg } from "react-icons/bs";
import { RiErrorWarningLine } from "react-icons/ri";
import { FaPaperclip, FaRegImage } from "react-icons/fa6";
import { LuFileUp, LuHardDriveUpload } from "react-icons/lu";
import { useAuth } from "@clerk/clerk-react";
import { ChatContext } from "../contexts/chat";
import { Link } from "react-router-dom";

export default function ChatSendFile({ button }) {
  const [id] = useState(parseInt(Math.random() * 100));
  const { userId } = useAuth();
  const { sendMessage } = useContext(ChatContext);
  const [selectedFilePreview, setSelectedFilePreview] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(false);
  const [selectedFile, setSelectedFile] = useState(false);
  const [open, setToggleOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const toggleOpen = () => setToggleOpen(!open);
  const [errormessage, setErrorMessage] = useState(false);
  const [input, setInput] = useState("");
  const reset = () => {
    setSelectedFilePreview(false);
    setUploading(false);
    setErrorMessage(false);
    setSelectedFile(false);
    setInput("");
  };
  useEffect(() => reset(), [open]);
  const handleFileChange = async (e) => {
    if (e.target.files[0]) {
      setSelectedFile(true);
      let formData = new FormData();
      formData.append("file", e.target.files[0]);
      setUploading(true);
      const res = await axios
        .post((location.hostname == "localhost"
    ? "http://localhost:5000"
    : "https://api.chatsphere.pradyutdas.online" )+"/uploadfile", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .catch((error) => {
          setErrorMessage(
            error.response.statusText + " Please select the file"
          );
        })
        .finally(() => setUploading(false));

      if (res.status === 200) {
        setSelectedFilePreview(res.data.url);
        setUploadedFile(res.data);
      }
    } else setErrorMessage("Please Select The File");
  };

  const handleSendfile = () => {
    sendMessage({
      type: "file",
      content: input.trim(),
      userId,
      fileUrl: uploadedFile.url,
      fileSize: uploadedFile.size,
      fileType: uploadedFile.type,
    });
    reset();
    setToggleOpen(false);
  };

  return (
    <div>
      <input
        id={`upload-file-${id}`}
        type="file"
        name="uploadfile"
        className=" hidden"
        onChange={handleFileChange}
      ></input>
      <div onClick={toggleOpen}>{button}</div>
      <div>
        <div
          className={` bg-black bg-opacity-50  z-50 p-4 fixed top-0 right-0 h-screen w-screen  items-center justify-center ${
            open ? "flex" : "hidden"
          }`}
        >
          <div className=" bg-white p-4 flex gap-4 flex-col rounded  max-lg:w-3/4 w-1/3">
            <div className=" flex justify-between items-center">
              <p className=" textxl font-bold  text-xl">Send File</p>
              <button
                onClick={toggleOpen}
                className=" rounded-full p-2 hover:bg-gray-200"
              >
                <BsXLg fontSize={24} />
              </button>
            </div>
            {selectedFile ? (
              <div className=" relative p-8 rounded flex-col flex items-center justify-center">
                <div
                  className="p-6 rounded-full cursor-pointer animate-bounce
                 "
                >
                  <LuHardDriveUpload
                    fontSize={56}
                    className="   text-gray-700"
                  />
                </div>
                <p className=" text-sm animate-pulse opacity-90">Uploading</p>

                {selectedFilePreview && (
                  <Link
                    to={selectedFilePreview}
                    target="_blank"
                    className="absolute w-full h-full flex items-center justify-center rounded bg-gray-200 border "
                  >
                    <div className=" flex justify-center items-center flex-col">
                      <FaPaperclip fontSize={24} className=" opacity-60" />
                      <p className=" mt-2 text-xs w-2/3 text-center">{uploadedFile.name} dcsdvfdsv</p>
                    </div>
                  </Link>
                )}
              </div>
            ) : (
              <label
                htmlFor={`upload-file-${id}`}
                className=" p-8 rounded flex flex-col gap-2 items-center justify-center"
              >
                <div className="p-6 bg-gray-200 rounded-full cursor-pointer ">
                  <LuHardDriveUpload
                    fontSize={56}
                    className="  text-gray-700"
                  />
                </div>
                <p className=" text-xs opacity-75">Select to Upload</p>
              </label>
            )}
            {errormessage && (
              <p className=" text-red-500 text-xs flex gap-1 items-center w-full justify-center">
                <RiErrorWarningLine /> {errormessage}
              </p>
            )}

            {selectedFilePreview ? (
              <div className=" flex gap-2 items-end">
                <textarea
                  id="chat text"
                  rows="1"
                  className="block max-h-40 outline-none p-2.5 w-full text-sm  bg-white hover:bg-gray-100  border-2 focus:bg-gray-200   rounded-lg "
                  placeholder="Your Caption..."
                  onChange={(e) => setInput(e.target.value)}
                  value={input}
                ></textarea>
                <button
                  onClick={handleSendfile}
                  type="submit"
                  className=" h-max flex justify-center  p-2 rounded-full cursor-pointer hover:bg-gray-200 text-gray-900"
                >
                  <svg
                    className="w-6 h-6 rotate-90"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                  </svg>
                </button>
              </div>
            ) : (
              <label
                htmlFor={`upload-file-${id}`}
                className=" cursor-pointer self-center  bg-gray-900 w-max px-4 py-2 rounded text-white"
              >
                Select File
              </label>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

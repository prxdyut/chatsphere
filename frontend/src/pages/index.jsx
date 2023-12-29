import React, { Component, useContext, useEffect, useState } from "react";
import axios from "axios";
import { BsXLg } from "react-icons/bs";
import { RiErrorWarningLine } from "react-icons/ri";
import { FaRegImage } from "react-icons/fa6";
import { LuUpload } from "react-icons/lu";
import { useAuth } from "@clerk/clerk-react";
import { ChatContext } from "../contexts/chat";

function getBase64(file, callback) {
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    callback(reader.result);
  };
  reader.onerror = function (error) {
    console.log("Error: ", error);
  };
}
export default function Home() {
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
        .post("http://195.35.23.178:5000"+"/uploadfile", formData, {
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

  const handleSendImage = () =>
    sendMessage({
      type: "image",
      content: input.trim(),
      userId,
      fileUrl: uploadedFile.url,
      fileSize: uploadedFile.size,
      fileType: uploadedFile.type,
    });

  return (
    <div>
      
    </div>
  );
}

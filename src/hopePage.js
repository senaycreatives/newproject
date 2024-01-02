import React, { useState, useEffect } from "react";
import "./YourComponent.css"; // Import your CSS file
import logoutIcon from "./Image/Icon/Type=Logout.svg";
import passCIcon from "./Image/Icon/Type=PassC.svg";
import addIcon from "./Image/Icon/Type=Add.svg";
import eyeIcon from "./Image/Icon/Type=Eye.svg";
import deleteIcon from "./Image/Icon/Type=Delete.svg";
import editIcon from "./Image/Icon/Type=Edit.svg";
import { useRef } from 'react';
import Header from "./Header";



const YourComponent = () => {
  const [display,setdisplay]=useState(false)
  const externalComponentRef = useRef();
  useEffect(() => {
    const handleClick = () => {
      // Handle the click event here
      setdisplay(false)
    
    };
  
    const externalComponent = externalComponentRef.current;
  
    if (externalComponent) {
      externalComponent.addEventListener('click', handleClick);
    }
  
    return () => {
      // Remove the event listener when the component is unmounted
      if (externalComponent) {
        externalComponent.removeEventListener('click', handleClick);
      }
    };
  }, [externalComponentRef,display]);
 const Playme = () => {

  document.addEventListener("DOMContentLoaded", function () {
    const openModalBtn = document.getElementById("openModalBtn");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const fileInput = document.getElementById("fileInput");
    const uploadBtn = document.getElementById("uploadBtn");
    const dropArea = document.getElementById("dropArea");
    const fileUploadModal = document.getElementById("fileUploadModal");
  
    openModalBtn.addEventListener("click", function () {
      fileUploadModal.style.display = "block";
    });
  
    closeModalBtn.addEventListener("click", function () {
      fileUploadModal.style.display = "none";
    });
  
    // Close modal if clicked outside the modal content
    window.addEventListener("click", function (event) {
      if (event.target === fileUploadModal) {
        fileUploadModal.style.display = "none";
      }
    });
  
    // Drag and drop functionality
    dropArea.addEventListener("dragover", function (event) {
      event.preventDefault();
      dropArea.classList.add("dragover");
    });
  
    dropArea.addEventListener("dragleave", function () {
      dropArea.classList.remove("dragover");
    });
  
    dropArea.addEventListener("drop", function (event) {
      event.preventDefault();
      dropArea.classList.remove("dragover");
      handleFiles(event.dataTransfer.files);
    });
  
    // File input change event
    fileInput.addEventListener("change", function (event) {
      handleFiles(event.target.files);
    });
  
    // Upload button click event
    uploadBtn.addEventListener("click", function () {
      // Implement your file upload logic here
      alert("No File was sellected!");
      fileUploadModal.style.display = "none";
    });
  
    // Handle dropped or selected files
    function handleFiles(files) {
      if (files.length > 0) {
        const file = files[0];
        const allowedTypes = [
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "application/vnd.ms-excel",
          ".csv",
        ];
  
        if (
          allowedTypes.includes(file.type) ||
          allowedTypes.includes(file.name.split(".").pop())
        ) {
          uploadBtn.disabled = false;
        } else {
          alert("Invalid file type. Please upload a valid Excel or CSV file.");
          uploadBtn.disabled = true;
        }
      }
    }
  });

// console.log("clicked button")
}
const handelImportclick =()=>{
  setdisplay(!display)
}
  return (
    <div class="bigoldbody overflow-hidden">
      <Header/>
     
    
      {/* <section class="parent-section">
        <section class="container">
          <div class="inlinediv">
            <div>
              <a href="#" id="openModalBtn" onClick={()=>handelImportclick()} class="my-button">
                <img src={addIcon} width="20px" alt="" /> <br /> Import
              </a>
            </div>
            <div>
              <a href="#" class="my-button">
                <img src={eyeIcon} width="20px" alt="" /> <br /> View
              </a>
            </div>
          </div>
          <div class="inlinediv">
            <div>
              <a href="#" class="my-button">
                <img src={deleteIcon} width="20px" alt="" /> <br /> Delete
              </a>
            </div>
            <div>
              <a href="#" class="my-button">
                <img src={editIcon} style={{}} width="20px" alt="" /> <br /> Edit
              </a>
            </div>
          </div>
        </section>
      </section> */}

      {/* <footer class="fixed-footer"></footer> */}
     
      {display&&
     <div
  
     className="absolute top-0 w-screen h-[100%]  overflow-hidden flex items-center justify-center"
   >
    <div className=" w-full h-full  bg-zinc-900 bg-opacity-50 backdrop-blur-sm"    ref={externalComponentRef}></div>
     <div className=" absolute z-10 w-[600px] h-[200px] bg-white rounded-md">
     
            <div class="drop-area" id="dropArea">
              <p class="blue_header">Drop your file here</p>
              <input
                type="file"
                id="fileInput"
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              />

              <a href="#" id="uploadBtn" class="my-button">
                <br /> Upload
              </a>
            </div>
       
      
     </div>
   </div>
      }
      
    </div>
  );
};

export default YourComponent;

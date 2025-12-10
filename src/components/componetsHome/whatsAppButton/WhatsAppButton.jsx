import React from "react";
import "./WhatsAppButton.css";

const WhatsAppButton = ({ phoneNumber, message }) => {
  // Formato internacional sin espacios ni guiones
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  console.log("WhatsApp URL:", url, "numero:", phoneNumber);

  return (
    <a
      href={url}
      className="whatsapp-float"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        alt="WhatsApp"
        width="50"
        height="50"
      />
    </a>
  );
};

export default WhatsAppButton;

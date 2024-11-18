import React from "react";
import "./WppButton.css";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { FaWhatsapp } from 'react-icons/fa';

const WppButton = () => {
  return (
    <div className="wpp-container">
      
      <b className="help-text">
        Dúvidas sobre o valor devido? <br/> Chame no Whatsapp
      </b>

      <div className="arrow">
        <ArrowDownwardIcon style={{ fontSize: 50, color: '#333' }} />
      </div>
      
      <a
        href="https://api.whatsapp.com/send/?phone=559181030436&text&type=phone_number&app_absent=0"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-button"
      >
            <FaWhatsapp style={{ marginRight: '8px' }} /> {/* Ícone do WhatsApp */}

      Fale conosco
      </a>
    </div>
  ); 
};

export default WppButton;

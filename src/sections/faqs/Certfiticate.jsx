import Card from "../../components/Card";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useState } from "react";

const Certificate = ({ certificate }) => {
  const [showDetails, setShowDetails] = useState(false);
  
  return (
    <Card className="certificate" onClick={() => setShowDetails((prev) => !prev)}>
      <div>
        <h5 className="certificate__title">{certificate.title}</h5>
        <button className="certificate__icon">
          {showDetails ? <AiOutlineMinus /> : <AiOutlinePlus />}
        </button>
      </div>
      {showDetails && (
        <div className="certificate__details">
          <p>{certificate.description}</p>
          <div className="certificate__meta">
            <p className="certificate__issuer">Issued by: {certificate.issuer}</p>
            <p className="certificate__date">Issued: {certificate.date}</p>
          </div>
          <a 
            href={certificate.credentialUrl} 
            className="btn sm primary certificate__view-btn" 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            View Credential
          </a>
        </div>
      )}
    </Card>
  );
};

export default Certificate;
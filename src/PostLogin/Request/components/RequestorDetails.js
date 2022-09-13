const RequestorDetails = ({ requestData }) => {
  const dataKeys = {
    requestorName: "Requestor Name",
    location: "Location",
    deliveryDate: "Delivery Date",
    creationDate: "Creation Date",
    requestType: "Request Type",
    department: "Department",
    item: "Item",
    finalApprover: "Final Approver",
  };

  return (
    <div className="requestor-details">
      <div className="row">
        {Object.keys(requestData).map((key) => {
          if (dataKeys[key]) {
            return (
              <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-4 mb-md-4">
                <div className="requisitioner-text">
                  <label>{dataKeys[key]}</label>
                  <span>{requestData[key]}</span>
                </div>
              </div>
            );
          }
        })}
      </div>
      <div className="border-bottom"></div>
      <div className="requestor-bottom-content">
        <p>Total Request Amount</p>
        <span>$9,500</span>
      </div>
    </div>
  );
};

export default RequestorDetails;

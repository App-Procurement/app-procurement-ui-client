const SupplierInfo = ({ requestData }) => {
  const dataKeys = {
    supplierName: "Supplier Name",
    supplierContact: "Supplier Contact",
    businessCategory: "Business Category",
    telephoneNo: "Telephone No",
    mailingAddress: "Mailing Address",
  };

  return (
    <div className="supplier-info-tabs-contant active">
      <div className="order-item-head">
        <h4>Supplier Info</h4>
      </div>
      <div className="supplier-info-section">
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
            } else {
              return null;
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default SupplierInfo;

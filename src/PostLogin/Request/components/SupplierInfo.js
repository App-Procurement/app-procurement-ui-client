const SupplierInfo = (props) => {
  return (
    <div className="supplier-info-tabs-contant active">
      <div className="order-item-head">
        <h4>Supplier Info</h4>
      </div>
      <div className="supplier-info-section">
        <div className="row">
          <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-4 mb-md-4">
            <div className="requisitioner-text">
              <label>Supplier Name</label>
              <span>
                {props.requestData
                  ? props.requestData.details.products[0].item.supplier.name
                  : ""}
              </span>
            </div>
          </div>
          <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-4 mb-md-4">
            <div className="requisitioner-text">
              <label>Supplier Contact</label>
              <span>
                {props.requestData
                  ? props.requestData.details.products[0].item.supplier.contact
                  : ""}
              </span>
            </div>
          </div>
          <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-4 mb-md-4">
            <div className="requisitioner-text">
              <label>Business Category</label>
              <span>
                {props.requestData
                  ? props.requestData.details.products[0].item.supplier.category
                  : ""}
              </span>
            </div>
          </div>
          <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-4 mb-md-4">
            <div className="requisitioner-text">
              <label>Telephone No</label>
              <span>
                {props.requestData
                  ? props.requestData.details.products[0].item.supplier
                      .telephoneNo
                  : ""}
              </span>
            </div>
          </div>
          <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-4 mb-md-4">
            <div className="requisitioner-text">
              <label>Mailing Address</label>
              <span>
                {props.requestData
                  ? props.requestData.details.products[0].item.supplier.email
                  : ""}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierInfo;

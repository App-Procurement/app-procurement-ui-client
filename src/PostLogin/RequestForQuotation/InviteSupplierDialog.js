import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import Table from "../../Table/Table";
import { t } from "i18next";
export class InviteSupplierDialog extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
        inviteUserFields:[],
      }
    }
   

  componentDidMount=()=>{
    if(this.props.inviteUserFields && this.props.inviteUserFields.length>0)
    {
        this.setState({
            inviteUserFields:this.props.inviteUserFields
        })
    }
  }
  handleInviteFormChange = (index, e) => {
    index.userEmail = e.target.value;
  };
  handleInviteFormDelete = (index) => {
    const { inviteUserFields } = this.state;
    let duplicateList = [...inviteUserFields];
    if (duplicateList.length > 0) {
      duplicateList.splice(index, 1);
      this.setState({
        inviteUserFields: duplicateList,
      });
    }
  };
  handleInviteFormAdd = () => {
    let newField = { userEmail: "", inviteError: "" };
    const { inviteUserFields } = this.state;
    let newFields = [...inviteUserFields, newField];
    this.setState({ inviteUserFields: newFields });
  };
  handleSendInvites = () => {
    const { inviteUserFields } = this.state;
    inviteUserFields.forEach((item) => {
      if (item.userEmail) {
        let mail = item.userEmail;
        let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!mail.match(mailformat)) {
          item.inviteError = "Please enter valid email address";
        } else {
          item.userEmail = "";
          item.inviteError = "";
        }
      } else {
        item.inviteError = "";
      }
    });
    this.setState({ inviteUserFields });
  };

  render() {
    const {handleOpenModulInviteSupplier,openModulInviteSupplier}=this.props
  
    return (
        <Dialog
              fullWidth
              open={openModulInviteSupplier}
              onClose={handleOpenModulInviteSupplier}
              aria-labelledby="form-dialog-title"
              className="invite-supplier-dialog"
            >
              <div className="custom-dialog-head">
                <DialogTitle id="form-dialog-title" className="dialog-heading">
                  Invite Supplier
                </DialogTitle>
                <Button
                  onClick={handleOpenModulInviteSupplier}
                  className="modal-close-btn"
                >
                  <CloseIcon />
                </Button>
              </div>
              <div className="custom-dialog-content">
                <div className="invite-dialog-form">
                  {this.state.inviteUserFields.map((index) => {
                    return (
                      <div
                        key={Math.random()}
                        className="search-bar form-group"
                      >
                        <input
                          type="email"
                          name="userEmail"
                          className="control-form"
                          placeholder="example@example.com"
                          onChange={(e) =>
                            this.handleInviteFormChange(index, e)
                          }
                        />
                        <Button
                          variant="contained"
                          className="delete-btn"
                          onClick={() => this.handleInviteFormDelete(index)}
                        >
                          <i className="far fa-trash-alt"></i>
                        </Button>
                        <span className="d-block w-100 text-danger">
                          {index.inviteError}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="invite-dialog-bottom-content">
                  <div className="add-another-buttons">
                    <Button
                      variant="contained"
                      className="add-btn"
                      onClick={() => this.handleInviteFormAdd()}
                    >
                      <i className="fa fa-plus" aria-hidden="true"></i>
                      Add Another
                    </Button>
                  </div>
                  <Button
                    variant="contained"
                    className="primary-btn"
                    onClick={() => this.handleSendInvites()}
                  >
                    Send Invites
                  </Button>
                </div>
              </div>
            </Dialog>
    )
  }
}

export default InviteSupplierDialog
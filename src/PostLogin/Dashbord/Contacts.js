import React, { Component } from "react";
import AddIcon from "@mui/icons-material/Add";
import EmailIcon from '@mui/icons-material/Email';
import AngelaImg from "../../assets/images/dashbord/angela-img.png";
import AndylawImg from "../../assets/images/dashbord/andylaw-img.png";
import BennykennImg from "../../assets/images/dashbord/bennykenn-img.png";
import ChynthiaImg from "../../assets/images/dashbord/chynthia-img.png";
import DellaImg from "../../assets/images/dashbord/della-img.png";
import EvansjohnImg from "../../assets/images/dashbord/evansjohn-img.png";
import { t } from "i18next";

class Contacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contactsData: [
        {
          contactName: "Angela Moss",
          contactDes: "department head",
          contactImg: AngelaImg,
        },
        {
          contactName: "Andy Law",
          contactDes: "department head",
          contactImg: BennykennImg,
        },
        {
          contactName: "Benny Kenn",
          contactDes: "Supplier",
          contactImg: ChynthiaImg,
        },
        {
          contactName: "Chynthia Lawra",
          contactDes: "department head",
          contactImg: DellaImg,
        },
        {
          contactName: "Della Samantha",
          contactDes: "Supplier",
          contactImg: AndylawImg,
        },
        {
          contactName: "Evans John",
          contactDes: "Accounts Head",
          contactImg: EvansjohnImg,
        },
      ],
    };
  }

  render() {
    const { contactsData } = this.state;
    return (
      <div className="contact-left">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-9">
            <div className="heading">
              <h4>{t("Contacts")}</h4>
              <span>
                You have <strong>{contactsData.length}</strong> contacts
              </span>
            </div>
          </div>
          <div className="col-lg-3 text-right">
            <div className="contect-btn">
              <AddIcon />
            </div>
          </div>
        </div>
        <div className="contect-list">
          <div>
            {contactsData.map((element) => (
              <div className="user-content" key={element.contactName}>
                <div className="d-inline-block user-img">
                  <img src={element.contactImg} alt="" />
                </div>
                <div className="d-inline-block user-position">
                  <p>{element.contactName}</p>
                  <span>{element.contactDes}</span>
                </div>
                <div className="d-inline-block mail-icon disabled">
                  <EmailIcon />
                </div>
              </div>
            ))}
          </div>
          <div className="view-btn">
            <button type="button" className="btn btn-secondary">
              {t("View More")}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Contacts;

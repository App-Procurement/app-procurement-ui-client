import React, { Component } from "react";
import "rc-calendar/assets/index.css";
import "@y0c/react-datepicker/assets/styles/calendar.scss";
import { settingAction } from "../../_actions";
import { connect } from "react-redux";
import { status } from "../../_constants";
import ApprovalWorkFlowChild from "./ApprovalWorkFlow/ApprovalWorkFlowChild";

class ApprovalWorkFlow extends Component {
  isSortingRef;
  constructor(props) {
    super(props);
    this.state = {
      allApprovers: {},
      flowKey: "purchaseRequisition",
      createNewStepOpen: false,
      createNewApprover: {
        userId: "",
        minAmount: "",
        maxAmount: "",
        baseLine: { type: "", value: "" },
        location: "",
        order: "",
      },
      createStepValidat: false,
      editStep: false,
      editIndex: -1,
      userId: -1,
      purchaseRequisitionData: [],
      purchaseOrderData: [],
      invoiceData: [],
      paymentsData: [],
      ids: [],
    };
    this.isSortingRef = React.createRef();
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(settingAction.getWorkflow());
    dispatch(settingAction.getUsers());
  }

  componentDidUpdate(prevProps, prevState) {
    const { get_approval_workflow_status, get_approval_workflow_data } =
      this.props;
    if (
      get_approval_workflow_status !== prevProps.get_approval_workflow_status &&
      get_approval_workflow_status === status.SUCCESS
    ) {
      if (
        get_approval_workflow_data &&
        Object.keys(get_approval_workflow_data).length > 0
      ) {
        let allApproversData = get_approval_workflow_data;
        let purchaseRequisitionData = allApproversData[0]
          ? allApproversData[0]
          : [];
        let purchaseOrderData = allApproversData[1]
          ? allApproversData[1].details.allApprovers
          : [];
        let invoiceData = allApproversData[2]
          ? allApproversData[2].details.allApprovers
          : [];
        let paymentsData = allApproversData[3]
          ? allApproversData[3].details.allApprovers
          : [];
        purchaseRequisitionData = purchaseRequisitionData.details.allApprovers;

        let ids = [
          allApproversData[0]?.id ? allApproversData[0].id : "",
          allApproversData[1]?.id ? allApproversData[1].id : "",
          allApproversData[2]?.id ? allApproversData[2].id : "",
          allApproversData[3]?.id ? allApproversData[3].id : "",
        ];

        this.setState({
          purchaseRequisitionData,
          purchaseOrderData,
          ids: ids,
          invoiceData,
          paymentsData,
        });
      }
    }
  }

  onUpdate = (newData, id) => {
    if (id) {
      this.setState({ purchaseRequisitionData: newData });
      this.props.dispatch(
        settingAction.updateWorkFlow({
          id: id,
          details: { allApprovers: newData },
        })
      );
    } else {
      this.props.dispatch(
        settingAction.addWrokFlow({
          allApprovers: newData,
        })
      );
    }
  };

  render() {
    const {
      purchaseRequisitionData,
      purchaseOrderData,
      flowKey,
      invoiceData,
      paymentsData,
      ids,
    } = this.state;

    return (
      <>
        <div className="setting-right-content active">
          <div className="roles-tabs">
            <div className="heading">Approval Workflow</div>
            <div className="tabs">
              <ul>
                <li
                  className={flowKey === "purchaseRequisition" ? "active" : ""}
                  onClick={() =>
                    this.setState({ flowKey: "purchaseRequisition" })
                  }
                >
                  Purchase Requisition
                </li>
                <li
                  className={flowKey === "purchaseOrder" ? "active" : ""}
                  onClick={() => this.setState({ flowKey: "purchaseOrder" })}
                >
                  Purchase Order
                </li>
                <li
                  className={flowKey === "invoice" ? "active" : ""}
                  onClick={() => this.setState({ flowKey: "invoice" })}
                >
                  Invoice
                </li>
                <li
                  className={flowKey === "payments" ? "active" : ""}
                  onClick={() => this.setState({ flowKey: "payments" })}
                >
                  Payments
                </li>
              </ul>
            </div>
            <div className="tabs-content active">
              <div className="create-step">
                <ul>
                  {flowKey === "purchaseRequisition" ? (
                    <ApprovalWorkFlowChild
                      approversData={purchaseRequisitionData}
                      onUpdate={(purchaseRequisitionData) =>
                        this.onUpdate(purchaseRequisitionData, ids[0])
                      }
                    />
                  ) : flowKey === "purchaseOrder" ? (
                    <ApprovalWorkFlowChild
                      approversData={purchaseOrderData}
                      onUpdate={(purchaseOrderData) =>
                        this.onUpdate(purchaseOrderData, ids[1])
                      }
                    />
                  ) : flowKey === "invoice" ? (
                    <ApprovalWorkFlowChild
                      approversData={invoiceData}
                      onUpdate={(invoiceData) =>
                        this.onUpdate(invoiceData, ids[2])
                      }
                    />
                  ) : flowKey === "payments" ? (
                    <ApprovalWorkFlowChild
                      approversData={paymentsData}
                      onUpdate={(paymentsData) =>
                        this.onUpdate(paymentsData, ids[3])
                      }
                    />
                  ) : (
                    <></>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { get_approval_workflow_status, get_approval_workflow_data } =
    state.procurement;
  return {
    get_approval_workflow_status,
    get_approval_workflow_data,
  };
};

export default connect(mapStateToProps)(ApprovalWorkFlow);

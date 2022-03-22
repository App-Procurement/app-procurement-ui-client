import React from 'react';
import SendRfq from '../PostLogin/SendRfq';
import VendorQuotation from '../PostLogin/VendorQuatation';
const Dashbord = React.lazy(() => import('../PostLogin/Dashbord'));
const EmailPage = React.lazy(() => import('../PostLogin/Email/EmailPage'));
const Kanban = React.lazy(() => import('../PostLogin/Kanban'));
const ManageRequisition = React.lazy(() => import('../PostLogin/Requisition/ManageRequisition'));
const RequisitionTracker = React.lazy(() => import('../PostLogin/Requisition/RequisitionTracker'));
const NewRequisition = React.lazy(() => import('../PostLogin/Requisition/NewRequisition'));
const ApprovedRequisition = React.lazy(() => import('../PostLogin/Requisition/ApprovedRequisition'));
const ViewRequisition = React.lazy(() => import('../PostLogin/Requisition/ViewRequisition'));
const SelectBuyers = React.lazy(() => import('../PostLogin/SelectBuyers'));
const SetUpCommittee = React.lazy(() => import('../PostLogin/SetUpCommittee'));
const RecievedRfp = React.lazy(() => import('../PostLogin/RecievedRfp'));
const RecievedRfq = React.lazy(() => import('../PostLogin/RecievedRfq'));
const GeneratePo = React.lazy(() => import('../PostLogin/GeneratePo/'));
const Contact = React.lazy(() => import('../PostLogin/Contact'));
const addNewContact = React.lazy(() => import('../PostLogin/Contact/addNewContact'));
const VendorEnroll = React.lazy(() => import('../PostLogin/VendorEnroll'));
const Invoices = React.lazy(() => import('../PostLogin/Invoices'));
const ViewInvoice = React.lazy(() => import('../PostLogin/Invoices/ViewInvoice'))
const Calender = React.lazy(() => import('../PostLogin/Calender'));
const selectCommitteeMember = React.lazy(() => import('../PostLogin/SetUpCommittee/selectCommitteeMember'));
const ViewRecievedRfp = React.lazy(() => import('../PostLogin/RecievedRfp/ViewRecievedRfp'));
const TrackRfp = React.lazy(() => import('../PostLogin/RecievedRfp/TrackRfp'));
const ViewRecievedRfq = React.lazy(() => import('../PostLogin/RecievedRfq/ViewRecievedRfq'));
const ViewPurchaseOrder = React.lazy(() => import('../PostLogin/GeneratePo/viewPo'));
const AddInvoices = React.lazy(() => import('../PostLogin/Invoices/AddNewInvoice'));
const ApprovePo = React.lazy(() => import('../PostLogin/GeneratePo/approvePo'));
const BudgetOverview = React.lazy(() => import('../PostLogin/BudgetOverview'));
const Reports = React.lazy(() => import('../PostLogin/Reports'));
const PurchaseOrder = React.lazy(() => import('../PostLogin/GeneratePo/purchaseOrder'));
const BudgetAllocate = React.lazy(() => import('../PostLogin/BudgetOverview/allocatedBudget'));
const BudgetAllocation = React.lazy(() => import("../PostLogin/BudgetOverview/BudgetAllocation"));
const Vendors = React.lazy(() => import("../PostLogin/Vendors/index"));

const Account = React.lazy(()=> import("../PostLogin/Account/Account") );


const routes = [
    { path: '/postlogin/dashboard', exact: true, name: 'Dashbord', component: Dashbord },
    // { path: '/postlogin/email', exact: true, name: 'EmailPage', component: EmailPage },
    { path: '/postlogin/email/:type/', exact: true, name: 'EmailPage', component: EmailPage },
    { path: '/postlogin/email/:type/:priorty', exact: true, name: 'EmailPage', component: EmailPage },
    { path: '/postlogin/email/:type/:priorty/:id', exact: true, name: 'EmailPage', component: EmailPage },
    { path: '/postlogin/kanban', exact: true, name: 'Kanban', component: Kanban },
    { path: '/postlogin/requisitiontracker', exact: true, name: 'RequisitionTracker', component: RequisitionTracker },
    { path: '/postlogin/newrequisition', exact: true, name: 'NewRequisition', component: NewRequisition },
    { path: '/postlogin/managerequisition/:id', exact: true, name: 'NewRequisition', component: NewRequisition },
    { path: '/postlogin/approvedrequisition', exact: true, name: 'ApprovedRequisition', component: ApprovedRequisition },
    { path: '/postlogin/viewdetails/:id', exact: true, name: 'ViewRequisition', component: ViewRequisition },
    { path: '/postlogin/selectbuyers/:id', exact: true, name: 'SelectBuyers', component: SelectBuyers },
    { path: '/postlogin/setupcommittee', exact: true, name: 'SetUpCommittee', component: SetUpCommittee },
    { path: '/postlogin/frp/:url', exact: true, name: 'RecievedRfp', component: RecievedRfp },
    { path: '/postlogin/recievedrfq', exact: true, name: 'RecievedRfq', component: RecievedRfq },
    { path: '/postlogin/generatepo', exact: true, name: 'GeneratePo', component: GeneratePo },
    { path: '/postlogin/generatepo/:id', exact: true, name: 'ViewPurchaseOrder', component: ViewPurchaseOrder },
    { path: '/postlogin/contact', exact: true, name: 'Contact', component: Contact },
    { path: '/postlogin/newcontact', exact: true, name: 'addNewContact', component: addNewContact },
    { path: '/postlogin/newcontact/:id', exact: true, name: 'addNewContact', component: addNewContact },
    { path: '/postlogin/vendorenroll', exact: true, name: 'VendorEnroll', component: VendorEnroll },
    { path: '/postlogin/invoices', exact: true, name: 'Invoices', component: Invoices },
    { path: '/postlogin/viewinvoice/:id', exact: true, name: 'ViewInvoices', component: ViewInvoice },
    { path: '/postlogin/managerequisition', exact: true, name: 'ManageRequisition', component: ManageRequisition },
    { path: '/postlogin/calender', exact: true, name: 'Calender', component: Calender },
    { path: '/postlogin/selectecommittee', exact: true, name: 'selectCommitteeMember', component: selectCommitteeMember },
    { path: '/postlogin/frp/:url/:id', exact: true, name: 'ViewRecievedRfp', component: ViewRecievedRfp },
    { path: '/postlogin/frp/:url/trackrfp/:id', exact: true, name: 'TrackRfp', component: TrackRfp },
    { path: '/postlogin/recivedrfq/:id', exact: true, name: 'ViewRecievedRfq', component: ViewRecievedRfq },
    { path: '/postlogin/invoices/newinvoice', exact: true, name: 'AddInvoices', component: AddInvoices },
    { path: '/postlogin/approvepo', exact: true, name: 'ApprovePo', component: ApprovePo },
    { path: '/postlogin/budgetoverview', exact: true, name: 'BudgetOverview', component: BudgetOverview },
    { path: '/postlogin/reports', exact: true, name: 'Reports', component: Reports },
    { path: '/postlogin/approvepo/:id', exact: true, name: 'PurchaseOrder', component: PurchaseOrder },
    { path: '/postlogin/budgetoverview/:id', exact: true, name: 'BudgetAllocate', component: BudgetAllocate },
    { path: "/postlogin/budgetallocation", exact: true, name: "BudgetAllocation", component: BudgetAllocation },
    { path: "/postlogin/vendorquotation", exact: true, name: "VendorQuotation", component: VendorQuotation },
    { path: '/postlogin/vendors', exact: true, name: "Vendors", component: Vendors },
    { path: '/postlogin/sendrfq', exact: true, name: "sendrfq", component: SendRfq },
    { path: '/postlogin/account', exact: true, name: "Account", component: Account }
   

]

export default routes;
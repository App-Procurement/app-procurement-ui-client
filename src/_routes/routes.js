import React from 'react';
// import ManageRequisitionData from '../PostLogin/Requisition/ManageRequisition/ManageRequisitionData';
// import SendRfq from '../PostLogin/SendRfq';
// import VendorQuotation from '../PostLogin/VendorQuatation';

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
const ViewInvoice = React.lazy(() => import('../PostLogin/Invoices/ViewInvoice'));
const CreateInvoice = React.lazy(() => import('../PostLogin/Invoices/CreateInvoice'));
const Calender = React.lazy(() => import('../PostLogin/Calender'));
const selectCommitteeMember = React.lazy(() => import('../PostLogin/SetUpCommittee/selectCommitteeMember'));
const ViewRecievedRfp = React.lazy(() => import('../PostLogin/RecievedRfp/ViewRecievedRfp'));
const TrackRfp = React.lazy(() => import('../PostLogin/RecievedRfp/TrackRfp'));
const ViewRecievedRfq = React.lazy(() => import('../PostLogin/RecievedRfq/ViewRecievedRfq'));
// const ViewPurchaseOrder = React.lazy(() => import('../PostLogin/GeneratePo/viewPo'));
const AddInvoices = React.lazy(() => import('../PostLogin/Invoices/AddNewInvoice'));
const PurcahseOrder = React.lazy(() => import('../PostLogin/GeneratePo/purchaseOrder'));
const ViewPurchaseOrder = React.lazy(() => import('../PostLogin/GeneratePo/viewPurchaseOrder'));
const CreatePurchaseOrder = React.lazy(() => import('../PostLogin/GeneratePo/createPurchaseOrder'));
const createInvoicePurchaseOrder = React.lazy(() => import('../PostLogin/Invoices/createInvoicePurchaseOrder'));
const BudgetOverview = React.lazy(() => import('../PostLogin/BudgetOverview'));
const Reports = React.lazy(() => import('../PostLogin/Reports'));
const ApprovePurchaseOrder = React.lazy(() => import('../PostLogin/GeneratePo/approvePo'));
const BudgetAllocate = React.lazy(() => import('../PostLogin/BudgetOverview/allocatedBudget'));
const BudgetAllocation = React.lazy(() => import('../PostLogin/BudgetOverview/BudgetAllocation'));
const VendorQuotation = React.lazy(() => import('../PostLogin/VendorQuatation'));
const Vendors = React.lazy(() => import('../PostLogin/Vendors'));
const SendRfq = React.lazy(() => import('../PostLogin/SendRfq'));
const ManageRequisitionData = React.lazy(() =>
	import('../PostLogin/Requisition/ManageRequisition/ManageRequisitionData')
);
const ChatRoom = React.lazy(() => import('../PostLogin/ChatRoom/index'));
const RequestForPurpose = React.lazy(() => import('../PostLogin/RequestForPurpose'));
const CreateNewRequest = React.lazy(() => import('../PostLogin/RequestForPurpose/createNewRequest'));
const ViewRequest = React.lazy(() => import('../PostLogin/RequestForPurpose/viewRequests'));
const PurchaseRequisition = React.lazy(() => import('../PostLogin/Requisition/PurchaseRequisition'));
const PurchaseRequisitionDetail = React.lazy(() =>
	import('../PostLogin/Requisition/PurchaseRequisition/PurchaseRequisitionDetail')
);
const ActiveProductCatalogue = React.lazy(() => import('../PostLogin/ManageSupplier/ActiveProductCatalogue'));
const AddSupplier = React.lazy(() => import('../PostLogin/ManageSupplier/AddSupplier'));
const CreatChatRooms = React.lazy(() => import('../PostLogin/ChatRoom/CreateChatRoom'));
const ManageSupplier = React.lazy(() => import('../PostLogin/ManageSupplier/index'));
const ActiveSuppliers = React.lazy(() => import('../PostLogin/ManageSupplier/ActiveSupplier'));
const ViewSupplierDetail = React.lazy(() => import('../PostLogin/ManageSupplier/ViewSupplierDetail'));
const AddProduct = React.lazy(() => import('../PostLogin/ManageSupplier/AddProduct'));
const Setting = React.lazy(() => import('../PostLogin/Setting'));
const Message = React.lazy(() => import('../PostLogin/Message'));
const Request = React.lazy(() => import('../PostLogin/Request'));
const ViewDetails = React.lazy(() => import('../PostLogin/Request/viewDetails'));
const viewRequest = React.lazy(() => import('../PostLogin/Request/viewRequest'));
const Budgets = React.lazy(() => import('../PostLogin/Budgets'));
const Products = React.lazy(() => import('../PostLogin/Products'));
const AddProducts = React.lazy(() => import('../PostLogin/Products/AddProducts'));


const routes = [
	{
		path: '/postlogin/dashboard',
		exact: true,
		name: 'Dashbord',
		component: Dashbord
	},
	// { path: '/postlogin/email', exact: true, name: 'EmailPage', component: EmailPage },
	{
		path: '/postlogin/email/:type/',
		exact: true,
		name: 'EmailPage',
		component: EmailPage
	},
	{
		path: '/postlogin/email/:type/:priorty',
		exact: true,
		name: 'EmailPage',
		component: EmailPage
	},
	{
		path: '/postlogin/email/:type/:priorty/:id',
		exact: true,
		name: 'EmailPage',
		component: EmailPage
	},
	{ path: '/postlogin/kanban', exact: true, name: 'Kanban', component: Kanban },
	{
		path: '/postlogin/requisitiontracker',
		exact: true,
		name: 'RequisitionTracker',
		component: RequisitionTracker
	},
	{
		path: '/postlogin/newrequisition',
		exact: true,
		name: 'NewRequisition',
		component: NewRequisition
	},
	{
		path: '/postlogin/managerequisition/:id',
		exact: true,
		name: 'NewRequisition',
		component: NewRequisition
	},
	{
		path: '/postlogin/approvedrequisition',
		exact: true,
		name: 'ApprovedRequisition',
		component: ApprovedRequisition
	},
	{
		path: '/postlogin/purchaserequisition',
		exact: true,
		name: 'PurchaseRequisition',
		component: PurchaseRequisition
	},
	{
		path: '/postlogin/purchaserequisition/:id',
		exact: true,
		name: 'PurchaseRequisitionDetail',
		component: PurchaseRequisitionDetail
	},
	{
		path: '/postlogin/viewdetails/:id',
		exact: true,
		name: 'ViewRequisition',
		component: ViewRequisition
	},
	{
		path: '/postlogin/selectbuyers/:id',
		exact: true,
		name: 'SelectBuyers',
		component: SelectBuyers
	},
	{
		path: '/postlogin/setupcommittee',
		exact: true,
		name: 'SetUpCommittee',
		component: SetUpCommittee
	},
	{
		path: '/postlogin/frp/:url',
		exact: true,
		name: 'RecievedRfp',
		component: RecievedRfp
	},
	{
		path: '/postlogin/recievedrfq',
		exact: true,
		name: 'RecievedRfq',
		component: RecievedRfq
	},
	{
		path: '/postlogin/generatepo',
		exact: true,
		name: 'GeneratePo',
		component: GeneratePo
	},
	{
		path: '/postlogin/purchaseorder/:id',
		exact: true,
		name: 'ViewPurchaseOrder',
		component: ViewPurchaseOrder
	},
	{
		path: '/postlogin/GeneratePo/createpurchaseorder',
		exact: true,
		name: 'CreatePurchaseOrder',
		component: CreatePurchaseOrder
	},
	{
		path: '/postlogin/Invoices/createinvoicepurchaseorder',
		exact: true,
		name: 'CreateInvoicePurchaseOrder',
		component: createInvoicePurchaseOrder
	},
	{
		path: '/postlogin/contact',
		exact: true,
		name: 'Contact',
		component: Contact
	},
	{
		path: '/postlogin/newcontact',
		exact: true,
		name: 'addNewContact',
		component: addNewContact
	},
	{
		path: '/postlogin/newcontact/:id',
		exact: true,
		name: 'addNewContact',
		component: addNewContact
	},
	{
		path: '/postlogin/vendorenroll',
		exact: true,
		name: 'VendorEnroll',
		component: VendorEnroll
	},
	{
		path: '/postlogin/invoices',
		exact: true,
		name: 'Invoices',
		component: Invoices
	},
	{
		path: '/postlogin/invoices/createinvoice',
		exact: true,
		name: 'CreateInvoice',
		component: CreateInvoice
	},
	{
		path: '/postlogin/viewinvoice/:id',
		exact: true,
		name: 'ViewInvoices',
		component: ViewInvoice
	},
	{
		path: '/postlogin/managerequisition',
		exact: true,
		name: 'ManageRequisition',
		component: ManageRequisition
	},
	{
		path: '/postlogin/calender',
		exact: true,
		name: 'Calender',
		component: Calender
	},
	{
		path: '/postlogin/selectecommittee',
		exact: true,
		name: 'selectCommitteeMember',
		component: selectCommitteeMember
	},
	{
		path: '/postlogin/frp/:url/:id',
		exact: true,
		name: 'ViewRecievedRfp',
		component: ViewRecievedRfp
	},
	{
		path: '/postlogin/frp/:url/trackrfp/:id',
		exact: true,
		name: 'TrackRfp',
		component: TrackRfp
	},
	{
		path: '/postlogin/recivedrfq/:id',
		exact: true,
		name: 'ViewRecievedRfq',
		component: ViewRecievedRfq
	},
	{
		path: '/postlogin/invoices/newinvoice',
		exact: true,
		name: 'AddInvoices',
		component: AddInvoices
	},
	{
		path: '/postlogin/purchaseorder',
		exact: true,
		name: 'PurcahseOrder',
		component: PurcahseOrder
	},
	{
		path: '/postlogin/budgetoverview',
		exact: true,
		name: 'BudgetOverview',
		component: BudgetOverview
	},
	{
		path: '/postlogin/reports',
		exact: true,
		name: 'Reports',
		component: Reports
	},
	{
		path: '/postlogin/approvepo/:id',
		exact: true,
		name: 'ApprovePurchaseOrder',
		component: ApprovePurchaseOrder
	},
	{
		path: '/postlogin/budgetoverview/:id',
		exact: true,
		name: 'BudgetAllocate',
		component: BudgetAllocate
	},
	{
		path: '/postlogin/budgetallocation',
		exact: true,
		name: 'BudgetAllocation',
		component: BudgetAllocation
	},
	{
		path: '/postlogin/vendorquotation',
		exact: true,
		name: 'VendorQuotation',
		component: VendorQuotation
	},
	{
		path: '/postlogin/vendors',
		exact: true,
		name: 'Vendors',
		component: Vendors
	},
	{
		path: '/postlogin/sendrfq',
		exact: true,
		name: 'sendrfq',
		component: SendRfq
	},
	{
		path: '/postlogin/requisitiondetails/:id',
		exact: true,
		name: 'ManageRequisitionData',
		component: ManageRequisitionData
	},
	{
		path: '/postlogin/chatroom',
		exact: true,
		name: 'ChatRoom',
		component: ChatRoom
	},
	{
		path: '/postlogin/chatroom/createchatroom',
		exact: true,
		name: 'CreateChatRoom',
		component: CreatChatRooms
	},
	{
		path: '/postlogin/requestforpurpose',
		exact: true,
		name: 'RequestPurpose',
		component: RequestForPurpose
	},
	{
		path: '/postlogin/requestforpurpose/viewrequest/:id',
		exact: true,
		name: 'ViewRequest',
		component: ViewRequest
	},
	{
		path: '/postlogin/requestforpurpose/newrequest',
		exact: true,
		name: 'CreateNewRequest',
		component: CreateNewRequest
	},
	{
		path: '/postlogin/managesupplier',
		exact: true,
		name: 'ManageSupplier',
		component: ManageSupplier
	},
	{
		path: '/postlogin/managesupplier/activesuppliers',
		exact: true,
		name: 'ActiveSuppliers',
		component: ActiveSuppliers
	},
	{
		path: '/postlogin/managesupplier/addsupplier',
		exact: true,
		name: 'AddSupplier',
		component: AddSupplier
	},
	{
		path: '/postlogin/managesupplier/activeproductcatalogue',
		exact: true,
		name: 'ActiveProductCatalogue',
		component: ActiveProductCatalogue
	},
	{
		path: '/postlogin/viewsupplierdetail',
		exact: true,
		name: 'ViewSupplierDetail',
		component: ViewSupplierDetail

	},
	{
		path: '/postlogin/addproduct',
		exact: true,
		name: 'AddProduct',
		component: AddProduct
	},
	{
		path: '/postlogin/setting',
		exact: true,
		name: 'Setting',
		component: Setting
	},
	{
		path: '/postlogin/request',
		exact: true,
		name: 'request',
		component: Request
	},
	{
		path: '/postlogin/message',
		exact: true,
		name: 'message',
		component: Message
	},
	{
		path: '/postlogin/request/viewdetail/:id',
		exact: true,
		name: 'viewDetails',
		component: ViewDetails
	},
	{
		path: '/postlogin/request/viewrequest/',
		exact: true,
		name: 'viewRequest',
		component: viewRequest
	},
	{
		path: '/postlogin/budgets/',
		exact: true,
		name: 'Budgets',
		component: Budgets
	},
	{
		path: '/postlogin/products/',
		exact: true,
		name: 'Products',
		component: Products
	},
	{
		path: '/postlogin/products/addproducts/',
		exact: true,
		name: 'AddProducts',
		component: AddProducts
	},


];

export default routes;

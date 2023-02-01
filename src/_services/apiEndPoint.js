import config from "../config";
export const apiEndPoint = {
  LOGIN: `${config.apiUrl}/auth/login`,

  //GetProductsList
  PRODUCTSLIST: `${config.devAPI}/product`,
  // *Buyer Api Url
  BUYER: `${config.apiUrl}/buyer`,

  // *Committee Api Url
  COMMITTEE: `${config.apiUrl}/committee`,

  // *Contact Api Url
  CONTACT: `${config.apiUrl}/contact`,

  INVITATION: `${config.apiUrl}/invitation`,

  // *Department Api Url
  DEPARTMENT: `${config.apiUrl}/department`,

  // *Contact Api Url
  INVOICE: `${config.apiUrl}/invoice`,
  NEWINVOICE: `${config.apiUrl}/newInvoice`,

  // Requisition Api Url
  REQUISTIONS: `${config.apiUrl}/requisitions`,
  // APPROVEDREQUISITION: `${config.apiUrl}/approveRequisition`,

  CURRENCY: `${config.devAPI}/currency`,

  // *Role Api Url
  ROLE: `${config.apiUrl}/roles`,

  // *Vendor Api Url
  VENDOR: `${config.apiUrl}/vendor`,
  VENDORQUOTATION: `${config.apiUrl}/vendorQuatation`,

  // *Rules Api Url
  RULES: `${config.apiUrl}/rules`,

  // *recievedrfp api url

  RFP: `${config.apiUrl}/rfp`,

  //*generate po api url

  PURCHASEORDERS: `${config.devAPI}/purchase_order`,

  //recievedefq api url

  RFQ: `${config.apiUrl}/rfq`,

  // email api url
  CHATS: `${config.apiUrl}/chat`,
  EMAIL: `${config.devAPI}/email`,
  // MAILLIST: `${config.apiUrl}/mailList`,

  //*kanban api url
  KANBAN: `${config.apiUrl}/kanbanList`,

  //  dashboardApiURL
  DASHBOARDDATA: `${config.apiUrl}/dashboardData`,

  // frp track Api url
  TRACKFRPDATA: `${config.apiUrl}/trackfrpdata`,
  SENDRFQ: `${config.apiUrl}/sendrfq`,
  //GET NOTIFICATION DATA
  NOTIFICATIONS: `${config.apiUrl}/notifications`,

  // GET BUDGETOVERVIEW DATA
  BUDGET: `${config.apiUrl}/bugetOverviewData`,

  //GET REPORTS DATA
  REPORTS: `${config.apiUrl}/reorts`,

  ACTIVITES: `${config.apiUrl}/activity`,

  // GET REQUEST FOR PURPOSE LIST
  REQUESTFORPURPOSE: `${config.devAPI}/request`,

  /// GET CHAT LIST
  GETCHATS: `${config.apiUrl}/contactlist`,
  GETMEMBERS: `${config.apiUrl}/membreslist`,
  ITEMLIST: `${config.apiUrl}/itemList`,
  CREATECHATROOM: `${config.apiUrl}/contactlist`,
  SUPPLIER: `${config.devAPI}/supplier`,
  ACTIVESUPPLIERS: `${config.apiUrl}/activesupplierlist`,
  PRODUCT: `${config.devAPI}/product`,
  SELLER: `${config.apiUrl}/sellerslist`,
  SUPPLIERANDCATEGORY: `${config.apiUrl}/supplierandcategorylist`,
  // GET REQUEST FOR SETTING WORKFLOW
  WORKFLOW: `${config.devAPI}/approvers`,
  // CREATE COMAPNY PROFILE
  COMPANYPROFILE: `${config.devAPI}/company_profile`,
  // GET ROLE SAND PERMISSIONS
  ROLESANDPERMISSIONS: `${config.apiUrl}/rolesandpermissions`,
  // GET GROUPS LIST FOR SETTING
  GROUPSLIST: `${config.apiUrl}/groupslist`,
  // GET USERS LIST FOR SETTING
  USERSLIST: `${config.apiUrl}/userrolesandpermissions`,
  PREFERENCESLIST: `${config.apiUrl}/getpreferenceslist`,
  REQUESTDATA: `${config.apiUrl}/request`,
  // Get budget data
  BUDGETDATA: `${config.apiUrl}/budget`,
  SETTINGGROUPDATA: `${config.apiUrl}/group`,
  INVOICES: `${config.devAPI}/invoice`,
  REQUESTFORQUOTATION: `${config.devAPI}/quotation`,
};

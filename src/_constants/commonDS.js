export const status = {
  IN_PROGRESS: 0,
  SUCCESS: 1,
  FAILURE: 2,
};

export const testStatus = {
  PENDING: 0,
  IN_PROGRESS: 1,
  COMPLETED: 2,
};

export const eventActions = {
  LOGIN: "Login",
  PAGEVIEW: "Pageview",
  CREATE_TEST_STARTED: "Create test started",
  CREATE_TEST_COMPLETED: "Create test completed",
  ADD_QUESTIONNAIRE_STARTED: "Add questionnaire started",
  ADD_QUESTIONNAIRE_SUBMITTED: "Questionnaire submitted",
  ADD_QUESTIONNAIRE_PUBLISHED: "Questionnaire published",
  REGISTER_COMPLETED: "Register completed",
  REGISTER_VERIFY_PENDING: "Verify user",
};

export const eventCategories = {
  USER: "User",
};

export const poStatus = {
  PENDING: "Pending",
  UNPAID: "Unpaid",
  UNDELIVERED: "Undelivered",
  DELIVERED: "Delivered",
};

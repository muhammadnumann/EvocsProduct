// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set, Private } from '@redwoodjs/router';

import ConfiguredOAuthLayout from 'src/layouts/ConfiguredOAuthLayout';
import CustomerProductsLayout from 'src/layouts/CustomerProductsLayout';
import CustomersLayout from 'src/layouts/CustomersLayout';
import CustomerTenantsLayout from 'src/layouts/CustomerTenantsLayout';
import InterviewSchedulerEventsLayout from 'src/layouts/InterviewSchedulerEventsLayout';
import JobsLayout from 'src/layouts/JobsLayout';
import ProductsLayout from 'src/layouts/ProductsLayout';
import RequiredOAuthsLayout from 'src/layouts/RequiredOAuthsLayout';
import UsersLayout from 'src/layouts/UsersLayout';

import { RoleList } from './App';
import { useAuth } from './auth';
import ApplicantDetail from './components/ApplicantDetail/ApplicantDetail';
import CandidateDetail from './components/CandidateDetail/CandidateDetail';
import SettingPage from './components/setting';
import ProductAuthLayout from './layouts/ProductAuthLayout/ProductAuthLayout';
import SchedulerLayout from './layouts/SchedulerLayout/SchedulerLayout';
import SchedulerPublicLayout from './layouts/SchedulerPublicLayout/SchedulerPublicLayout';
import ListViewPage from './pages/ListViewPage/ListViewPage';
import CandidateRequisitionPage from './pages/Scheduler/CandidateRequisition/CandidateRequisitionPage/CandidateRequisitionPage';
import CandidateSuppliedSchedulePage from './pages/Scheduler/Candidates/CandidateSchedule/CandidateSuppliedSchedulePage/CandidateSuppliedSchedulePage';

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Set wrap={SchedulerLayout} private unauthenticated="home" title="Candidate Schedule Requests">
        <Route path="/scheduler/candidate-schedule-requests/new" page={SchedulerCandidateScheduleRequestNewCandidateScheduleRequestPage} name="schedulerNewCandidateScheduleRequest" />
        <Route path="/scheduler/candidate-schedule-requests/{id:Int}" page={SchedulerCandidateScheduleRequestCandidateScheduleRequestPage} name="schedulerCandidateScheduleRequest" />
        <Route path="/scheduler/candidate-schedule-requests" page={SchedulerCandidateScheduleRequestCandidateScheduleRequestsPage} name="schedulerCandidateScheduleRequests" />
      </Set>
      <Set wrap={SchedulerPublicLayout}>
        <Route path="/candidate-schedules/{linkID:String}" page={CandidateSuppliedSchedulePage} name="candidateSuppliedSchedule" />
      </Set>
      <Set wrap={SchedulerLayout} private unauthenticated="home" title="Interview Scheduler">
        <Route path="/scheduler" page={SchedulerHomePage} name="schedulerHome" />
      </Set>
      <Set wrap={SchedulerLayout} private unauthenticated="home" title="CandidateSchedules">
        <Route path="/scheduler/candidates/candidate-schedules/{id:Int}" page={SchedulerCandidatesCandidateScheduleCandidateSchedulePage} name="schedulerCandidatesCandidateSchedule" />
        <Route path="/scheduler/candidates/candidate-schedules" page={SchedulerCandidatesCandidateScheduleCandidateSchedulesPage} name="schedulerCandidatesCandidateSchedules" />
      </Set>
      <Set wrap={SchedulerLayout} private unauthenticated="home" title="Candidates">
        <Route path="/scheduler/candidates/new" page={SchedulerCandidateNewCandidatePage} name="schedulerNewCandidate" />
        <Route path="/scheduler/candidates/{id:Int}/edit" page={SchedulerCandidateEditCandidatePage} name="schedulerEditCandidate" />
        <Route path="/scheduler/candidates/{id:Int}" page={SchedulerCandidateCandidatePage} name="schedulerCandidate" />
        <Route path="/scheduler/candidates" page={SchedulerCandidateCandidatesPage} name="schedulerCandidates" />
      </Set>
      <Set wrap={SchedulerLayout} private unauthenticated="home" title="Requisitions">
        <Route path="/scheduler/requisitions/new" page={SchedulerRequisitionNewRequisitionPage} name="schedulerNewRequisition" />
        <Route path="/scheduler/requisitions/{id:Int}/edit" page={SchedulerRequisitionEditRequisitionPage} name="schedulerEditRequisition" />
        <Route path="/scheduler/requisitions/{id:Int}" page={SchedulerRequisitionRequisitionPage} name="schedulerRequisition" />
        <Route path="/scheduler/requisitions" page={SchedulerRequisitionRequisitionsPage} name="schedulerRequisitions" />
      </Set>
      <Set wrap={SchedulerLayout} private unauthenticated="home" title="Candidate Requisitions">
        <Route path="/candidate-requisition/{id:Int}" page={CandidateRequisitionPage} name="candidateRequisition" />
      </Set>
      <Set wrap={InterviewSchedulerEventsLayout} title="Calendar" private unauthenticated="home">
        <Route path="/scheduler/calendar/new" page={InterviewSchedulerEventNewInterviewSchedulerEventPage} name="newInterviewSchedulerEvent" />
        <Route path="/scheduler/calendar/{id:Int}/edit" page={InterviewSchedulerEventEditInterviewSchedulerEventPage} name="editInterviewSchedulerEvent" />
        <Route path="/scheduler/calendar/{id:Int}" page={InterviewSchedulerEventInterviewSchedulerEventPage} name="interviewSchedulerEvent" />
        <Route path="/scheduler/calendar" page={InterviewSchedulerEventInterviewSchedulerEventsPage} name="interviewSchedulerEvents" />
      </Set>
      <Set wrap={ConfiguredOAuthLayout} private roles={[RoleList.EvocsInternal, RoleList.Admin]} unauthenticated="home" title="ConfiguredOAuths" titleTo="configuredOAuths" buttonLabel="New ConfiguredOAuth" buttonTo="newConfiguredOAuth">
        <Route path="/configured-oauth/new" page={ConfiguredOAuthNewConfiguredOAuthPage} name="newConfiguredOAuth" />
        <Route path="/configured-oauth/{id:Int}/edit" page={ConfiguredOAuthEditConfiguredOAuthPage} name="editConfiguredOAuth" />
        <Route path="/configured-oauth/{id:Int}" page={ConfiguredOAuthConfiguredOAuthPage} name="configuredOAuth" />
        <Route path="/configured-oauth" page={ConfiguredOAuthConfiguredOAuthsPage} name="configuredOAuths" />
      </Set>
      <Set wrap={ProductAuthLayout} private unauthenticated="home">
        <Route path="/products/{productID:Int}/auth" page={ProductAuthPage} name="productAuth" />
      </Set>
      <Set wrap={RequiredOAuthsLayout} private roles={[RoleList.EvocsInternal, RoleList.Admin]} unauthenticated="home">
        <Route path="/required-oAuths/new" page={RequiredOAuthNewRequiredOAuthPage} name="newRequiredOAuth" />
        <Route path="/required-oAuths/{id:Int}/edit" page={RequiredOAuthEditRequiredOAuthPage} name="editRequiredOAuth" />
        <Route path="/required-oAuths/{id:Int}" page={RequiredOAuthRequiredOAuthPage} name="requiredOAuth" />
        <Route path="/required-oAuths" page={RequiredOAuthRequiredOAuthsPage} name="requiredOAuths" />
      </Set>
      <Set wrap={CustomerTenantsLayout} private roles={[RoleList.EvocsInternal, RoleList.Admin]} unauthenticated="home">
        <Route path="/customer-tenants/new" page={CustomerTenantNewCustomerTenantPage} name="newCustomerTenant" />
        <Route path="/customer-tenants/{id:Int}/edit" page={CustomerTenantEditCustomerTenantPage} name="editCustomerTenant" />
        <Route path="/customer-tenants/{id:Int}" page={CustomerTenantCustomerTenantPage} name="customerTenant" />
        <Route path="/customer-tenants" page={CustomerTenantCustomerTenantsPage} name="customerTenants" />
      </Set>
      <Set wrap={CustomersLayout} private roles={[RoleList.EvocsInternal, RoleList.Admin]} unauthenticated="home">
        <Route path="/customers/new" page={CustomerNewCustomerPage} name="newCustomer" />
        <Route path="/customers/{id:Int}/edit" page={CustomerEditCustomerPage} name="editCustomer" />
        <Route path="/customers/{id:Int}" page={CustomerCustomerPage} name="customer" />
        <Route path="/customers" page={CustomerCustomersPage} name="customers" />
      </Set>
      <Set wrap={JobsLayout}>
        <Route path="/jobs/new" page={JobNewJobPage} name="newJob" />
        <Private roles={[RoleList.EvocsInternal, RoleList.Admin]} unauthenticated="home">
          <Route path="/jobs/{id:Int}/edit" page={JobEditJobPage} name="editJob" />
        </Private>
        <Route path="/jobs/{id:Int}" page={JobJobPage} name="job" />
        <Route path="/jobs" page={JobJobsPage} name="jobs" />
      </Set>
      <Set wrap={UsersLayout} private roles={[RoleList.EvocsInternal, RoleList.Admin]} unauthenticated="home">
        <Route path="/users/new" page={UserNewUserPage} name="newUser" />
        <Route path="/users/{id:Int}/edit" page={UserEditUserPage} name="editUser" />
        <Route path="/users/{id:Int}" page={UserUserPage} name="user" />
        <Route path="/users" page={UserUsersPage} name="users" />
      </Set>
      <Set wrap={ProductsLayout}>
        <Private unauthenticated="home">
          <Route path="/products/new" page={ProductNewProductPage} name="newProduct" />
          <Route path="/products/{id:Int}/edit" page={ProductEditProductPage} name="editProduct" />
        </Private>
        <Route path="/products/{id:Int}" page={ProductProductPage} name="product" />
        <Route path="/products" page={ProductProductsPage} name="products" />
      </Set>
      <Set wrap={CustomerProductsLayout} private roles={[RoleList.EvocsInternal, RoleList.Admin]} unauthenticated="home">
        <Route path="/customer-products/new" page={CustomerProductNewCustomerProductPage} name="newCustomerProduct" />
        <Route path="/customer-products/{id:Int}/edit" page={CustomerProductEditCustomerProductPage} name="editCustomerProduct" />
        <Route path="/customer-products/{id:Int}" page={CustomerProductCustomerProductPage} name="customerProduct" />
        <Route path="/customer-products" page={CustomerProductCustomerProductsPage} name="customerProducts" />
      </Set>
      <Set wrap={SchedulerLayout} title="Dashboard">
        <Route path="/dashboard" page={DashboardHomePage} name="dashboardHome" />
      </Set>
      {/* placeholders */}
      <Set wrap={SchedulerLayout} title="" private unauthenticated="home">
        <Route path="/listview" page={ListViewPage} name="listview" />
        <Route path="/applicant" page={ApplicantDetail} name="applicant" />
        <Route path="/candidate" page={CandidateDetail} name="candidate" />
      </Set>
      <Set wrap={SchedulerLayout} title="">
        <Route path="/setting" page={SettingPage} name="setting" />
      </Set>
      <Route path="/about" page={AboutPage} name="about" />
      <Route path="/" page={HomePage} name="home" />
      <Route notfound page={NotFoundPage} />
    </Router>
  );
};

export default Routes;

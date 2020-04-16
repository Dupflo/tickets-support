import Permissions from 'security/permissions';
import { i18n } from 'i18n';
const permissions = Permissions.values;

const privateRoutes = [
  // {
  //   path: '/',
  //   icon: 'fas fa-home',
  //   label: i18n('home.menu'),
  //   menu: {
  //     exact: true,
  //   },
  //   loader: () => import('view/home/HomePage'),
  //   permissionRequired: null,
  //   exact: true,
  // },

  {
    path: '/profile',
    loader: () => import('view/auth/ProfileFormPage'),
    permissionRequired: null,
    exact: true,
    menu: false,
  },

  {
    path: '/iam',
    loader: () => import('view/iam/list/IamPage'),
    permissionRequired: permissions.iamRead,
    exact: true,
    icon: 'fas fa-user-plus',
    label: i18n('iam.menu'),
    menu: true,
  },
  {
    path: '/iam/new',
    loader: () => import('view/iam/new/IamNewPage'),
    menu: false,
    permissionRequired: permissions.iamCreate,
    exact: true,
  },
  {
    path: '/iam/importer',
    loader: () =>
      import('view/iam/importer/IamImporterPage'),
    menu: false,
    permissionRequired: permissions.iamImport,
    exact: true,
  },
  {
    path: '/iam/:id/edit',
    loader: () => import('view/iam/edit/IamEditPage'),
    menu: false,
    permissionRequired: permissions.iamEdit,
    exact: true,
  },
  {
    path: '/iam/:id',
    loader: () => import('view/iam/view/IamViewPage'),
    menu: false,
    permissionRequired: permissions.iamRead,
    exact: true,
  },

  {
    path: '/audit-logs',
    icon: 'fas fa-history',
    label: i18n('auditLog.menu'),
    loader: () => import('view/auditLog/AuditLogPage'),
    menu: true,
    permissionRequired: permissions.auditLogRead,
  },

  {
    path: '/settings',
    icon: 'fas fa-cog',
    label: i18n('settings.menu'),
    loader: () => import('view/settings/SettingsFormPage'),
    permissionRequired: permissions.settingsEdit,
    menu: true,
  },

  {
    path: '/ticket',
    loader: () => import('view/ticket/list/TicketListPage'),
    permissionRequired: permissions.ticketRead,
    exact: true,
    icon: 'fas fa-chevron-right',
    label: i18n('entities.ticket.menu'),
    menu: true,
  },
  {
    path: '/ticket/new',
    loader: () => import('view/ticket/form/TicketFormPage'),
    menu: false,
    permissionRequired: permissions.ticketCreate,
    exact: true,
  },
  {
    path: '/ticket/importer',
    loader: () =>
      import('view/ticket/importer/TicketImporterPage'),
    menu: false,
    permissionRequired: permissions.ticketImport,
    exact: true,
  },
  {
    path: '/ticket/:id/edit',
    loader: () => import('view/ticket/form/TicketFormPage'),
    menu: false,
    permissionRequired: permissions.ticketEdit,
    exact: true,
  },
  {
    path: '/ticket/:id',
    loader: () => import('view/ticket/view/TicketViewPage'),
    menu: false,
    permissionRequired: permissions.ticketRead,
    exact: true,
  },

  {
    path: '/request',
    loader: () => import('view/request/list/RequestListPage'),
    permissionRequired: permissions.requestRead,
    exact: true,
    icon: 'fas fa-chevron-right',
    label: i18n('entities.request.menu'),
    menu: true,
  },
  {
    path: '/request/new',
    loader: () => import('view/request/form/RequestFormPage'),
    menu: false,
    permissionRequired: permissions.requestCreate,
    exact: true,
  },
  {
    path: '/request/importer',
    loader: () =>
      import('view/request/importer/RequestImporterPage'),
    menu: false,
    permissionRequired: permissions.requestImport,
    exact: true,
  },
  {
    path: '/request/:id/edit',
    loader: () => import('view/request/form/RequestFormPage'),
    menu: false,
    permissionRequired: permissions.requestEdit,
    exact: true,
  },
  {
    path: '/request/:id',
    loader: () => import('view/request/view/RequestViewPage'),
    menu: false,
    permissionRequired: permissions.requestRead,
    exact: true,
  },
];

const publicRoutes = [
  {
    path: '/auth/signin',
    loader: () => import('view/auth/SigninPage'),
  },
  {
    path: '/auth/signup',
    loader: () => import('view/auth/SignupPage'),
  },
  {
    path: '/auth/forgot-password',
    loader: () => import('view/auth/ForgotPasswordPage'),
  },
];

const emptyPermissionsRoutes = [
  {
    path: '/auth/empty-permissions',
    loader: () => import('view/auth/EmptyPermissionsPage'),
  },
];

const emailUnverifiedRoutes = [
  {
    path: '/auth/email-unverified',
    loader: () => import('view/auth/EmailUnverifiedPage'),
  },
];

const simpleRoutes = [
  {
    path: '/auth/password-reset',
    loader: () => import('view/auth/PasswordResetPage'),
  },
  {
    path: '/auth/verify-email',
    loader: () => import('view/auth/VerifyEmailPage'),
  },
  {
    path: '/403',
    loader: () => import('view/shared/errors/Error403Page'),
  },
  {
    path: '/500',
    loader: () => import('view/shared/errors/Error500Page'),
  },
  {
    path: '**',
    loader: () => import('view/shared/errors/Error404Page'),
  },
];

export default {
  privateRoutes,
  publicRoutes,
  emptyPermissionsRoutes,
  emailUnverifiedRoutes,
  simpleRoutes,
};

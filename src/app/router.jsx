import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout.jsx';
import AuthLayout from '../layouts/AuthLayout.jsx';
import { PageSpinner } from '../components/common/Spinner.jsx';
import RouteError from '../pages/RouteError.jsx';
import HomePage from '../pages/public/HomePage.jsx';

// Chargement paresseux : la page d'accueil est livrée seule, le reste à la demande.
const FeaturesPage = lazy(() => import('../pages/public/FeaturesPage.jsx'));
const HowItWorksPage = lazy(() => import('../pages/public/HowItWorksPage.jsx'));
const LegalPage = lazy(() => import('../pages/public/LegalPage.jsx'));
const NotFoundPage = lazy(() => import('../pages/public/NotFoundPage.jsx'));
const LoginPage = lazy(() => import('../pages/public/LoginPage.jsx'));
const RegisterPage = lazy(() => import('../pages/public/RegisterPage.jsx'));
const ForgotPasswordPage = lazy(() => import('../pages/public/ForgotPasswordPage.jsx'));
const EnterpriseSpacePage = lazy(() => import('../pages/public/EnterpriseSpacePage.jsx'));

const s = (el) => <Suspense fallback={<PageSpinner />}>{el}</Suspense>;

/** Site vitrine seul : le back-office des administrateurs est une application distincte. */
export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    errorElement: <RouteError />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'fonctionnalites', element: s(<FeaturesPage />) },
      { path: 'comment-ca-marche', element: s(<HowItWorksPage />) },
      { path: 'mentions-legales', element: s(<LegalPage page="mentions" />) },
      { path: 'confidentialite', element: s(<LegalPage page="confidentialite" />) },
      { path: 'conditions-utilisation', element: s(<LegalPage page="conditions" />) },
      { path: '*', element: s(<NotFoundPage />) },
    ],
  },
  {
    element: <AuthLayout />,
    errorElement: <RouteError />,
    children: [
      { path: 'connexion', element: s(<LoginPage />) },
      { path: 'inscription', element: s(<RegisterPage />) },
      { path: 'mot-de-passe-oublie', element: s(<ForgotPasswordPage />) },
      { path: 'espace-entreprise', element: s(<EnterpriseSpacePage />) },
    ],
  },
]);

import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import ChooseServicePage from "./pages/ChooseService";
import Expert from "./pages/Expert";
import CreateOrderPage from "./pages/CreateOrder";
import TimePage from "./pages/TimePage";
import ConfirmaionPage from "./pages/Сonfirmation";
import OrderDetails from "./pages/OrderDetails";
import Promotion from "./pages/Promotion";
import PhotoPage from "./pages/Photo";
import FAQ from "./pages/FAQ";
import LeaveReview from "./pages/LeaveReview";
import ContactsPage from "./pages/Contacts";
import ChooseExpert from "./pages/ChooseExpert";
import NavigationPage from "./pages/NavigationPage";

const routes = [
  {
    path: "*",
    element: <NavigationPage />,
  },
  {
    path: "/",
    element: <NavigationPage />,
  },

  {
    path: "/create-order",
    element: <CreateOrderPage />,
  },
  {
    path: "/choose-expert",
    element: <ChooseExpert />,
  },
  {
    path: "/expert/:fio",
    element: <Expert />,
  },
  {
    path: "/choose-service",
    element: <ChooseServicePage />,
  },
  {
    path: "/choose-time",
    element: <TimePage />,
  },
  {
    path: "/confirmation",
    element: <ConfirmaionPage />,
  },
  {
    path: "/order-details",
    element: <OrderDetails />,
  },
  {
    path: "/photo",
    element: <PhotoPage />,
  },
  {
    path: "/promotion",
    element: <Promotion />,
  },
  {
    path: "/faq",
    element: <FAQ />,
  },
  {
    path: "/leave-review",
    element: <LeaveReview />,
  },
  {
    path: "/contacts",
    element: <ContactsPage />,
  },
];

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} {...route} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

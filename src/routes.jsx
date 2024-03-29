import React, { useEffect, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useRoutes, Outlet } from "react-router-dom";

import ROLES from "./constants/userRoles";
import { useLocalStorage } from "./hooks";
import { LoadingPage } from "./components";
import ACTION_STATUS from "./constants/actionStatus";
// import { getCurrentUserInfo } from "./features/auth/authSlice";
import LoginPage from "./pages/auth/LoginPage";
import ProfilePage from "./pages/admin/setting/profile/ProfilePage";
import PasswordPage from "./pages/admin/setting/password/PasswordPage";

import { AdminLayout } from "./layouts";

import { DashboardPage } from "./pages/admin";

const BannersPage = lazy(() => import("./pages/admin/banner/BannersPage"));
const UserListPage = lazy(() => import("./pages/admin/user/UserListPage"));
const OrderListPage = lazy(() => import("./pages/admin/order/OrderListPage"));
const BrandListPage = lazy(() => import("./pages/admin/brand/BrandListPage"));
const CreateUserPage = lazy(() => import("./pages/admin/user/CreateUserPage"));
const UpdateUserPage = lazy(() => import("./pages/admin/user/UpdateUserPage"));
const UserDetailsPage = lazy(() =>
  import("./pages/admin/user/UserDetailsPage")
);
const CategoryListPage = lazy(() =>
  import("./pages/admin/category/CategoryListPage")
);
const AdminOrderDetailsPage = lazy(() =>
  import("./pages/admin/order/OrderDetailsPage")
);
const InventoryListPage = lazy(() =>
  import("./pages/admin/inventory/InventoryListPage")
);

const ProductOriginListPage = lazy(() =>
  import("./pages/admin/product-origin/ProductOriginListPage")
);
const CreateProductOriginPage = lazy(() =>
  import("./pages/admin/product-origin/CreateProductOriginPage")
);
const UpdateProductOriginPage = lazy(() =>
  import("./pages/admin/product-origin/UpdateProductOriginPage")
);
const ProductOriginDetailsPage = lazy(() =>
  import("./pages/admin/product-origin/ProductOriginDetailsPage")
);

const ProductVariantListPage = lazy(() =>
  import("./pages/admin/product-variant/ProductVariantListPage")
);
const CreateProductVariantPage = lazy(() =>
  import("./pages/admin/product-variant/CreateProductVariantPage")
);
const UpdateProductVariantPage = lazy(() =>
  import("./pages/admin/product-variant/UpdateProductVariantPage")
);
const ProductVariantDetailsPage = lazy(() =>
  import("./pages/admin/product-variant/ProductVariantDetailsPage")
);

const RejectedRoute = () => {
  const dispatch = useDispatch();
  const [accessToken] = useLocalStorage("accessToken", null);
  // const { getCurrentUserStatus, user } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   if (accessToken && getCurrentUserStatus === ACTION_STATUS.IDLE) {
  //     dispatch(getCurrentUserInfo());
  //   }
  // }, []);

  // if (getCurrentUserStatus === ACTION_STATUS.LOADING) {
  //   return <LoadingPage />;
  // }

  // if (getCurrentUserStatus === ACTION_STATUS.SUCCEEDED) {
  //   if (checkoutClicked) {
  //     return <Navigate to="/checkout" />;
  //   }

  //   if (user?.role === ROLES.ADMIN) {
  //     return <Navigate to="/admin/dashboard" />;
  //   } else {
  //     return <Navigate to="/" />;
  //   }
  // }

  return <Outlet />;
};

// const ProtectedAdminRoute = () => {
//   const dispatch = useDispatch();
//   const [accessToken] = useLocalStorage("accessToken", null);
//   const { getCurrentUserStatus, user } = useSelector((state) => state.auth);

//   useEffect(() => {
//     if (accessToken && getCurrentUserStatus === ACTION_STATUS.IDLE) {
//       dispatch(getCurrentUserInfo());
//     }
//   }, []);

//   if (!accessToken && getCurrentUserStatus === ACTION_STATUS.IDLE) {
//     return <Navigate to="/" />;
//   }

//   if (accessToken && getCurrentUserStatus === ACTION_STATUS.IDLE) {
//     return <Outlet />;
//   }

//   if (getCurrentUserStatus === ACTION_STATUS.LOADING) {
//     return <LoadingPage />;
//   }

//   if (getCurrentUserStatus === ACTION_STATUS.FAILED) {
//     return <Navigate to="/" />;
//   }

//   return getCurrentUserStatus === ACTION_STATUS.SUCCEEDED &&
//     user?.role === ROLES.ADMIN ? (
//     <Outlet />
//   ) : (
//     <Navigate to="/" />
//   );
// };

const Router = () => {
  return useRoutes([
    {
      path: "admin",
      // element: <ProtectedAdminRoute />,
      children: [
        {
          path: "",
          element: <AdminLayout />,
          children: [
            { path: "", element: <Navigate to="dashboard" /> },
            { path: "dashboard", element: <DashboardPage /> },
            {
              path: "users",
              children: [
                {
                  path: "",
                  element: <Navigate to="list" />,
                },
                {
                  path: "list",
                  element: <UserListPage />,
                },
                {
                  path: "create",
                  element: <CreateUserPage />,
                },
                {
                  path: "edit/:id",
                  element: <UpdateUserPage />,
                },
                {
                  path: "details/:id",
                  element: <UserDetailsPage />,
                },
              ],
            },
            {
              path: "product-origins",
              children: [
                {
                  path: "",
                  element: <Navigate to="list" />,
                },
                {
                  path: "list",
                  element: <ProductOriginListPage />,
                },
                {
                  path: "create",
                  element: <CreateProductOriginPage />,
                },
                {
                  path: "details/:id",
                  element: <ProductOriginDetailsPage />,
                },
                {
                  path: "edit/:id",
                  element: <UpdateProductOriginPage />,
                },
              ],
            },
            {
              path: "product-variants",
              children: [
                {
                  path: "",
                  element: <Navigate to="list" />,
                },
                {
                  path: "list",
                  element: <ProductVariantListPage />,
                },
                {
                  path: "create",
                  element: <CreateProductVariantPage />,
                },
                {
                  path: "details/:id",
                  element: <ProductVariantDetailsPage />,
                },
                {
                  path: "edit/:id",
                  element: <UpdateProductVariantPage />,
                },
              ],
            },
            {
              path: "categories",
              element: <CategoryListPage />,
            },
            {
              path: "brands",
              element: <BrandListPage />,
            },
            {
              path: "warehouse",
              element: <InventoryListPage />,
            },
            {
              path: "orders",
              children: [
                { path: "", element: <Navigate to="list" /> },
                { path: "list", element: <OrderListPage /> },
                { path: "details/:id", element: <AdminOrderDetailsPage /> },
              ],
            },
            {
              path: "banners",
              element: <BannersPage />,
            },
          ],
        },
        {
          path: "profile",
          element: <ProfilePage />,
        },
        {
          path: "password",
          element: <PasswordPage />,
        },
      ],
    },
    {
      path: "",
      element: <RejectedRoute />,
      children: [
        {
          path: "login",
          element: <LoginPage />,
        },
      ],
    },
  ]);
};

export default Router;

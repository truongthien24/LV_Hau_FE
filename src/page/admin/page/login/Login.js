import React from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import useLogin from "./hook/useLoginAdmin";
import toast from "react-hot-toast";
import useLoadingEffect from "fuse/hook/useLoadingEffect";
import { FormBaseLogin } from "page/user/component/Form/FormBaseLogin";

export const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { mutate, isLoading: isSubmitting } = useLogin();

  const initialValue = {
    tenDangNhap: "",
    matKhau: "",
  };

  const formField = [
    {
      name: "tenDangNhap",
      type: "string",
      label: "Tài khoản",
    },
    {
      name: "matKhau",
      type: "password",
      label: "Mật khẩu",
    },
  ];

  const validationSchema = yup.object().shape({
    tenDangNhap: yup.string().required("Please input...."),
    matKhau: yup.string().required("Please input...."),
  });

  // useEffect(()=> {
  //   if(window.location.pathname === "/user/login") {
  //     window.onclick = () => navigate("/user");
  //   }
  // })

  const login = async (data) => {
    await mutate({
      Data: data?.data,
      onSuccess: async (msg) => {
        toast.success(msg?.data?.Message);
        localStorage.setItem("jwt", JSON.stringify(msg.data.token));
        localStorage.setItem("current_user", JSON.stringify(msg.data.Data));
        setTimeout(() => {
          window.location.replace("/admin");
        }, 500);
      },
      onError: async (err) => {
        toast.error(err?.error?.message);
      },
    });
  };

  useLoadingEffect(isSubmitting);

  return (
    <>
      <div className="fixed flex items-center top-0 left-0 w-screen h-screen bg-[#ffeadc] z-[101]">
        <div className="flex flex-1 items-center justify-center">
          <img src="/images/logo.png" className="w-[200px] md:w-[250px]" />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div
            className="bg-[#f7d38f00] w-[85%] md:w-[450px] rounded-[10px] px-[15px] md:px-[30px] py-[20px]"
            style={{ boxShadow: "rgba(0, 0, 0, 0.26) 0px 5px 40px" }}
          >
            <div className="flex items-center justify-between mb-[20px] md:mb-[30px]">
              <h3 className="text-[20px] md:text-[25px] font-[500] text-[#498374]">
                {t("login")}
              </h3>
              <span
                className="text-[25px] md:text-[30px] font-[500] translate-y-[-5px] text-[#498374] cursor-pointer"
                onClick={() => {
                  navigate("/");
                }}
              >
                &times;
              </span>
            </div>
            <div className="flex items-center justify-center">
              <FormBaseLogin
                initialValue={initialValue}
                formField={formField}
                validationSchema={validationSchema}
                methodSubmit={login}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

import React, {
  createContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Footer } from "../component/Footer";
import { ScrollToTop } from "../component/ScrollToTop";
import { useDispatch } from "react-redux";
import { getUser } from "../../../redux/action/accountAction";
import Navbar from "../component/Navbar";
import { setUserInfo } from "redux/action/homeAction";
import { jwtDecode } from "jwt-decode";
import useGetAccountByID from "page/admin/page/AccountManagement/hook/useGetAccountByID";
import { toast } from "react-hot-toast";

export const LayoutContext = createContext(null);

export const Layout1 = () => {
  const pathname = window.location.pathname;

  const dispatch = useDispatch();

  const [isMenuMobile, setIsMenuMobile] = useState(false);

  const navigate = useNavigate();

  const [audio, setAudio] = useState(
    new Audio("/audio/HOÀ-NHỊP-GIÁNG-SINH.mp3")
  );

  const [play, setPlay] = useState(false);

  const [id, setId] = useState(null);

  useEffect(() => {
    const jwt = JSON.parse(localStorage.getItem("jwt"));
    if (jwt) {
      const jwtDC = jwtDecode(jwt);
      console.log("jwtDC", jwtDC);
      if (["user"].includes(jwtDC?.users?.loaiTaiKhoan)) {
        setId(jwtDC?.users?._id);
      } else {
        navigate("/admin");
        toast.error("Tài khoản không được phân quyền");
      }
    }
  }, []);

  useLayoutEffect(() => {
    if (play) {
      audio.volume = 0.5;
      audio.play();
    } else {
      audio.pause();
    }
  }, [play]);

  audio.onended = () => {
    audio.play();
  };

  window.addEventListener("resize", () => {
    const innerWidth = window.innerWidth;
    if (innerWidth < 900) {
      setIsMenuMobile(true);
    } else {
      setIsMenuMobile(false);
    }
  });

  const { accountData, isDataLoading, fetchData, isFetching } =
    useGetAccountByID({ id: id });

  useEffect(() => {
    if (accountData) {
      dispatch(setUserInfo(accountData));
    }
  }, [accountData]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const innerWidth = window.innerWidth;
    if (innerWidth < 900) {
      setIsMenuMobile(true);
    } else {
      setIsMenuMobile(false);
    }
  }, []);

  return (
    <LayoutContext.Provider
      value={{ isMobile: isMenuMobile, fetchDataAccount: fetchData }}
    >
      <div className="user bg-[#fcfcfc]">
        <Navbar />
        <div className="min-h-screen flex flex-col justify-between">
          <Outlet />
          <Footer />
        </div>
        <ScrollToTop />
        <button
          className="botón fixed right-0 top-[90%] md:right-1 md:top-[100px] z-[16] bg-contain bg-top bg-no-repeat"
          style={{ backgroundImage: "url(/images/caythong.png)" }}
          id="hehe"
          onClick={(e) => {
            const rest = document.querySelector("#hehe");
            rest.classList.toggle("active");
            setPlay((prev) => !prev);
          }}
        >
          <div className="fondo" x="0" y="0" width="100" height="100"></div>
          <div className="icono" width="100" height="100">
            <div
              className="parte izquierda"
              x="0"
              y="0"
              width="100"
              height="100"
              fill="#fff"
            ></div>
            <div
              className="parte derecha"
              x="0"
              y="0"
              width="100"
              height="100"
              fill="#fff"
            ></div>
          </div>
          <div className="puntero"></div>
        </button>
      </div>
    </LayoutContext.Provider>
  );
};

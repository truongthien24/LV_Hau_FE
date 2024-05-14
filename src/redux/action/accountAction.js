import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import Swal from "sweetalert2";
import { setLoading } from "./homeAction";

// Đăng nhập user
export const loginUser = (data) => async (dispatch) => {
};

// Đăng ký user
export const registerUser = (data) => async (dispatch) => {
};

// Đăng nhập admin
export const loginAdmin = (data) => async (dispatch) => {
};

// Lấy thông tin account với id
export const getUser = (id) => async (dispatch) => {
};

// Lấy thông tin tất cả account
export const getAllUser = () => async (dispatch) => {
};

export const getAllUserNotReducer = () => async (dispatch) => {
};

// Cập nhật thông tin account
export const updateUser = (data) => async (dispatch) => {
};

// Xoá account
export const deleteUser = (data) => async (dispatch) => {
};

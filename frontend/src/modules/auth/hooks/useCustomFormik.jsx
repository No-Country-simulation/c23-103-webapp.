import { useFormik } from "formik";
import { handleFormSubmit } from "../services/handleFormSubmit";
import { useContext, useState } from "react";
import { AppContext } from "../../../context/context";

export const useCustomFormik = (initialValues, validationSchema, formType) => {
  const { addUserInfo } = useContext(AppContext)
  const [showPopup, setShowPopup] = useState(false);
  const [formResult, setFormResult] = useState({
    success: false,
    userId: null,
  });

  const closePopup = () => setShowPopup(false);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const result = await handleFormSubmit(values, formType);
      console.log("%c result :", "background-color:#F6511D", result);
      addUserInfo(result.userInfo)
      setFormResult({ success: result.success, userId: result.userInfo.id });
      setShowPopup(true);
    },
  });

  return { ...formik, showPopup, formResult, closePopup };
};
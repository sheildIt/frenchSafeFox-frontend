// reduxModule.js
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentToken, selectCurrentUser } from "../auth/redux/authSlice";
import { selectCompany, selectCompanyId } from "../auth/redux/companyReducer";

export const useRedux = () => {
  const dispatch = useDispatch();
  const currentToken = useSelector(selectCurrentToken);
  const currentUser = useSelector(selectCurrentUser);
  const currentCompany = useSelector(selectCompany);
  const currentCompanyId = useSelector(selectCompanyId);

  return {
    dispatch,
    currentToken,
    currentUser,
    currentCompany,
    currentCompanyId,
  };
};

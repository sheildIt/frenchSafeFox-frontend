// reduxModule.js
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentToken, selectCurrentUser } from "../auth/redux/authSlice";
import { selectCompany, selectCompanyId } from "../auth/redux/companyReducer";
import { selectDepartmentList } from "../auth/redux/departmentsReducer";
import { selectTemplate } from "../auth/redux/templateReducer";
import { selectAnalytics } from "../auth/redux/analyticsReducer";

export const useRedux = () => {
  const dispatch = useDispatch();
  const currentToken = useSelector(selectCurrentToken);
  const currentUser = useSelector(selectCurrentUser);
  const currentCompany = useSelector(selectCompany);
  const currentCompanyId = useSelector(selectCompanyId);
  const currentDepartmentList = useSelector(selectDepartmentList);
  const currentTemplateList = useSelector(selectTemplate);
  const currentAnalyticsData = useSelector(selectAnalytics);

  return {
    dispatch,
    currentToken,
    currentUser,
    currentCompany,
    currentCompanyId,
    currentDepartmentList,
    currentTemplateList,
    currentAnalyticsData,
  };
};

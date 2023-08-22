import {SHOPTYPES} from "../action/ShopAction";

  
  const initialState = {
    data: [],
    // loading: false,
    // error: null,
  };
  
  export const ShopReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case SHOPTYPES.FETCH_DATA_SUCCESS:
        return { ...state, userDetail: payload.user };
      default:
        return state;
    }
  };
  
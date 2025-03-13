import {
  ADD_USER_ADDRESS,
  VIEW_ALL_USER_ADDRESSES,
  GET_SPECIFIC_USER_ADDRESS,
  UPDATE_USER_ADDRESS,
} from "../type";

// Initial state for user address reducer
const initialState = {
  addUserAddress: [], // State for added user address
  viewUserAddresses: [], // State for viewing all user addresses
  specificUserAddress: [], // State for a specific user address
  updatedUserAddress: [], // State for updated user address
  loading: true, // State for loading status
};

// Reducer function to handle user address actions
const userAddressReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER_ADDRESS:
      // Handle adding a user address
      return { ...state, addUserAddress: action.payload, loading: false };

    case VIEW_ALL_USER_ADDRESSES:
      // Handle viewing all user addresses
      return { ...state, viewUserAddresses: action.payload, loading: false };

    case GET_SPECIFIC_USER_ADDRESS:
      // Handle getting a specific user address
      return { ...state, specificUserAddress: action.payload, loading: false };

    case UPDATE_USER_ADDRESS:
      // Handle updating a user address
      return { ...state, updatedUserAddress: action.payload, loading: false };

    default:
      // Return the current state if action type is not recognized
      return state;
  }
};

export default userAddressReducer;

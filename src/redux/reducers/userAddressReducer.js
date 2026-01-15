import {
  ADD_USER_ADDRESS,
  VIEW_ALL_USER_ADDRESSES,
  GET_SPECIFIC_USER_ADDRESS,
  UPDATE_USER_ADDRESS,
  DELETE_USER_ADDRESS,
  RESET_STATE,
  GET_ERROR,
} from "../type";

// Initial state for user address reducer
const initialState = {
  addUserAddress: [], // State for added user address
  viewUserAddresses: [], // State for viewing all user addresses
  specificUserAddress: [], // State for a specific user address
  updatedUserAddress: [], // State for updated user address
  deletedUserAddress: [],

  loading: {
    fetchAll: true,
    fetchSpecific: true,
    create: true,
    delete: true,
    update: true,
  },

  error: {
    fetchAll: null,
    fetchSpecific: null,
    create: null,
    delete: null,
    update: null,
  },
};

// Reducer function to handle user address actions
const userAddressReducer = (state = initialState, action) => {
  switch (action.type) {
    case VIEW_ALL_USER_ADDRESSES:
      // Handle viewing all user addresses
      return {
        ...state,
        viewUserAddresses: action.payload,
        loading: { ...state.loading, fetchAll: false },
        error: { ...state.error, fetchAll: null },
      };

    case GET_SPECIFIC_USER_ADDRESS:
      // Handle getting a specific user address
      return {
        ...state,
        specificUserAddress: action.payload,
        loading: { ...state.loading, fetchSpecific: false },
        error: { ...state.error, fetchSpecific: null },
      };

    case ADD_USER_ADDRESS:
      // Handle adding a user address
      return {
        ...state,
        addUserAddress: action.payload,
        viewUserAddresses: {
          ...state.viewUserAddresses,
          data: [...(state.viewUserAddresses.data || []), action.payload],
          paginationResult: state.viewUserAddresses.paginationResult,
        },
        loading: { ...state.loading, create: false },
        error: { ...state.error, create: null },
      };

    case DELETE_USER_ADDRESS:
      return {
        ...state,
        viewUserAddresses: {
          ...state.viewUserAddresses,
          data: state.viewUserAddresses.data.filter(
            (b) => b._id !== action.payload.id
          ),
          paginationResult: state.viewUserAddresses.paginationResult,
        },
        deletedUserAddress: action.payload.response,

        loading: { ...state.loading, delete: false },
        error: { ...state.error, delete: null },
      };

    case UPDATE_USER_ADDRESS:
      // Handle updating a user address
      return {
        ...state,
        updatedUserAddress: action.payload,
        loading: { ...state.loading, update: false },
        error: { ...state.error, update: null },
      };

    case RESET_STATE:
      return {
        ...state,
        loading: {
          fetchAll: true,
          fetchSpecific: true,
          create: true,
          delete: true,
          update: true,
        },
        error: {
          fetchAll: null,
          fetchSpecific: null,
          create: null,
          delete: null,
          update: null,
        },
      };

    case GET_ERROR:
      return {
        ...state,
        loading: {
          ...state.loading,
          [action.meta]: false,
        },
        error: {
          ...state.error,
          [action.meta]: action.payload,
        },
      };

    default:
      // Return the current state if action type is not recognized
      return state;
  }
};

export default userAddressReducer;

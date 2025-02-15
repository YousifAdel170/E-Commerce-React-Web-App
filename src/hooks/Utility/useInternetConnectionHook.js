import notify from "./useNotifyHook";

const internetDetect = () => {
  if (!navigator.onLine) {
    notify("هناك مشكله فى الاتصال بالانترنت", "warn");
    return;
  }
};

export default internetDetect;

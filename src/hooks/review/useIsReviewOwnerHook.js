import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useIsReviewOwner = (review) => {
  const [isOwner, setIsOwner] = useState(false);
  const { user } = useSelector((state) => state.authReducer);

  useEffect(() => {
    if (!user || !review) return false;

    setIsOwner(user?._id === review?.user || user?._id === review?.user?._id);
  }, [user, review, isOwner]);

  return [isOwner];
};

export default useIsReviewOwner;

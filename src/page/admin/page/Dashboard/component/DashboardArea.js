import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { AreaAccount } from "./AreaAccount";
import { AreaBooking } from "./AreaBooking";
import { AreaReaction } from "./AreaReaction";

export const DashboardArea = (props) => {
  // Props
  const { segment } = props;

  const dispatch = useDispatch();

  const [isData, setIsData] = useState([]);

  useEffect(async () => {
    if (segment === "Account") {
    } else if (segment === "Booking") {
    } else {
    }
    return () => {
      setIsData([]);
    };
  }, [segment]);

  // Method
  const renderArea = () => {
    switch (segment) {
      case "Account":
        {
          return <AreaAccount listUser={isData} />;
        }
        break;
      case "Booking":
        {
          return <AreaBooking listBooking={isData} />;
        }
        break;
      case "Reaction":
        {
          return <AreaReaction listReaction={isData} />;
        }
        break;
      default:
        return <AreaAccount listUser={isData} />;
    }
  };

  // Return
  return <div className="py-[20px] h-full">{renderArea()}</div>;
};

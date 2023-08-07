import { create } from "domain";

/**
 * @param  {EpochTimeStamp} timestamp
 */
export const timeDifference = (
  timestampNow: EpochTimeStamp,
  dateCreated: string
) => {
  const nowDate = new Date(timestampNow);
  const commentDate = new Date(dateCreated);

  if (nowDate < commentDate) {
    return "undefined";
  }

  const yearDifference = nowDate.getFullYear() - commentDate.getFullYear();
  const monthDifference = nowDate.getMonth() - commentDate.getMonth();
  const daysDifference = nowDate.getDate() - commentDate.getDate();
  const hoursDifference = nowDate.getHours() - commentDate.getHours();
  const minsDifference = nowDate.getMinutes() - commentDate.getMinutes();

  if (yearDifference > 0) {
    return `${yearDifference} year${(yearDifference > 1 && "s") || ""} ago`;
  } else if (yearDifference === 0 && monthDifference > 0) {
    return `${monthDifference} month${(monthDifference > 1 && "s") || ""} ago`;
  } else if (monthDifference === 0 && daysDifference > 0) {
    if (daysDifference === 1) {
      return "Yesterday";
    } else {
      return `${daysDifference} days ago`;
    }
  } else if (daysDifference === 0 && hoursDifference > 0) {
    return `${hoursDifference} hour${(hoursDifference > 1 && "s") || ""} ago`;
  } else if (hoursDifference === 0 && minsDifference > 0) {
    return `${minsDifference} minute${(minsDifference > 1 && "s") || ""} ago`;
  } else {
    return `Just now`;
  }
};

export const getDate = (createdAt: string | undefined) => {
  if (!createdAt) {
    return "Unknown date";
  } else {
    const getDoubleDigitNumber = (number: number) => {
      if (number < 10) {
        return `0${number}`;
      }
      return number;
    };

    const date = new Date(createdAt);
    const day = date.getDay();
    const month = date.getMonth();
    const year = date.getFullYear().toString().slice(2);
    const transformedDate = `${getDoubleDigitNumber(
      month
    )}/${getDoubleDigitNumber(day)}/${year}`;
    return transformedDate;
  }
};

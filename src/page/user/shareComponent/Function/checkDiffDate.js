export const checkDiffDate = (date) => {
    const date1 = new Date();
    const date2 = new Date(date);
    date2.setHours(0,0,0,0);
    date1.setHours(0,0,0,0);
    // // Calculate the number of days
    // const diffDays = parseInt((date2 - date1) / (1000 * 60 * 60 * 24), 10);
    // if (diffDays >= 2) return "#A0D468";   // Xanh
    // else if (diffDays == 1) return "#FFFD37"  // Vàng
    // else if (diffDays == 0) return "#FF00FF"; // Cam  => Tím
    // else return "#F44336";   // Đỏ
    return parseInt((date2 - date1) / (1000 * 60 * 60 * 24), 10);;
  };
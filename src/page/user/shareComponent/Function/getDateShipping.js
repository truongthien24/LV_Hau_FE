export const getDateShipping = (date) => {
    const formDate = new Date(date);
    formDate.setDate(formDate.getDate() + 3);
    const toDate = new Date(date);
    toDate.setDate(toDate.getDate() + 6);
    // return `${formDate.toLocaleDateString('en-GB')} - ${toDate.toLocaleDateString('en-GB')}`
    // 1 mảng chứa 2 phần tử. Mỗi phần tử là một chuỗi được định dạng từ ngày tương ứng  
    return [formDate.toLocaleDateString('en-GB'), toDate.toLocaleDateString('en-GB')]

}
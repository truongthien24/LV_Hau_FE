export const checkLogin = () => {
    const jwt = localStorage.getItem('jwt');
    return jwt ? true : false;
}
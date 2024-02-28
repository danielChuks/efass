export const checkUser = () => {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    if (user) {
        return user;
    }
}

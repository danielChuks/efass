export const checkUser = () => {
     if (typeof window !== 'undefined') {
        const user = JSON.parse(sessionStorage.getItem('user') || '{}');
        return user;
    } else {
        return {}; // Return default value when sessionStorage or user data is not accessible
    }
}

const StoreToken = (token: string) => {
    localStorage.setItem('token', token);
}

export {StoreToken};
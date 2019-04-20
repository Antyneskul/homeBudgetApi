export const validEmail = (email: string) => {
    const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return email && regExp.test(email);
};

export const validPassword = (password: string) => {
    const regExp = /^[A-Za-z]\w{7,15}$/;
    return password && regExp.test(password);
};

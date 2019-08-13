export const isNull = str => {
    return str === '' || str === 'null' || str === null || str === undefined || str === 'undefined'
}

export const isEmail = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/

const Utils = {
    isNull,
    isEmail
}

export default Utils
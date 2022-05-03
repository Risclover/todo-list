const todoItem = (item, description, priority, date) => {
    const getItem = () => item;

    const setItem = (input) => {
        item = input;
    }

    return {getItem, setItem};
}

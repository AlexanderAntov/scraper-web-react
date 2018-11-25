class Observer {
    constructor() {
        this.observers = [];
    }

    subscribe(observer) {
        this.observers.push(observer);
    }

    unSubscribe(observer) {
        const index = this.observers.indexOf(observer);
        if (index > -1) {
            this.observers.slice(index, 1);
        }
    }

    trigger(value) {
        for (let observer of this.observers) {
            observer(value);
        }
    }
}

export default Observer;
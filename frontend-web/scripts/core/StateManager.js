export class StateManager {
    constructor() {
        this.state = {};
    }

    set(key, value) {
        this.state[key] = value;
    }

    get(key) {
        return this.state[key];
    }

    remove(key) {
        delete this.state[key];
    }

    clear() {
        this.state = {};
    }
}

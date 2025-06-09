
export default class Session {
    static #instance: Session;
    private token: string;
    private listeners: ((value: string) => void)[] = [];

    private baseURL: string = 'http://localhost:8080';
    private defaultOptions: RequestInit = {
        mode: 'cors',
        redirect: 'follow'
    };
    private defaultHeaders: HeadersInit = {
        'Content-Type': 'application/json'
    };

    private constructor() { this.token = ''; }

    public static setToken(token: string): void {
        console.log(`TOKEN SET TO: ${Session.instance.token}`);
        Session.instance.token = token;
        Session.instance.listeners.forEach((callback) => callback(token));
        Session.instance.listeners = []; // Clear listeners after notifying
    }

    public isTokenPresent(): boolean {
        return (Session.instance.token !== '');
    }

    public getToken(): string {
        return Session.instance.token;
    }

    public static get instance(): Session {
        if (!Session.#instance) {
            console.log('Created a new Session instance!!!!');
            Session.#instance = new Session();
        }

        return Session.#instance;
    }

    public onTokenAvailable(callback: (value: string) => void) {
        if (Session.instance.token) {
            console.log("Token callback() called!");
            callback(Session.instance.token);
        } else {
            this.listeners.push(callback);
        }
    }

    private _createRequest(endpoint: string, options: RequestInit): Promise<Response> {
        endpoint = (!endpoint.startsWith('/')) ? `/${endpoint}` : endpoint;

        console.log(`TOKEN: ${Session.instance.token}`);

        return fetch(`${this.baseURL}${endpoint}`, { headers: { Authorization: this.getToken(), ...this.defaultHeaders }, ...options, ...this.defaultOptions });
    }

    public GET(endpoint: string): Promise<Response> {
        return this._createRequest(endpoint, { method: 'GET' });
    }

    public POST(endpoint: string, data: object): Promise<Response> {
        return this._createRequest(endpoint, { method: 'POST', body: JSON.stringify(data) });
    }

    public PATCH(endpoint: string): Promise<Response> {
        return this._createRequest(endpoint, { method: 'PATCH' });
    }

    public testInitialize(): void {
        console.log(`testInitialize: ${Session.instance.getToken()}`);
        if (Session.instance.isTokenPresent() === true)
            return;

        const doRequest = async () => {
            await this.POST(`/user/login`, { username: 'admin', password: 'admin' })
                .then((data: Response) => data.json())
                .then((json: { token: string }) => {
                    Session.setToken(json['token']);
                    console.log(`Token set to: ${Session.instance.getToken()}`);
                })
                .catch((error) => console.error('An error occured -', error));
        };

        doRequest();
    }
}


export default class Session {
    static #instance: Session;
    private token: string;

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
        let session: Session = Session.instance;

        session.token = token;
    }

    public isTokenPresent(): boolean {
        return (Session.instance.token !== '');
    }

    public getToken(): string {
        return Session.instance.token;
    }

    public static get instance(): Session {
        if (!Session.#instance) {
            Session.#instance = new Session();
        }

        return Session.#instance;
    }

    private _createRequest(endpoint: string, options: RequestInit): Promise<Response> {
        endpoint = (!endpoint.startsWith('/')) ? `/${endpoint}` : endpoint;

        return fetch(`${this.baseURL}${endpoint}`, { headers: { Authorization: Session.instance.token, ...this.defaultHeaders }, ...options, ...this.defaultOptions });
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

}

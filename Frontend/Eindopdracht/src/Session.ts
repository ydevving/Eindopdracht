
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

    public GET(endpoint: string) {
        return fetch(`${this.baseURL}${endpoint}`, { method: 'GET', headers: { 'Authorization': Session.instance.token }, ...Session.instance.defaultOptions });
    }

    public POST(endpoint: string, data: object): Promise<object> {
        return fetch(`${this.baseURL}${endpoint}`, { method: 'POST', headers: {...this.defaultHeaders}, body: JSON.stringify(data), ...Session.instance.defaultOptions });
   }

   public PATCH(endpoint: string) {
        return fetch(`${this.baseURL}${endpoint}`, { method: 'PATCH', ...Session.instance.defaultOptions });
   }
   
}

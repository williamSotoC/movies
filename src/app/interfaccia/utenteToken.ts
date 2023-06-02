export interface IRegistrazioneDto {
    // !  Dto : sta per data transfer object. Diamo questo nome alle interfacce che vogliamo usare nelle POST, cioè per traferire i dati da client verso server
    nome: string;
    email: string;
    password: string;
}

export class RegistrazioneDto implements IRegistrazioneDto {
    nome: string;//! dichiaro le proprirtà
    email: string;
    password: string;

    constructor(_nome: string, _email: string, _password: string) {
        this.nome = _nome;//! inizzializzo le proprietà
        this.email = _email;
        this.password = _password;

    }

}





export interface ILoginDto {
    email: string;
    password: string;
}

export class LoginDto implements ILoginDto {

    email: string;
    password: string;

    constructor(_email: string, _password: string) {
        this.email = _email;
        this.password = _password;
    }

}





export interface IResponseDalServerLocale {
    accessToken: string
    user: IUtente
}

export interface IUtente {
    email: string
    nome: string
    id: number
}
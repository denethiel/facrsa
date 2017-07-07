export class User {
    id: number;
    email: string;
    rfc?:string;
    name?: string;
    address?: Address;
    telephone?:number;
    fax?:number;
    web?:string;
    gln?:string;
    admin?:boolean;
    createdAt:string;
    updatedAt:string;
}

export class Address{
    id:number;
    street?:string;
    num_ext?: number;
    num_int?: number;
    colony?: string;
    postal_code?: number;
    location?: string;
    city?:string;
    state?:string;
    country?:string;
    reference?:string;
    createdAt:string;
    updatedAt:string;
} 
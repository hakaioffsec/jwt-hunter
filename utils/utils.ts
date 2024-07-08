import hmacSha256 from 'crypto-js/hmac-sha256'
import Base64Url from 'crypto-js/enc-base64url'

export function removeErrors(id_collection: string[]) {
    for(var id in id_collection) {
        id = id_collection[id]
        
        document.getElementById(id)?.classList.remove('border-error');
        document.getElementById(id)?.classList.add('border-secondary-300');
    }
}

export function addErrors(div_id_list: string[]) {
    for(var id in div_id_list) {
        id = div_id_list[id]
        
        document.getElementById(id)?.classList.remove('border-secondary-300');
        document.getElementById(id)?.classList.add('border-error');
    }
}

export function removeClasses(div_id: string, class_list: string[]) {
    for(var idx in class_list) {
        const className = class_list[idx];
        document.getElementById(div_id)?.classList.remove(className);
    }
}

export function addClasses(div_id: string, class_list: string[]) {
    for(var idx in class_list) {
        const className = class_list[idx];
        document.getElementById(div_id)?.classList.add(className);
    }
}

export function getInitialJwt() {
    const header = {
        typ: 'JWT',
        alg: 'HS256'
    };

    const payload = {
        sub: '1',
        name: 'admin',
        groups: ['user','admin']
    };

    const secret = 'secret';

    const jwt = [];

    jwt[0] = encodeJwtPart(header)
    jwt[1] = encodeJwtPart(payload)
    jwt[2] = Base64Url.stringify(hmacSha256(`${header}.${payload}`, secret));

    return jwt.join('.');
}
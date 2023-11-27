export function checkResponse(res){
    if (res.ok) {
        return res.json();
    }else{
        if ([403, 200, 401].includes(res.status)) {
            return res.json();
        }
    }
    return Promise.reject(`Ошибка ${res.status}`);
}
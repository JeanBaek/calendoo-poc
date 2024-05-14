
export function replacePathParams(uri: string, params: Record<string, string>) {
    return uri.replace(/{([^}]+)}/g, (match, param) => {
        return params[param] || match; // 대체할 값이 없으면 그대로 유지
    });
}
// addParams <- 이건 axios 제공 기능으로 사용
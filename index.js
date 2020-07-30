const d = document;


const getUrlParams = () =>  new URLSearchParams(window.location.search);

function b64EncodeUnicode(str) {
    // first we use encodeURIComponent to get percent-encoded UTF-8,
    // then we convert the percent encodings into raw bytes which
    // can be fed into btoa.
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(_, p1) {
            return String.fromCharCode('0x' + p1);
    }));
}


function b64DecodeUnicode(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}



d.addEventListener("DOMContentLoaded", () => {
    const TITLE = 'title';
    const params = getUrlParams();

    d.querySelector('.form').addEventListener('submit', (e) => {
        e.preventDefault();

        params.set(TITLE, b64EncodeUnicode(document.querySelector('.tarea').value));
        window.location.search = params.toString();
    })

    const title =  b64DecodeUnicode(decodeURIComponent(params.get(TITLE)));

    document.querySelector('.name > div').innerHTML = title;
    document.querySelector('.tarea').value = title;
});

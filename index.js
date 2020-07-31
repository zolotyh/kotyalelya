const d = document;
const TITLE = "title";

d.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);

    d.addEventListener(
        "keypress",
        e => {
            e.preventDefault();

            if (e.key === "?") {
                params.set(
                    TITLE,
                    b64EncodeUnicode(prompt("Введите текст приглашения!"))
                );
                window.location.search = params.toString();
            }
        },
        false
    );

    document.querySelector(".name > div").innerHTML = b64DecodeUnicode(
        decodeURIComponent(params.get(TITLE))
    );
});

function b64EncodeUnicode(str) {
    // first we use encodeURIComponent to get percent-encoded UTF-8,
    // then we convert the percent encodings into raw bytes which
    // can be fed into btoa.
    return btoa(
        encodeURIComponent(str).replace(
            /%([0-9A-F]{2})/g,
            function toSolidBytes(_, p1) {
                return String.fromCharCode("0x" + p1);
            }
        )
    );
}

function b64DecodeUnicode(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(
        atob(str)
            .split("")
            .map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
    );
}

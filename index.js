const d = document;
const TITLE = "title";
const IS_RELATIVES = "isRelatives";
const params = new URLSearchParams(window.location.search);

d.addEventListener("DOMContentLoaded", initScenarioHandler);
d.addEventListener(
    "keypress",
    e => {
        e.preventDefault();
        if (e.key === "?") {
            assignVariablesHandler();
        }
    },
    false
);

function assignVariablesHandler() {
    params.set(TITLE, b64EncodeUnicode(prompt("Введите имена")));
    params.set(IS_RELATIVES, confirm("Вставить текст для близких людей?"));
    window.location.search = params.toString();
}

function initScenarioHandler() {
    const title = params.get(TITLE);
    const isRelative = params.get(IS_RELATIVES) === "true" ? true : false;

    console.log(!!isRelative);

    if (!title) {
        assignVariablesHandler();
    }

    const text = isRelative ? 'В жизни бывают события неповторимые и незабываемые, которые немыслимы без присутствия близких людей.': 'Бывают в жизни радостные и счастливые моменты, которыми хочется поделиться с другими.'

    document.querySelector(".js-title").innerHTML = text;

    document.querySelector(".js-name").innerText = b64DecodeUnicode(
        decodeURIComponent(title)
    );
}

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

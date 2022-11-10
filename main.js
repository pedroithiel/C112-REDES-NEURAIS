Webcam.set({
    width: 335,
    height: 255,
    image_format: "png",
    png_quality: 90,
    crop_height: 240,
    crop_width: 240
});
Camera = elemento("camera")
Webcam.attach("#camera");
prediction1 = "";
prediction2 = "";
function tirarFoto() {
    Webcam.snap(function (data_uri) {
        elemento("Captura").innerHTML = "<img id = 'capturandoTela' src ='" + data_uri + "'>"
    })
}
console.log("ml5 version", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/v3dIDUHuK/model.json", modelLoaded);

function modelLoaded() {    
    console.log("model loaded!")
}

function CapturaTela() {
    img = elemento("capturandoTela");
    classifier.classify(img, objeto);
}

function speak() {
    var API = window.speechSynthesis;
    speakData1 = "A primeira previsão é " + prediction1;
    speakData2 = "E a segunda previsão é " + prediction2;
    var textoFalado = new SpeechSynthesisUtterance(speakData1 + speakData2)
    API.speak(textoFalado);
}


function objeto(error, resultado) {
    if (error) {
        console.log(error)
        alert("tire a foto novamente, algum erro ocorreu.")
    } else {
        console.log(resultado);
        elemento("emocao").innerHTML = resultado[0].label;
        elemento("emocao2").innerHTML = resultado[1].label;
        prediction1 = resultado[0].label;
        prediction2 = resultado[1].label;
        speak()

        if (resultado[0].label == "Feliz") {
            elemento("emojis").innerHTML = "&#128512;"
        }

        if (resultado[0].label == "Triste") {
            elemento("emojis").innerHTML = "&#128532;"
        }

        if (resultado[0].label == "Irritado") {
            elemento("emojis").innerHTML = "&#128548;"
        }

        if (resultado[1].label == "Feliz") {
            elemento("emojis2").innerHTML = "&#128512;"
        }

        if (resultado[1].label == "Triste") {
            elemento("emojis2").innerHTML = "&#128532;"
        }

        if (resultado[1].label == "Irritado") {
            elemento("emojis2").innerHTML = "&#128548;"
        }

    }
}

function elemento(nome) {
    return document.getElementById(nome)
}

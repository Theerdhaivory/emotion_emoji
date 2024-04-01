Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality:90
});

camera = document.getElementById("camera")
Webcam.attach("#camera");

function take_snap(){
    Webcam.snap(function(data_uri)
    {
        document.getElementById("snap").innerHTML = '<img id="captured_img"  src="'+data_uri+'"/> ' 
    });
}

console.log("model version:", ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/DjgOpQhRZ/model.json',loaded);

function loaded(){
    console.log("model loaded")
}

function speak()
{
   var synth = window.speechSynthesis;
   speak_data_1 ="the first prediction is" + prediction_1;
   speak_data_2 ="the second prediction is" + prediction_2;
   var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
   synth.speak(utterThis);
}

function check()
{
    img = document.getElementById('captured_img');
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if (error){
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_1").innerHTML = results[0].label;
        document.getElementById("result_2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();
        if(results[0].label == "happy" ){
            document.getElementById("update_1").innerHTML = "&#128512;";
        }
        if(results[0].label == "sad" ){
            document.getElementById("update_1").innerHTML = "&#128546;";
        }
        if(results[0].label == "angry" ){
            document.getElementById("update_1").innerHTML = "&#128532;";
        }
        if(results[0].label == "surprised" ){
            document.getElementById("update_1").innerHTML = "&#58384;";
        }

        if(results[1].label == "happy" ){
            document.getElementById("update_2").innerHTML = "&#128512;";
        }
        if(results[1].label == "sad" ){
            document.getElementById("update_2").innerHTML = "&#128546;";
        }
        if(results[1].label == "angry" ){
            document.getElementById("update_2").innerHTML = "&#128532;";
        }
        if(results[1].label == "surprised" ){
            document.getElementById("update_2").innerHTML = "&#58384;";
        }
    }   
}
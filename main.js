img = "";
modelStatus = "";
objects = [];

function setup()
{
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detectando objetos";
}

function modelLoaded()
{
    console.log("modelo cocossd carregado!!!");
    modelStatus = true;
    objectDetector.detect(img, gotResult);
}

function preload()
{
    img = loadImage('dog_cat.jpg');
}

function gotResult(error, results)
{
    if(error)
    {
        console.error(error);
    }
        console.log(results);
        objects = results;
}

function draw()
{
    image(img, 0, 0, 640, 420);
    if(modelStatus != "")
    {
        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = " Status: objeto detectado";
            
            fill("#00e032");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#00e032");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].heigth);
        }
    }

}

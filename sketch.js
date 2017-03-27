var sentences = [];
var first, second,button;
var allText = "";
var keyWordRes = [];
var numbers=[];
var sentenceIndex = 0;
var count=0;

var buttons = [

         "love", "faith", "believe", "beauty"
    ];
var word = buttons[0],
    buttonX = 70;
    var over, data, kwic, input;

function preload() {

    data = loadStrings('bible.txt');
}

function setup() {

    createCanvas(800,450);

    textSize(16);
    fill(0);

    allText = data.join(" "); // turn it into one string
    sentences = RiTa.splitSentences(allText); // split it into simple sentence

    first = createDiv('').size(600,40).position(400,100).html("hi");
    second = createDiv('').size(600,40).position(400,300).html("hi2");

    drawButtons();

    setInterval(updateKWIC,1000);
    updateKWIC();




}

function draw() {




    drawSentences(sentenceIndex);
    sentenceIndex++;






}

function updateKWIC() {
    // console.log("sentence.length: ", sentences.length);
    for (let i = 0; i < sentences.length; i++) {

            kwic = RiTa.kwic(sentences[i], word, { //change sentence into keyword
                ignorePunctuation: true,
                ignoreStopWords: true,
                // wordCount: 3
            });
            if (kwic.length > 0) { // if find, make this sentense into a new array
                keyWordRes.push(sentences[i]);

            }

    }


}

function drawSentences(index) {


    if (keyWordRes.length == 0) {

    text("Word not found", width / 2, height / 2);

    } else {

        count++;
        var m=map(0,count,30,220);
        var tw = textWidth(word) / 2;

        var parts = keyWordRes[index].split(word); //split every sentence into two parts

        fill(0);
        textAlign(CENTER);

        first.html(parts[0]);
        second.html(parts[1]);

        noStroke();
        textFont('Abel')
        fill(252,50,65,10);

        textSize(80);
        text(word,390,250);

        background(249,83,83,count)

    }
}

function drawButtons() {

    var posX = buttonX,
        posY = 40;


    for (var i = 0; i < buttons.length; i++) {


        textFont('Abel')
        textAlign(CENTER);
        textSize(20);
        var on = word == (buttons[i]) ? true : false;
        var tw = textWidth(buttons[i]);

        fill((on? 255:0),0,0);


        text(buttons[i], posX, 60);



        posX += tw + 30;
    }
}

function inside(mx, my, posX, tw) {

    return (mx >= posX - 5 && mx <= posX + tw + 5 && my >= 25 && my <= 44);
}

function mouseMoved() {

    over = null;
    var posX = buttonX,
        tw;

    for (var i = 0; i < buttons.length; i++) {

        tw = textWidth(buttons[i]);

        if (inside(mouseX, mouseY, posX, tw)) {

            over = buttons[i];
            break;
        }
        posX += tw + 30;
    }
}

function mouseClicked() {

    var posX = buttonX,
        tw;

    for (var i = 0; i < buttons.length; i++) {

        tw = textWidth(buttons[i]);

        if (inside(mouseX, mouseY, posX, tw)) {

            word = buttons[i];
            kwic = null;
            updateKWIC();
            break;
        }
        posX += tw + 30;
    }
}
